import { categoryList } from "@/utils/category";
import { Post } from "@prisma/client";
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";

interface Props {
  relatedPost: Post[];
  id: string;
}

const SideBar: NextPage<Props> = ({ relatedPost, id }) => {
  return (
    <>
      <div className="mb-4">
        <h3 className="text-2xl font-bold mb-4">Category</h3>
        <div className="flex flex-col space-y-4 rounded-lg">
          {categoryList.map(val => {
            return (
              <Link
                href="/"
                key={val.id}
                className="p-4 cursor-pointer bg-neutral-100 hover:bg-neutral-200 transition-all duration-500"
              >
                {val.name}
              </Link>
            );
          })}
        </div>
      </div>
      <div>
        <h3 className="text-2xl font-bold mb-4">Related Posts</h3>
        <div className="space-y-4">
          {relatedPost.map(val => {
            if (val.id === id) {
              return null;
            } else {
              return (
                <div key={val.id} className="grid gap-2 border-b pb-4">
                  <Image
                    src={val.imageUrl || "https://dummyimage.com/200x300"}
                    className="rounded-2xl w-full"
                    width="200"
                    height="300"
                    alt="feature-image"
                  />
                  <h3
                    className="font-semibold"
                    dangerouslySetInnerHTML={{ __html: val.title }}
                  />
                  <Link
                    href={val.slug}
                    className="text-indigo-500 inline-flex items-center"
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
                </div>
              );
            }
          })}
        </div>
      </div>
    </>
  );
};

export default SideBar;
