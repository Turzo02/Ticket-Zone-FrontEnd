import { Link, NavLink } from "react-router";
import logo from "/favicon.png";
import { useTheme } from "../../Context/ThemeToggle/useTheme";
import { Moon, Sun } from "lucide-react";
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
      <li>
        <NavLink className="hover:text-primary" to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/all-tickets">All Tickets</NavLink>
      </li>
      <li>
        <NavLink to="/dashboard">Dashboard</NavLink>
      </li>
    </>
  );

  return (
    <div
      className="
    sticky top-0 z-50
    bg-base-100/80
    dark:bg-base-100/60
    backdrop-blur-md
    border-b border-base-300
  "
    >
      <div className="navbar max-w-7xl mx-auto px-4 sm:px-6">
        {/* Navbar Start */}
        <div className="navbar-start">
          <div className="dropdown">
            {/* Mobile Hamburger */}
            <div
              tabIndex={0}
              className="
            btn btn-ghost lg:hidden
            hover:bg-base-200
          "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
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
              tabIndex={-1}
              className="
            menu menu-sm dropdown-content
            mt-3 w-52 p-2
            rounded-box
            bg-base-200/90
            backdrop-blur-md
            border border-base-300
            shadow
          "
            >
              {links}
            </ul>
          </div>

          {/* Logo */}
          <Link
            to="/"
            className="
          btn btn-ghost text-xl gap-2
          font-bold
        "
          >
            <img className="w-9 h-9" src={logo} alt="Logo" />
            Ticket Zone
          </Link>
        </div>

        {/* Navbar Center */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 font-semibold">{links}</ul>
        </div>

        {/* Navbar End */}
        <div className="navbar-end">
          {user ? (
            <div className="dropdown dropdown-end">
              <label
                tabIndex={0}
                className="
              btn btn-ghost
              rounded-full
              flex items-center gap-2
              hover:bg-base-200
            "
              >
                <img
                  src={
                    user.photoURL ||
                    "https://api.dicebear.com/7.x/notionists/svg?seed=Data_User_006"
                  }
                  alt="User Avatar"
                  className="w-8 h-8 rounded-full ring-2 ring-base-300"
                />
                <span className="hidden sm:block font-medium">
                  {user.displayName || "user"}
                </span>
              </label>

              <ul
                tabIndex={0}
                className="
              menu dropdown-content
              mt-3 w-52 p-2
              rounded-box
              bg-base-200/90
              backdrop-blur-md
              border border-base-300
              shadow
            "
              >
                <li>
                  <Link to="/dashboard">My Profile</Link>
                </li>
                <li>
                  <button onClick={handleLogOut}>Logout</button>
                </li>
                <li>
                  <button onClick={toggleTheme} className="justify-between">
                    Switch to {theme === "light" ? "Dark" : "Light"}
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <button
                onClick={toggleTheme}
                className="
              btn btn-ghost btn-circle
              hover:bg-base-200
            "
                title="Toggle Theme"
              >
                {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
              </button>

              <Link to="/login" className="btn btn-primary">
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
