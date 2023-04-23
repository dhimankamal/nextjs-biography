import { Post } from "@prisma/client";
import { getServerSideSitemapLegacy } from "next-sitemap";
import { GetServerSideProps } from "next";
import { prisma } from "@/lib/db";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const data: Post[] | undefined = await prisma?.post.findMany();

  const newsSitemaps = data?.map((item) => ({
    loc: `${
      process.env.NEXT_PUBLIC_DOMAIN_URL
    }webstory/${item.slug.toString()}`,
    lastmod: new Date(item.date).toISOString(),
  }));

  const fields = [...(newsSitemaps || [])];

  return getServerSideSitemapLegacy(ctx, fields);
};

export default function Site() {}
