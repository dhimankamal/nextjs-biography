import { NextPage } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";
import MobileMenu from "./MobileMenu";
import ThemeToggel from "./ThemeToggel";
import { useRouter } from "next/router";

interface Props {}

const Navbar: NextPage<Props> = ({}) => {
  const [isActive, setIsActive] = useState(false);
  const [theme, setTheme] = useState("light");
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = () => {
      setIsActive(false);
    };

    router.events.on("routeChangeStart", handleRouteChange);

    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, [router.events]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    if (mediaQuery.matches) {
      setTheme("dark");
    }
    // const listener = () => {
     // setTheme(mediaQuery.matches ? "dark" : "light");
    // };
    // mediaQuery.addListener(listener);
    // return () => {
    //   mediaQuery.removeListener(listener);
    // };
  }, []);

  useEffect(() => {
    document.documentElement.classList.add(theme);
    document.documentElement.classList.remove(
      theme === "dark" ? "light" : "dark"
    );
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };
  const handleClick = () => setIsActive(!isActive);
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
      href: "/contact",
    },
  ];
  return (
    <>
      <header className="text-gray-600 z-50  dark:text-gray-300 body-font sticky top-0 bg-neutral-100 dark:bg-neutral-900 ">
        <div className="container mx-auto flex px-5 lg:py-5 flex-row items-center gap-2 z-10">
          <nav className="hidden lg:flex items-center justify-center lg:justify-start text-base w-full">
            {navLinks.map((val) => {
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
          <a className="flex order-first w-full lg:order-none lg:w-1/5 title-font font-medium items-center text-gray-900 lg:items-center lg:justify-center">
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
            <span className="ml-3 text-xl dark:text-white">GossipGeeks</span>
          </a>
          <div className="lg:hidden">
            <MobileMenu isActive={isActive} handleClick={handleClick} />
          </div>
          <div className="w-full hidden lg:justify-end lg:ml-0 lg:flex items-center justify-center">
            <ThemeToggel theme={theme} toggleTheme={toggleTheme} />
          </div>
        </div>
      </header>
      {isActive && (
        <div className="fixed z-10 bg-neutral-100 top-0 h-screen dark:bg-neutral-900 w-full flex flex-col items-center justify-center gap-10">
          {navLinks.map((val) => {
            return (
              <Link
                key={val.name}
                href={val.href}
                className="cursor-pointer text-3xl hover:text-gray-900 dark:hover:text-white"
              >
                {val.name}
              </Link>
            );
          })}
          <ThemeToggel theme={theme} toggleTheme={toggleTheme} />
        </div>
      )}
    </>
  );
};

export default Navbar;
