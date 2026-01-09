import { Link, NavLink } from "react-router";
import logo from "/favicon.png";
import { useTheme } from "../../Context/ThemeToggle/useTheme";
import { LogOut, Moon, Sun, User } from "lucide-react";
import useAuth from "../../Hooks/useAuth";
const Navbar = () => {
  const [theme, toggleTheme] = useTheme();
  const { logOut, user } = useAuth();

  const handleLogOut = () => {
    logOut()
      .then(() => {
        // console.log("logged out succesfully");
      })
      .catch((error) => {
        // console.log(error);
      });
  };

  const links = (
    <>
      {["Home", "All Tickets", "Dashboard"].map((label) => {
        const path =
          label === "Home" ? "/" : `/${label.toLowerCase().replace(" ", "-")}`;
        return (
          <li key={label} className="mx-1">
            <NavLink
              to={path}
              className={({ isActive }) =>
                `relative px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ease-out
              ${
                isActive
                  ? "bg-primary text-primary-content shadow-lg shadow-primary/25 scale-105"
                  : "text-base-content/70 hover:text-primary hover:bg-primary/10"
              }`
              }
            >
              {label}
            </NavLink>
          </li>
        );
      })}
    </>
  );

  return (
    <div
      className="
    sticky top-0 z-50
    backdrop-blur-md
    border-b border-base-300
  "
    >
      <div className="navbar  max-w-7xl mx-auto px-4 sm:px-6">
        {/* Navbar Start */}
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost lg:hidden hover:bg-primary/10 hover:text-primary transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-1 p-3 shadow-2xl bg-base-100 border border-base-300 rounded-2xl w-52 gap-2"
            >
              {links}
            </ul>
          </div>

          {/* Logo */}
          {/* Logo Section */}
          <Link
            to="/"
            className="flex items-center gap-3 group transition-all duration-300 ease-in-out hover:opacity-80"
          >
            <div className="relative">
              <img
                className="relative w-10 h-10 object-contain transform group-hover:scale-105 transition-transform duration-300"
                src={logo}
                alt="Ticket Zone Logo"
              />
            </div>

            {/* Text Logo with Dual Weights */}
            <div className="flex flex-col">
              <span className="text-2xl font-black tracking-tighter leading-none flex items-center gap-1">
                <span className="text-base-content">TICKET</span>
                <span className="text-info italic">ZONE</span>
              </span>
            </div>
          </Link>
        </div>

        {/* Navbar Center */}
        <div className="navbar-center hidden lg:flex">
          <ul className="flex items-center gap-1">{links}</ul>
        </div>

        {/* Navbar End */}

        <div className="navbar-end gap-2">
          {user ? (
            <div className="dropdown dropdown-end">
              {/* User Button */}
              <label
                tabIndex={0}
                className="btn btn-ghost rounded-full flex items-center gap-2 px-2 hover:bg-base-200 transition-colors"
              >
                <div className="avatar">
                  <div className="w-9 h-9 rounded-full ring-1 ring-base-300">
                    <img
                      src={
                        user.photoURL ||
                        "https://api.dicebear.com/7.x/notionists/svg?seed=Data_User_006"
                      }
                      alt="User"
                    />
                  </div>
                </div>
                <span className="hidden sm:block font-semibold text-sm mr-1">
                  {user.displayName?.split(" ")[0] || "User"}
                </span>
              </label>

              {/* Dropdown Menu */}
              <ul
                tabIndex={0}
                className="menu dropdown-content mt-3 z-1 p-2 shadow-xl bg-base-100 border border-base-300 rounded-xl w-52"
              >
                <li>
                  <Link
                    to="/dashboard"
                    className="flex items-center gap-2 py-3"
                  >
                    <User size={16} />
                    My Profile
                  </Link>
                </li>
                <li>
                  <button
                    onClick={toggleTheme}
                    className="flex items-center gap-2 py-3"
                  >
                    {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
                    {theme === "light" ? "Dark Mode" : "Light Mode"}
                  </button>
                </li>
                <div className="divider my-0 opacity-50"></div>
                <li>
                  <button
                    onClick={handleLogOut}
                    className="flex items-center gap-2 py-3 text-error hover:bg-error/10"
                  >
                    <LogOut size={16} />
                    <span className="font-bold">Logout</span>
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={toggleTheme}
                className="btn btn-ghost btn-circle btn-sm hover:bg-base-200"
              >
                {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
              </button>

              <Link
                to="/login"
                className="btn btn-primary btn-sm px-5 rounded-lg font-bold"
              >
                Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
