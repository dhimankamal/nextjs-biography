import { NextPage } from "next";
import Link from "next/link";

interface Props {
  data: {
    name: string;
    href: string;
    options: { name: string; href: string }[];
  };
}

const Dropdown: NextPage<Props> = ({ data }) => {
  return (
    <div
      className={`group last:mr-0 cursor-pointer hover:text-gray-900 dark:hover:text-white transition-all duration-200 flex justify-center`}
    >
      <span>{data.name}</span>
      <div className="absolute hidden group-hover:block pt-4 mt-4 shadow-md">
        <ul className="bg-white p-2 rounded-md">
          {data.options.map((val) => (
            <li
              className="py-2 px-3 transition-all duration-300 hover:bg-slate-100"
              key={val?.href}
            >
              <Link
                href={val?.href}
                className={` last:mr-0 cursor-pointer hover:text-gray-900 dark:hover:text-white transition-all duration-200`}
              >
                {" "}
                - {val?.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dropdown;
