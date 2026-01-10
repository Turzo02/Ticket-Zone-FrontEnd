import { Link, NavLink } from "react-router";
import logo from "/favicon.png";
import { useTheme } from "../../Context/ThemeToggle/useTheme";
import { LogOut, Moon, Sun, User, Menu, ChevronDown } from "lucide-react";
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

  const navLinkClass = ({ isActive }) => `
  relative px-4 py-2 rounded-md text-sm font-bold transition-all duration-300 ease-out
  flex items-center gap-2
  ${
    isActive
      ? "bg-linear-to-r from-(--grad-start) to-(--grad-end) text-(--nav-text-active) shadow-lg shadow-(--grad-start)/20 scale-105"
      : "text-(--text-muted) hover:text-(--brand-primary) hover:bg-(--surface-highlight)"
  }
`;

  const links = (
    <>
      <li className="mx-1">
        <NavLink to="/" className={navLinkClass}>
          Home
        </NavLink>
      </li>
      <li className="mx-1">
        <NavLink to="/about-us" className={navLinkClass}>
          About Us
        </NavLink>
      </li>
      <li className="mx-1">
        <NavLink to="/terms-and-conditions" className={navLinkClass}>
          Terms & Conditions
        </NavLink>
      </li>

      {user && (
        <li className="mx-1">
          <NavLink to="/all-tickets" className={navLinkClass}>
            All Tickets
          </NavLink>
        </li>
      )}

      {user && (
        <li className="mx-1">
          <NavLink to="/Dashboard" className={navLinkClass}>
            Dashboard
          </NavLink>
        </li>
      )}
    </>
  );

  return (
    <div
      className="
        sticky top-0 z-50
        backdrop-blur-xl
        bg-(--bg-stats)
        border-b border-(--nav-border)
        transition-colors duration-300
      "
    >
      <div className="navbar max-w-7xl mx-auto px-4 sm:px-6 h-20">
        {/* Navbar Start: Mobile Menu & Logo */}
        <div className="navbar-start gap-3">
          {/* Mobile Dropdown */}
          <div className="dropdown lg:hidden">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle hover:bg-(--surface-highlight) text-(--text-main)"
            >
              <Menu size={24} />
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-50 p-3 shadow-2xl bg-(--surface-card) border border-(--border-card) rounded-2xl w-56 gap-2"
            >
              {links}
            </ul>
          </div>

          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2.5 group transition-all duration-300 ease-in-out hover:opacity-90"
          >
            <div className="relative">
              <img
                className="relative w-9 h-9 object-contain transform group-hover:rotate-12 transition-transform duration-300"
                src={logo}
                alt="Ticket Zone Logo"
              />
            </div>

            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-black tracking-tighter leading-none flex items-center gap-0.5">
                <span className="text-(--text-main)">TICKET</span>
                <span className="text-transparent bg-clip-text bg-linear-to-r from-(--grad-start) to-(--grad-end) italic pr-1">
                  ZONE
                </span>
              </span>
            </div>
          </Link>
        </div>

        {/* Navbar Center: Desktop Menu */}
        <div className="navbar-center hidden lg:flex">
          <ul className="flex items-center gap-1">{links}</ul>
        </div>

        {/* Navbar End: Auth & Theme */}
        <div className="navbar-end gap-3">
          {/* Theme Toggle (Always visible) */}
          <button
            onClick={toggleTheme}
            className="btn btn-ghost btn-circle btn-sm hover:bg-(--surface-highlight) text-(--text-muted) hover:text-(--brand-primary) transition-colors"
            title="Toggle Theme"
          >
            {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
          </button>

          {user ? (
            <div className="dropdown dropdown-end">
              {/* User Avatar Trigger */}
              <label
                tabIndex={0}
                className="
                  flex items-center gap-2 pl-1 pr-3 py-1 rounded-full 
                   hover:border-(--border-highlight)
                  bg-(--surface-card) hover:bg-(--surface-highlight)
                  cursor-pointer transition-all duration-200
                "
              >
                <div className="avatar">
                  <div className="w-8 h-8 rounded-full ">
                    <img
                      src={
                        user.photoURL ||
                        "https://api.dicebear.com/7.x/notionists/svg?seed=TicketUser"
                      }
                      alt="User"
                    />
                  </div>
                </div>
                <div className="hidden sm:flex flex-col items-start gap-0.5">
                  <span className="text-xs font-bold text-(--text-main) leading-none max-w-20 truncate">
                    {user.displayName?.split(" ")[0] || "User"}
                  </span>
                </div>
                <ChevronDown size={14} className="text-(--text-muted) ml-1" />
              </label>

              {/* User Dropdown Menu */}
              <ul
                tabIndex={0}
                className="menu dropdown-content mt-3 z-50 p-2 shadow-xl bg-(--surface-card) border border-(--border-card) rounded-2xl w-56 gap-1"
              >
                <li className="menu-title px-4 py-2 text-(--text-muted) text-xs font-bold uppercase tracking-wider">
                  Account
                </li>
                <li>
                  <Link
                    to="/dashboard"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-(--surface-highlight) text-(--text-main) font-medium active:bg-(--surface-highlight)"
                  >
                    <User size={16} className="text-(--brand-primary)" />
                    My Profile
                  </Link>
                </li>
                <div className="h-px bg-(--border-subtle) my-1 mx-2"></div>
                <li>
                  <button
                    onClick={handleLogOut}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-500/10 hover:text-red-600 font-bold"
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <Link
              to="/login"
              className="
                group relative px-6 py-2.5 rounded-xl font-bold text-sm text-white overflow-hidden shadow-lg shadow-(--grad-start)/20 hover:shadow-(--grad-start)/40 transition-all duration-300
              "
            >
              <span className="absolute inset-0 w-full h-full bg-linear-to-r from-(--grad-start) to-(--grad-end) group-hover:scale-105 transition-transform duration-300"></span>
              <span className="relative">Login</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
