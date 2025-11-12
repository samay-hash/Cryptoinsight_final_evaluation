const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs"); //securely encrypt the password 
const jwt = require("jsonwebtoken"); //Login hone ke baad token issue karne ke liye

const prisma = new PrismaClient();

const signup = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      }, //stores email and hashed password in DB
    });
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET || "your-secret-key",
      {
        expiresIn: "20d",
      }
    ); //jwt.sign- Token create, userId, email, Token payload → verify karne me kaam aayega, JWT_SECRET-Token encryption key

    res
      .status(201)
      .json({
        message: "User created successfully",
        token,
        user: { id: user.id, email: user.email },
      }); //this gives frontend 3 things: message token and user detail
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    // console.log('Login attempt for email:', email);
    // console.log('User found in DB:', !!user);

    if (!user) {
      // console.log('User not found');
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password); //User ke input Password ko DB wale Hashed password se match karta hai
    // console.log('Password comparison result:', isPasswordValid);

    if (!isPasswordValid) {
      // console.log('Password mismatch');
      return res.status(400).json({ message: "Invalid email or password" });
    }

    //   JWT
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET || "your-secret-key",
      {
        expiresIn: "10d",
      }
    );

    // console.log('Login successful for user:', user.email);
    res.json({
      message: "Login successful",
      token,
      user: { id: user.id, email: user.email },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { signup, login };
