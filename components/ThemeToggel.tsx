import { NextPage } from "next";
import { useEffect, useState } from "react";

interface Props {}

const ThemeToggel: NextPage<Props> = ({}) => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    if (mediaQuery.matches) {
      setTheme("dark");
    }
    const listener = () => {
      setTheme(mediaQuery.matches ? "dark" : "light");
    };
    mediaQuery.addListener(listener);
    return () => {
      mediaQuery.removeListener(listener);
    };
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
  return (<>
    <input type="checkbox" id="theme-toggle" checked={theme === "dark"} onClick={()=>toggleTheme()} />
      <label for="theme-toggle" />
  </>


  );
};

export default ThemeToggel;
