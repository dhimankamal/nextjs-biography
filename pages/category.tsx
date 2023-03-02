import { Categories } from ".prisma/client";
import { GetStaticProps, NextPage } from "next";
import { prisma } from "@/lib/db";

interface Props {
  categoryRes: Categories[] | null;
}

const Category: NextPage<Props> = (props) => {
  console.log("categoryRes", props);
  return <div></div>;
};

export default Category;
