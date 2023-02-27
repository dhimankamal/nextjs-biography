import { NextPage, GetStaticPaths, GetStaticProps } from "next";
import { prisma } from "@/lib/db";
import { Post } from "@prisma/client";
import { useEffect, useState } from "react";

interface Props {
  post: Post;
}

const Post: NextPage<Props> = ({ post }) => {
  let htmlString = post.content;

  const [cleanHtmlString, setCleanHtmlString] = useState("");

  useEffect(() => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, "text/html");
    const elements = doc.querySelectorAll("[style],img");

    elements.forEach(element => {
      if (element.tagName.toLowerCase() === "img") {
        element.removeAttribute("style");
        element.removeAttribute("height");
        element.removeAttribute("width");
      } else {
        element.removeAttribute("style");
      }
    });

    setCleanHtmlString(doc.documentElement.outerHTML);
  }, [htmlString]);
  return (
    <>
      <div className="container mx-auto grid grid-cols-3 gap-8">
        <div className="post col-span-2 rounded-lg p-10 shadow-xl bg-white dark:bg-neutral-800">
          <h1 className="text-3xl font-bold" dangerouslySetInnerHTML={{ __html: post.title }}></h1>
          <div dangerouslySetInnerHTML={{ __html: cleanHtmlString }}></div>
        </div>
        <div className="col-span-1 rounded-lg shadow-xl bg-white dark:bg-neutral-800"> side</div>
      </div>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const post: Post[] = await prisma.post.findMany();
  const paths = post.map(element => `/${element.slug}`);
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const post: Post | null = await prisma.post.findUnique({
    where: {
      slug: String(params?.slug),
    },
  });
  return {
    props: {
      post,
    },
  };
};

export default Post;
