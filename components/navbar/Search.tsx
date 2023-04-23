import axios from "axios";
import { NextPage } from "next";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowIcon, SearchIcon } from "../icon";
import { Post } from "@prisma/client";

interface Props {}

const renderLinks = (quickLinks: Post[]) => {
  if (!quickLinks.length) {
    return <span>No result found</span>;
  }
  return (
    <ul className="space-y-2">
      {quickLinks?.map((val) => (
        <li key={val.id} className="">
          <Link
            href={val.slug}
            className="flex items-baseline gap-2 opacity-70 cursor-pointer hover:opacity-100 transition-opacity duration-300"
          >
            <ArrowIcon classes="w-4 lg:w-2 dark:fill-white fill-neutral-900" />
            <span dangerouslySetInnerHTML={{ __html: val.title }}></span>
          </Link>
        </li>
      ))}
    </ul>
  );
};

const skelton = () => {
  const array = [1, 2, 3, 4, 5, 6];
  return (
    <ul className="space-y-2 animate-pulse">
      {array.map((value) => {
        return (
          <li key={value}>
            <div className="lg:w-1/2 bg-neutral-200 h-6 rounded-md"></div>
          </li>
        );
      })}
    </ul>
  );
};

const Search: NextPage<Props> = ({}) => {
  const [loading, setLoading] = useState(true);
  const [linkLoading, setLinkLoading] = useState(true);
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(
    null
  );
  const [searchData, setSearchData] = useState<Post[]>([]);
  const [quickLinks, setQuickLinks] = useState<Post[]>([]);
  const [value, setValue] = useState<string>("");

  const inputRef = useRef<HTMLInputElement>(null);

  const getQuickLinks = async () => {
    setLinkLoading(true);
    try {
      const res = await axios.get<Post[]>("/api/post/getpost?page=2");
      if (res.data && res.data.length > 0) {
        setQuickLinks(res.data);
        setLinkLoading(false);
      }
    } catch (error) {
      console.log("error", error);
      setLinkLoading(false);
    }
  };

  const handleSearch = async () => {
    if (value && value != "") {
      try {
        setLoading(true);
        const res = await fetch("/api/post/search", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ search: value, take: 6 }),
        });

        const postDataRes = await res.json();
        if (postDataRes) {
          setSearchData(postDataRes);
        }
      } catch (error) {
        setSearchData([]);
        console.log("error", error);
      } finally {
        setLoading(false);
      }
    } else {
      setSearchData([]);
    }
  };

  useEffect(() => {
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    // Set a new timeout to call the API after 500ms of no typing
    setTypingTimeout(setTimeout(handleSearch, 500));

    return () => {
      if (typingTimeout) {
        clearTimeout(typingTimeout);
      }
    };
  }, [value]);

  useEffect(() => {
    getQuickLinks();
  }, []);

  return (
    <div className="container mx-auto p-4 max-h-[70vh] overflow-auto mb-4">
      <div className="flex gap-4 items-center ">
        <SearchIcon classes="w-6 hidden md:block dark:fill-white" />

        <div className="w-full">
          <input
            ref={inputRef}
            onChange={(e) => setValue(e.target.value)}
            type="text"
            className="w-full bg-transparent bg-opacity-50 rounded border  focus:border-cyan-500  focus:ring-2 focus:ring-cyan-200 text-base outline-none dark:text-white py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            placeholder="Search here"
          />
        </div>
      </div>
      <div className="px-2 py-6 lg:px-6 ">
        {!searchData.length && !value ? (
          <>
            <p className="mb-4 font-bold text-xl">Quick Links</p>
            {linkLoading ? skelton() : renderLinks(quickLinks)}
          </>
        ) : (
          <>
            <p className="mb-4 font-bold text-xl">Search Result</p>
            {loading ? skelton() : renderLinks(searchData)}
          </>
        )}
      </div>
    </div>
  );
};

export default Search;
