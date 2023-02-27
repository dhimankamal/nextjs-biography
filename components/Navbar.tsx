import { NextPage } from "next";
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
      href: "/",
    },
    {
      name: "Contact us",
      href: "/",
    },
  ];
  return (
    <>
      <header className="text-gray-600  dark:text-gray-300 body-font">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <nav className="flex lg:w-2/5 flex-wrap items-center text-base md:ml-auto">
            {navLinks.map(val => {
              return (
                <a
                  key={val.name}
                  href={val.href}
                  className="mr-5 cursor-pointer hover:text-gray-900 dark:hover:text-white"
                >
                  {val.name}
                </a>
              );
            })}
          </nav>
          <a className="flex order-first lg:order-none lg:w-1/5 title-font font-medium items-center text-gray-900 lg:items-center lg:justify-center mb-4 md:mb-0">
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
          <div className="lg:w-2/5 inline-flex lg:justify-end ml-5 lg:ml-0">
            <ThemeToggel />
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
