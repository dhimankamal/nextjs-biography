import { prisma } from "@/lib/db";
import type { NextApiRequest, NextApiResponse } from "next";
import { Post } from "@prisma/client";

type Data = Post[];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { page = 1 } = req.query;
  const pageSize = 10;
  const skip = (+page - 1) * pageSize;

  const data = await prisma.post.findMany({
    take: pageSize,
    skip,
    orderBy: {
      date: "desc",
    },
  });

  res.status(200).json(data);
}
