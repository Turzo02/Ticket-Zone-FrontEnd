import React, { useEffect, useState } from "react";

const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem("theme") === "dark";
  });

  const updateDOM = (isDark) => {
    const theme = isDark ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.classList.toggle("dark", isDark);
    localStorage.setItem("theme", theme);
  };

  useEffect(() => {
    updateDOM(isDarkMode);
  }, [isDarkMode]);

  const toggleTheme = async (e) => {
    const nextState = !isDarkMode;

    if (!document.startViewTransition) {
      setIsDarkMode(nextState);
      updateDOM(nextState);
      return;
    }

    const x = e.clientX;
    const y = e.clientY;

    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    const transition = document.startViewTransition(() => {
      setIsDarkMode(nextState);
      updateDOM(nextState);
    });

    await transition.ready;

    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${endRadius}px at ${x}px ${y}px)`,
        ],
      },
      {
        duration: 750,
        easing: "cubic-bezier(0.75, 0, 1, 1)", 
        pseudoElement: "::view-transition-new(root)",
      }
    );
  };

  return (
    <button
      onClick={toggleTheme}
      className="btn btn-circle btn-ghost text-xl transition-transform hover:scale-110 active:scale-95"
      aria-label="Toggle Theme"
    >
      {isDarkMode ? "🌙" : "☀️"}
    </button>
  );
};

export default ThemeToggle;
