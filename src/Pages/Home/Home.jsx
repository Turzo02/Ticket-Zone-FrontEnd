import React from "react";
import { useTheme } from "../../Context/ThemeToggle/useTheme";
const Home = () => {
  const [theme, toggleTheme] = useTheme();
  return (
    <div>
      Home
      {/* Theme Toggle */}
      <button className="btn " onClick={toggleTheme}>
        Switch to {theme === "light" ? "Dark" : "Light"} Mode
      </button>
    </div>
  );
};

export default Home;
