// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/db";
import { Post } from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Post[]>
) {
  res.setHeader("Cache-Control", "s-maxage=86400");
  const { categories, page = 1 } = req.body;

  const pageSize = 10;
  const skip = (+page - 1) * pageSize;

  const data: Post[] = await prisma.post.findMany({
    where: {
      categories: {
        array_contains: categories,
      },
    },
    take: pageSize,
    skip,
    orderBy: {
      date: "desc",
    },
  });
  res.status(200).json(data);
}
