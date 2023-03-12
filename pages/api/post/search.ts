// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/db";
import { Post } from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Post[]>
) {
  res.setHeader("Cache-Control", "s-maxage=86400");
  const { search } = req.body;

  const data: Post[] = await prisma.post.findMany({
    take: 6,
    orderBy: {
      date: "desc",
    },
    where: {
      title: {
        contains: search,
      },
    },
  });
  res.status(200).json(data);
}
