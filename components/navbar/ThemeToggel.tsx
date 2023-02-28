import { NextPage } from "next";
import { useEffect, useState } from "react";

interface Props {
  theme: string;
  toggleTheme: () => void;
}

const ThemeToggel: NextPage<Props> = ({ theme, toggleTheme }) => {
  return (
    <>
      <input
        type="checkbox"
        id="theme-toggle"
        checked={theme === "dark"}
        onClick={() => toggleTheme()}
      />
      <label htmlFor="theme-toggle" />
    </>
  );
};

export default ThemeToggel;
