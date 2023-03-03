import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/db";
import axios from "axios";
const cloudinary = require("cloudinary").v2;

type Data = {
  name: string;
};

// configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const baseUrl = process.env.BASE_URL;

const uploadImage = async (imagePath: string) => {
  // Use the uploaded file's name as the asset's public ID and
  // allow overwriting the asset with new versions
  const options = {
    use_filename: true,
    unique_filename: false,
    overwrite: true,
  };
  try {
    // Upload the image
    const result = await cloudinary.uploader.upload(imagePath, options);
    console.log("test++", result);
    return result.secure_url;
  } catch (error) {
    console.error(error);
  }
};

const getUrl = async (id: number) => {
  try {
    const res = await axios({
      method: "GET",
      url: `${baseUrl}/wp/v2/media/${id}`,
    });
   

    if (res.data && res.data.source_url) {
      return res.data.source_url;
    }
  } catch (error) {
    console.log(error);
    return "error";
  }
};

const upadteFeatureImage = async () => {
  let postList = await prisma.post.findMany({
    // take: 1,
    // orderBy: {
    //   date: "desc",
    // },
    where:{
      imageUrl: null
    },
  });

  await Promise.all(
    postList.map(async element => {
      if (element.featured_media) {
        let uploadImageUrl = "";
        let Url = await getUrl(element.featured_media);
        if (Url) {
          uploadImageUrl = await uploadImage(Url);
          let prismares = await prisma.post.upsert({
            where: { slug: element.slug || "" },
            update: {
              imageUrl: uploadImageUrl,
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
          console.log("prismares++++", uploadImageUrl);
        }
      }
    })
  );
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  let response = await upadteFeatureImage();
  res.status(200).json({ name: "Update Images " });
}
