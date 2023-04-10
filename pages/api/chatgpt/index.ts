// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/db";

const api_key: string = process.env.CHAT_GPT_KEY || "";

type Data = {
  name: string;
};

interface GptResponse {
  choices: {
    text: string;
  }[];
}

async function generateText(prompt: string): Promise<string> {
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
  return json.choices[0].text;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
): Promise<void> {
  const postData = await prisma.hollywood.findMany({
    take: 2,
  });

  const data: string = await generateText(
    `here is tittle "${postData[1].title}" write article minimum 500 words max 1000 words for my blog. Here more information "${postData[0].excerpt}"`
  );

  res.status(200).json({ name: data });
}
