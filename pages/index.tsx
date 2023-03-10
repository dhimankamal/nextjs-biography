import { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { prisma } from "@/lib/db";
import { Post } from "@prisma/client";
import PostList from "@/components/post/PostList";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";

interface Props {
  post: Post[];
}

const Home: NextPage<Props> = ({ post }) => {
  const [page, setPage] = useState(2);
  const [items, setItems] = useState(post);
  const [hasMore, setHasmore] = useState(true);

  const handleLoadMore = async () => {
    setPage(page + 1);
    const res = await axios({
      method: "GET",
      url: `/api/post/getpost?page=${page}`,
    });
    if (res.data && res.data.length > 0) {
      setItems([...items, ...res.data]);
    } else {
      setHasmore(false);
    }
  };

  return (
    <>
      <Head>
        <title>
          GossipGeeks - Your Ultimate Source for Celebrity News and Information
        </title>
        <meta
          name="description"
          content="GossipGeeks is your ultimate source for the latest news and information about your favorite celebrities. Get the latest breaking news, exclusive stories, and behind-the-scenes features about your favorite stars."
        />
      </Head>
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-2 lg:py-12 mx-auto">
          <InfiniteScroll
            dataLength={items.length}
            next={handleLoadMore}
            hasMore={hasMore}
            loader={<h4 className="py-10 text-center">Loading...</h4>}
          >
            {items.map((data: any) => {
              return (
                <div key={data.id} className="border-b dark:border-gray-800">
                  <PostList data={data} />
                </div>
              );
            })}
          </InfiniteScroll>
        </div>
      </section>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  let post: Post[] = [];
  try {
    post = await prisma.post.findMany({
      take: 10,
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
