import { NextPage } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";
import MobileMenu from "./MobileMenu";
import ThemeToggel from "./ThemeToggel";
import { useRouter } from "next/router";
import { Logo, SearchIcon } from "../icon";
import Search from "./Search";

interface Props {}

const Navbar: NextPage<Props> = ({}) => {
  const [isActive, setIsActive] = useState(false);
  const [theme, setTheme] = useState("light");
  const [showSeach, setShowSeach] = useState(false);
  const router = useRouter();

  console.log("router", router.pathname);

  useEffect(() => {
    const handleRouteChange = () => {
      setIsActive(false);
      setShowSeach(false);
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
  const handleClick = () => {
    setIsActive(!isActive);
    setShowSeach(false);
  };
  const navLinks = [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "Category",
      href: "/category",
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
      <header className="text-gray-600 z-50  dark:text-gray-300 body-font sticky top-0 bg-neutral-100/80 dark:bg-neutral-900/80 transition-all duration-500 backdrop-blur-xl">
        <div className="container mx-auto flex px-2 lg:px-5 lg:py-2 flex-row items-center gap-2 z-10">
          <nav className="hidden lg:flex items-center justify-center lg:justify-start text-base w-full">
            {navLinks.map(val => {
              return (
                <Link
                  key={val?.name}
                  href={val?.href}
                  className={`mr-5 last:mr-0 cursor-pointer hover:text-gray-900 dark:hover:text-white transition-all duration-200 ${
                    router.pathname === val.href
                      ? "border-b border-cyan-500"
                      : ""
                  }`}
                >
                  {val?.name}
                </Link>
              );
            })}
          </nav>
          <Link
            href="/"
            className="flex order-first w-full lg:order-none lg:w-1/5 title-font font-medium items-center text-gray-900 lg:items-center lg:justify-center"
          >
            <Logo classes="w-12 md:w-14 fill-neutral-900 dark:fill-white transition-all" />
            <span className="hidden md:block ml-3 text-xl dark:text-white">
              GossipGeeks
            </span>
          </Link>

          <div className="flex items-center gap-2 lg:w-full lg:ml-0 lg:flex lg:items-center lg:justify-end">
            <button onClick={() => setShowSeach(!showSeach)}>
              <SearchIcon classes="w-6 h-full fill-neutral-900 dark:fill-white " />
            </button>
            <ThemeToggel theme={theme} toggleTheme={toggleTheme} />
            <div className="lg:hidden">
              <MobileMenu isActive={isActive} handleClick={handleClick} />
            </div>
          </div>
        </div>
        {showSeach && <Search />}
      </header>
      {isActive && (
        <div className="fixed z-10 bg-neutral-100 top-0 h-screen dark:bg-neutral-900 w-full flex flex-col items-center justify-center gap-10">
          {navLinks.map(val => {
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
        </div>
      )}
    </>
  );
};

export default Navbar;
