import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { prisma } from "@/lib/db";

type Data = {
  name: string;
};
const baseUrl = process.env.BASE_URL;
const getCategory = async () => {
  try {
    const res = await axios({
      method: "GET",
      url: `${baseUrl}/wp/v2/categories`,
    });

    if (res && res.data) {
      return res.data;
    }
  } catch (error) {
    return error;
  }
};

const updateCategoryData = async () => {
  try {
    let updateData:any[] = [];
    const data = await getCategory();
    if (data.length) {
      updateData = [...updateData, ...data];
    } 
    updateData.forEach(async ({ id, name, slug }) => {
      let obj = {
        categorieid: +id,
        name,
        slug,
      };
      await prisma.categories.upsert({
        where: { categorieid: +id },
        update: obj,
        create: obj,
      });
    });

    return `data length ${updateData.length}`;
  } catch (error) {
    return error;
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  let response = await updateCategoryData();
  console.log("res", response);
  res.status(200).json({ name: "Update category" });
}
