import { NextApiHandler } from "next";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "@/lib/db";

const JWT_SECRET = "test";

export const loginUser = async (
  email: string,
  password: string
): Promise<string> => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new Error("Invalid email or password");
  }
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    throw new Error("Invalid email or password");
  }
  const token = jwt.sign({ userId: user.id }, JWT_SECRET);
  return token;
};

const login: NextApiHandler = async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Method not allowed" });
    return;
  }

  const { email, password } = req.body;

  try {
    const token = await loginUser(email, password);
    res.status(200).json({ token });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export default login;
