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

  const handleLoadMore = async () => {
    setPage(page + 1);
    const res = await axios({
      method: "GET",
      url: `/api/post/getpost?page=${page}`,
    });
    setItems([...items, ...res.data]);
    console.log("loadmore", res);
  };

  return (
    <>
      <Head>
        <title>GossipGeeks - Your Ultimate Source for Celebrity News and Information</title>

      </Head>
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-10 lg:py-12 mx-auto">
          <InfiniteScroll
            dataLength={items.length}
            next={handleLoadMore}
            hasMore={true}
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
