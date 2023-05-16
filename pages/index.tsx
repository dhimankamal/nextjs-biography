import { NextPage } from "next";
import { Post } from "@prisma/client";
import { useState } from "react";
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

  return <>api</>;
};
