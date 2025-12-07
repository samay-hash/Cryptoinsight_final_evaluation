const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { PrismaClient } = require("@prisma/client");
const authRoutes = require("./routes/authRoutes");

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());

 
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.json({ message: "CryptoInsight Backend is running!" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


 
 