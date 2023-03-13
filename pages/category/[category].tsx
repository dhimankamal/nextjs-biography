import { categoryList } from "@/utils/category";
import { Categories, Post } from "@prisma/client";
import { NextPage, GetStaticPaths, GetStaticProps } from "next";
import { prisma } from "@/lib/db";
import Breadcrumb from "@/components/Breadcrumb";
import PostList from "@/components/post/PostList";

interface Props {
  category: Categories;
  posts: Post[];
}

const Category: NextPage<Props> = ({ category, posts }) => {
  return (
    <div className="container mx-auto  space-y-4 px-2">
      <Breadcrumb
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Category", href: "/category" },
          { name: category.name, href: `/category/${category.slug}` },
        ]}
      />
      <section className="body-font">
        {posts.map((data: any) => {
          return (
            <div key={data.id} className="border-b dark:border-gray-800">
              <PostList data={data} />
            </div>
          );
        })}
      </section>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = categoryList.map(element => `/category/${element.slug}`);
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  let slug: string = String(params?.category) || "";
  const category: Categories | undefined = categoryList.find(
    val => val.slug === slug
  );
  const posts: Post[] | null = await prisma.post.findMany({
    where: {
      categories: {
        array_contains: [category?.categorieid || ""],
      },
    },
  });

  return {
    props: {
      category,
      posts,
    },
  };
};

export default Category;
