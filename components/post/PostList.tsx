import { NextPage } from "next";
import { categoryList } from "@/utils/category";
import { Post } from "@prisma/client";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import SocialShare from "../SocialShare";

interface Props {
  data: Post & { categories: number[] };
  type:string
}

const PostList: NextPage<Props> = ({ data,type }) => {
  const categoryName = categoryList.find(
    value => data.categories[0] === value.categorieid
  );
  const des = String(data.excerpt).replace("[&hellip;]", "");
  return (
    <>
      <div className="py-8 md:grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-5">
        <div className="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
          <span className="font-semibold title-font text-gray-700 dark:text-gray-300">
            {categoryName?.name || "Biography"}
          </span>
          <span className="mt-1 text-gray-500  text-sm">
            {dayjs(data.date).format("hh:mmA D-MMM-YY")}
          </span>
        </div>
        <div className="pb-4 md:py-0 md:px-4">
          <Image
            src={data.imageUrl || "https://dummyimage.com/200x300"}
            className="rounded-2xl w-full"
            width="200"
            height="300"
            alt="feature-image"
          />
        </div>
        <div className="col-span-2 lg:col-span-3 flex flex-col justify-between gap-2">
          <div>
            <h2
              className="text-2xl font-medium text-gray-900 dark:text-gray-200 title-font mb-2"
              dangerouslySetInnerHTML={{ __html: data.title }}
            ></h2>
            <div
              className="leading-relaxed dark:text-gray-500"
              dangerouslySetInnerHTML={{ __html: des }}
            ></div>
          </div>

          <div className="flex flex-col items-start md:flex-row md:items-center justify-between mt-4 gap-4">
            <Link
              href={type === "hollywood"?`/hollywood/${data.slug}`:`/${data.slug}`}
              className="text-cyan-500 inline-flex items-center "
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
            </Link>
            <SocialShare slug={type === "hollywood"?`hollywood/${data.slug}`:`${data.slug}`} title={data?.title} />
          </div>
        </div>
      </div>
    </>
  );
};

export default PostList;
