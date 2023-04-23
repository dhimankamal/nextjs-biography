// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/db";
import { Prisma } from "@prisma/client";

const api_key: string = process.env.CHAT_GPT_KEY || "";

type Data = {
  data: any;
};

interface GptResponse {
  choices: {
    text: string;
  }[];
}

async function generateText(prompt: string): Promise<string | null> {
  const model: string = "text-davinci-003";
  const temperature: number = 0.7;
  const max_tokens: number = 500;
  const top_p: number = 1;
  const frequency_penalty: number = 0;
  const presence_penalty: number = 0;

  const body = {
    prompt,
    temperature,
    max_tokens,
    top_p,
    frequency_penalty,
    presence_penalty,
  };

  const response = await fetch(
    `https://api.openai.com/v1/engines/${model}/completions`,
    {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${api_key}`,
      },
    }
  );

  const json: GptResponse = await response.json();
  if (json?.choices) {
    return json.choices[0].text;
  }
  return null;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
): Promise<void> {
  let postList = await prisma.hollywood.findMany({
    take: 50,
    skip: 300,
    orderBy: {
      date: "desc",
    },
  });

  await Promise.all(
    postList.map(async (element, idx) => {
      if (!element?.ai) {
        console.log("call", idx);
        const data: string | null = await generateText(
          `here is tittle "${element.title}" write article minimum 500 words max 1000 words for my blog. Here more information "${element.excerpt}"`
        );
        if (data) {
          let prismares = await prisma.hollywood.upsert({
            where: { slug: element.slug || "" },
            update: {
              ai: { data },
            },
            create: {
              postid: "error",
              date: "error",
              slug: "error",
              content: "error",
              title: "error",
              excerpt: "error",
              categories: "error",
              tags: "error",
            },
          });
          console.count("prismares++++");
        }
      }
    })
  );

  let ai = postList.map((val) => val.ai);
  res.status(200).json({ data: ai });
}
