import { Link } from "react-router";
import logo from "/favicon.png";
import { useTheme } from "../../Context/ThemeToggle/useTheme";
import { Moon, Sun } from "lucide-react";
import useAuth from "../../Hooks/useAuth";
const Navbar = () => {
  const [theme, toggleTheme] = useTheme();
  const { logOut, user } = useAuth();

  const handleLogOut = () => {
    logOut()
      .then(() => {console.log("logged out succesfully")})
      .catch((error) => {
        console.log(error);
      });
  };

  const links = (
    <>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/all-tickets">All Tickets</Link>
      </li>
      <li>
        <Link to="/dashboard">Dashboard</Link>
      </li>
    </>
  );

  return (
    <div className=" sticky top-0 z-50 bg-base-100">
      <div className="navbar shadow-sm ">
        {/* Navbar Start */}
        <div className="navbar-start">
          <div className="dropdown">
            {/* Mobile Hamburger */}
            <div tabIndex={0} className="btn btn-ghost lg:hidden">
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
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>

          {/* Logo */}
          <Link to="/" className="btn btn-ghost text-xl">
            <img className="w-9" src={logo} alt="Logo" />
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
                className="btn btn-ghost rounded-btn flex justify-center items-center gap-2"
              >

                <img
               src={user.photoURL || "https://api.dicebear.com/7.x/notionists/svg?seed=Data_User_006"} 
                  alt="User Avatar"
                  className="w-8 h-8 rounded-full"
                />
                <span>{user.displayName || "user"}</span>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-compact dropdown-content mt-2 p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <Link to="/dashboard">My Profile</Link>
                </li>
                <li>
                  <button onClick={handleLogOut}>Logout</button>
                </li>
                <li>
                  {" "}
                  <button
                    onClick={toggleTheme}
                    className={`p-2 rounded-field cursor-pointer `}
                    title="Toggle Theme"
                  >
                    {`Switch to ${theme === "light" ? "Dark" : "Light"} Theme`}
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-field cursor-pointer  border
        ${theme === "light" ? "border-black " : "border"}
      `}
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
