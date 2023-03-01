import { NextPage, GetStaticPaths, GetStaticProps } from "next";
import { prisma } from "@/lib/db";
import { Post } from "@prisma/client";
import { useEffect, useState } from "react";
import Breadcrumb from "@/components/Breadcrumb";

interface Props {
  post: Post;
}

const Post: NextPage<Props> = ({ post }) => {
  let htmlString = post.content;

  const [cleanHtmlString, setCleanHtmlString] = useState("");

  useEffect(() => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(String(htmlString), "text/html");
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
      <div className="container mx-auto grid grid-cols-3 gap-8 px-2">
        <div className="col-span-3">
          <Breadcrumb
            crumbs={[
              { name: "Home", href: "/" },
              { name: post.title, href: "/" },
            ]}
          />
        </div>

        <div className="post col-span-3 lg:col-span-2 rounded-lg p-2 md:p-4 lg:p-10 shadow-xl bg-white dark:bg-neutral-800 overflow-hidden">
          <div dangerouslySetInnerHTML={{ __html: cleanHtmlString }}></div>
        </div>
        <div className="col-span-1 rounded-lg shadow-xl bg-white dark:bg-neutral-800">
          {" "}
          side
        </div>
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
