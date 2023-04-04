import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { prisma } from "@/lib/db";
const cheerio = require("cheerio");
const cloudinary = require("cloudinary").v2;

type Data = {
  name: any;
};
// configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const baseUrl = "https://www.wikibio.us/wp-json";
const getPostData = async (page: number) => {
  try {
    const res = await axios({
      method: "GET",
      url: `${baseUrl}/wp/v2/posts?per_page=10&page=${page}`,
    });

    if (res && res.data) {
      return res.data;
    }
  } catch (error) {
    console.log(error);
  }
};

const updatePostData = async () => {
  try {
    let updateData: any[] = [];
    for (let index = 1; index < 3; index++) {
      const data = await getPostData(index);
      if (data.length) {
        updateData = [...updateData, ...data];
      } else {
        break;
      }
    }

    for (const post of updateData) {
      let {
        id,
        date,
        slug,
        title,
        content,
        excerpt,
        categories,
        tags,
        featured_media,
      } = post;

      excerpt = excerpt.rendered;

      const $ = cheerio.load(content.rendered);
      // load HTML string into cheerio
      // const $ = cheerio.load(html);

      // find all image and link elements
      const $images = $("img");
      const $links = $("a:has(img)");

      // iterate over image elements and replace URLs
      const replaceImageUrls = async () => {
        for (let i = 0; i < $images.length; i++) {
          const $img = $images.eq(i);
          const imageUrl = $img.attr("src");
          const filename = imageUrl.split("/").pop(); // get filename from URL
          try {
            const result = await cloudinary.uploader.upload(imageUrl, {
              public_id: filename.replace(/\.[^/.]+$/, ""), // remove extension from filename
              overwrite: true, // overwrite image if it already exists
            });
            const cloudinaryUrl = result.secure_url;
            // replace src attribute
            $img.attr("src", cloudinaryUrl);
            // remove srcset attribute
            $img.removeAttr("srcset");
            // remove img tag if desired
            // $img.remove();
          } catch (error) {
            console.error(error);
          }
        }
      };
      // iterate over link elements and replace URLs
      const replaceLinkUrls = async () => {
        for (let i = 0; i < $links.length; i++) {
          const $link = $links.eq(i);
          const imageUrl = $link.find("img").attr("src");
          const filename = imageUrl.split("/").pop(); // get filename from URL
          try {
            const result = await cloudinary.uploader.upload(imageUrl, {
              public_id: filename.replace(/\.[^/.]+$/, ""), // remove extension from filename
              overwrite: true, // overwrite image if it already exists
            });
            const cloudinaryUrl = result.secure_url;
            $link.attr("href", cloudinaryUrl);
          } catch (error) {
            console.error(error);
          }
        }
      };

      await replaceImageUrls();
      await replaceLinkUrls();

      const postObj = {
        postid: String(id),
        slug,
        content: $.html(),
        title: title.rendered,
        excerpt,
        categories,
        tags,
        featured_media,
        imagesUpdated: true,
      };
      const currentDate = new Date().toISOString();
      const newObj = { ...postObj, date: currentDate };
      console.log("id", title);
      await prisma.hollywood.upsert({
        where: { slug: slug || "" },
        update: postObj,
        create: newObj,
      });
    }
    return `done ${updateData.length}`;
  } catch (error) {
    return error;
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  let response = await updatePostData();
  res.status(200).json({ name: response });
}
