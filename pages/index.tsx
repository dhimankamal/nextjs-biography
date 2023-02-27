import { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { prisma } from "@/lib/db";
import { Post } from "@prisma/client";
const cheerio = require("cheerio");

interface Props {
  post: (Post & { excerpt: { rendered: string } }) [];
}

const Home: NextPage<Props> = ({ post }) => {
  console.log("post", post);
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-24 mx-auto">
          {post.map(val => {
            const $ = cheerio.load(val.content);
            const firstImageUrl = $("img").first().attr("src");
            const des =  val.excerpt.rendered.replace("[&hellip;]", "");
              
            console.log("des", des);
            return (
              <div key={val.id} className="border-b dark:border-gray-800">
                <div className="py-8 flex flex-wrap md:flex-nowrap">
                  <div className="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
                    <span className="font-semibold title-font text-gray-700 dark:text-gray-300">
                      CATEGORY
                    </span>
                    <span className="mt-1 text-gray-500  text-sm">
                      {val.date}
                    </span>
                  </div>
                  <div className="md:flex-grow">
                    <h2
                      className="text-2xl font-medium text-gray-900 dark:text-gray-200 title-font mb-2"
                      dangerouslySetInnerHTML={{ __html: val.title }}
                    ></h2>
                    <div
                      className="leading-relaxed dark:text-gray-500"
                      dangerouslySetInnerHTML={{ __html: des }}
                    ></div>
                    <a
                      href={val.slug}
                      className="text-indigo-500 inline-flex items-center mt-4"
                    >
                      Learn More
                      <svg
                        className="w-4 h-4 ml-2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 12h14" />
                        <path d="M12 5l7 7-7 7" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  let post: Post[] = [];
  try {
    post = await prisma.post.findMany({
      orderBy: {
        date: "desc",
      },
    });
  } catch (error) {
    console.log(error);
  }
  return {
    props: { post },
  };
};

export default Home;
