import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET;

export async function verifyToken(token:string) {
    try {
      const decoded = jwt.verify(token, JWT_SECRET || '');
      return decoded;
    } catch (err) {
      return err;
    }
  }