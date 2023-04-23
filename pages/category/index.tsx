import Breadcrumb from "@/components/Breadcrumb";
import { categoryList } from "@/utils/category";
import { NextPage } from "next";
import Link from "next/link";

interface Props {}

const CategoryPage: NextPage<Props> = ({}) => {
  return (
    <div className="container mx-auto text-center space-y-4 px-2">
      <Breadcrumb
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Category", href: "/category" },
        ]}
      />
      <div>
        <div className="flex flex-col space-y-4 rounded-lg">
          {categoryList.map((val) => {
            return (
              <Link
                href={`/category/${val.slug}`}
                key={val.id}
                className="p-4 cursor-pointer bg-white dark:bg-neutral-800 hover:bg-neutral-200 transition-all duration-500 rounded-md"
              >
                {val.name}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
