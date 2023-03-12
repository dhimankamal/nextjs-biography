import { NextPage } from "next";
import Link from "next/link";
import { ArrowIcon, SearchIcon } from "../icon";

interface Props {}

const Search: NextPage<Props> = ({}) => {
  return (
    <div className="container mx-auto p-4">
      <div className="flex gap-4 items-center ">
        <div>
          <SearchIcon classes="w-6 fill-white" />
        </div>
        <div className="w-full">
          <input
            type="text"
            className="w-full py-2 px-4 bg-transparent border-white border rounded-md"
            placeholder="Seach here"
          />
        </div>
      </div>
      <div className="p-6">
        <p className="mb-4 font-bold">Quick Links</p>
        <ul>
          <li>
            <Link href="/" className="flex gap-2 opacity-80 cursor-pointer">
              <ArrowIcon classes="w-4 fill-white" />
              <span>
                Marizanne Kapp Height, Age, Husband, Family, Biography & More
              </span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Search;
