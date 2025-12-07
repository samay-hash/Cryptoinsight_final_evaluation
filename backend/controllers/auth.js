const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");  
const jwt = require("jsonwebtoken");  

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

    const hashedPassword = await bcrypt.hash(password, 8);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      }, 
    });
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET || "@ssidisamsu#$2@",
      {
        expiresIn: "70d",
      }
    ); 
    res.status(201).json({
        message: "User created successfully",
        token,
        user: {
           id: user.id,
           email: user.email
           },
      });  
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


    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);  
    // console.log('Password comparison result:', isPasswordValid);

    if (!isPasswordValid) {
      // console.log('Password mismatch');
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET || "@ssidisamsu#$2@",
      {
        expiresIn: "70d",
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
