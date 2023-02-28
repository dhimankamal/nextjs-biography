import { NextPage } from "next";
import Link from "next/link";
import ThemeToggel from "./ThemeToggel";

interface Props {}

const Navbar: NextPage<Props> = ({}) => {
  const navLinks = [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "About",
      href: "/about",
    },
    {
      name: "Contact us",
      href: "/",
    },
  ];
  return (
    <>
      <header className="text-gray-600 z-50  dark:text-gray-300 body-font sticky top-0 bg-neutral-100 dark:bg-neutral-900 ">
        <div className="container mx-auto flex p-5 flex-col md:flex-row items-center gap-2">
          <nav className="flex items-center justify-center lg:justify-start text-base w-full">
            {navLinks.map(val => {
              return (
                <Link
                  key={val.name}
                  href={val.href}
                  className="mr-5 last:mr-0 cursor-pointer hover:text-gray-900 dark:hover:text-white"
                >
                  {val.name}
                </Link>
              );
            })}
          </nav>
          <a className="flex order-first w-full justify-center lg:order-none lg:w-1/5 title-font font-medium items-center text-gray-900 lg:items-center lg:justify-center mb-4 md:mb-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full"
              viewBox="0 0 24 24"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
            <span className="ml-3 text-xl dark:text-white">Tailblocks</span>
          </a>
          <div className="w-full lg:justify-end lg:ml-0 flex items-center justify-center">
            <ThemeToggel />
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
