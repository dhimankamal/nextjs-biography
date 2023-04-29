import { NextApiHandler } from "next";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "@/lib/db";

const JWT_SECRET = "test";

const register: NextApiHandler = async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Method not allowed" });
    return;
  }

  const { email, password, name } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role:"auther"
      },
    });
    const token = jwt.sign({ userId: user.id }, JWT_SECRET);
    res.status(200).json({ token });
  } catch (err:any) {
    res.status(400).json({ message: err.message });
  }
};

export default register;