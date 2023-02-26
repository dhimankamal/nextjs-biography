import { NextPage, GetStaticPaths, GetStaticProps } from "next";
import { prisma } from "@/lib/db";
import { Post } from "@prisma/client";
import { useEffect, useState } from "react";
import ReactMarkdown from 'react-markdown';

interface Props {
  post: Post;
}

const Post: NextPage<Props> = ({ post }) => {

  let markdownContent = post.content

  // const [cleanHtmlString, setCleanHtmlString] = useState('');

  // useEffect(() => {
  //   const parser = new DOMParser();
  //   const doc = parser.parseFromString(htmlString, 'text/html');
  //   const elements = doc.querySelectorAll('[style],img');

  //   elements.forEach(element => {
  //     if (element.tagName.toLowerCase() === 'img') {
  //       element.removeAttribute('style');
  //       element.removeAttribute('height');
  //       element.removeAttribute('width');
  //     } else {
  //       element.removeAttribute('style');
  //     }
  //   });

  //   setCleanHtmlString(doc.documentElement.outerHTML);
  // }, [htmlString]);
  return (
    <>
      <div className="container mx-auto">
      <div className="markdown" >
      <ReactMarkdown>{markdownContent}</ReactMarkdown>
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
