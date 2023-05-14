// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default function Profile(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const token = req.headers.get("Authorization");
  console.log("token>>>", token);
  res.status(200).json({ name: "John Doe" });
}
