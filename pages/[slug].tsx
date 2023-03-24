import { NextPage, GetStaticPaths, GetStaticProps } from "next";
import { prisma } from "@/lib/db";
import { Post } from "@prisma/client";
import { useEffect, useState } from "react";
import Breadcrumb from "@/components/Breadcrumb";
import SideBar from "@/components/post/SideBar";
import Head from "next/head";
import { NextSeo } from "next-seo";

interface Props {
  post: Post;
  relatedPost: Post[];
}

const Post: NextPage<Props> = ({ post, relatedPost }) => {
  let htmlString = post.content;
  const [cleanHtmlString, setCleanHtmlString] = useState("");
  const des = String(post.excerpt)
    .replace("[&hellip;]", "")
    .replace("<p>", "")
    .replace("</p>", "");
  const title = post.title.replace("&amp;", "&");

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

  console.log("${process.env.NEXT_PUBLIC_DOMAIN_URL}${post.slug}",`${post.slug}`)

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={des} />
      </Head>
      <NextSeo
        title={`${title} | Gossipgeeks`}
        description={des}
        canonical={`${process.env.NEXT_PUBLIC_DOMAIN_URL}${post.slug}`}
        openGraph={{
          type: "article",
          article: {
            publishedTime: post?.date,
            modifiedTime: post?.date,
            authors: ["https://in.pinterest.com/gossipgeeks"],
            tags: [
              "Biography",
              "Celebrity news",
              "bollywood celebrity news",
              "celebrity news today",
            ],
          },
          url: `${process.env.NEXT_PUBLIC_DOMAIN_URL}${post.slug}`,
          site_name: "Gossip Geeks",
        }}
      />
      <div
        itemScope
        itemType="https://schema.org/NewsArticle"
        className="container mx-auto space-y-8 lg:space-y-0 lg:grid lg:grid-cols-3 gap-8 px-2"
      >
        <div className="col-span-3">
          <Breadcrumb
            crumbs={[
              { name: "Home", href: "/" },
              { name: post.title, href: post.slug },
            ]}
          />
        </div>
        <meta itemProp="image" content={post?.imageUrl || ""} />
        <div className="post lg:col-span-2 rounded-lg p-2 md:p-4 lg:p-10 shadow-xl bg-white dark:bg-neutral-800 overflow-hidden">
          <div dangerouslySetInnerHTML={{ __html: cleanHtmlString }}></div>
        </div>
        <div>
          <div className="col-span-1 rounded-lg shadow-xl bg-white dark:bg-neutral-800 p-4">
            <SideBar relatedPost={relatedPost} id={post.id} slug={post.slug} title={title} />
          </div>
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
  const relatedPost: Post[] | null = await prisma.post.findMany({
    where: {
      categories: {
        array_contains: post?.categories,
      },
    },
    take: 8,
    orderBy: {
      date: "desc",
    },
  });
  return {
    props: {
      post,
      relatedPost,
    },
  };
};

export default Post;
