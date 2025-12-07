import { useEffect, useState } from "react";

export function useTheme() {
  // Theme Toggle Functionality Added
  const getInitialTheme = () => {
    // 1. Check localStorage
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) return storedTheme;

    // 2. Check system preference
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    return prefersDark ? "dark" : "light";
  };

  const [theme, setTheme] = useState(getInitialTheme);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return [theme, toggleTheme];
}
