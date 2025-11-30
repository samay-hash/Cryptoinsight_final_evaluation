const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    try {
      if (req.url.endsWith('/signup')) {
        // Signup 
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
          },
         
        });
        const token = jwt.sign(
          { userId: user.id, email: user.email },
          process.env.JWT_SECRET || "my-secret-key",
          {
            expiresIn: "70d",
          }
        );

        res.status(201).json({
          message: "User created successfully",
          token,
          user: { id: user.id, email: user.email },
        });
      } else if (req.url.endsWith('/login')) {
        // Login 
        const user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user) {
          return res.status(400).json({ message: "Invalid email or password" });
        }
        
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
          return res.status(400).json({ message: "Invalid email or password" });
        }

        const token = jwt.sign(
          { userId: user.id, email: user.email },
          process.env.JWT_SECRET || "my-secret-key",
          {
            expiresIn: "40d",
          }
        );

        res.json({
          message: "Login successful",
          token,
          user: { id: user.id, email: user.email },
        });
      } else {
        res.status(404).json({ message: "Endpoint not found" });
      }
    } catch (error) {
      console.error("Auth error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}