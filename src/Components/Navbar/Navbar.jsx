import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router";
import logo from "/favicon.png";
import { LogOut, User, Menu, ChevronDown, LayoutDashboard } from "lucide-react";
import useAuth from "../../Hooks/useAuth";
import ThemeToggle from "../ThemeToggle/ThemeToggle";

const Navbar = () => {
  const { logOut, user } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);

  // 1. Scroll Detection for Glass Effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogOut = () => {
    logOut().catch((error) => console.log(error));
  };

  const navLinkClass = ({ isActive }) => `
    relative px-4 py-2 rounded-xl text-sm font-bold transition-all duration-200 ease-out
    flex items-center gap-2
    ${
      isActive
        ? "bg-linear-to-r from-(--grad-start) to-(--grad-end) text-white shadow-lg shadow-(--grad-start)/20 scale-105"
        : "text-(--text-muted) hover:text-(--text-main) hover:bg-(--bg-soft-accent)"
    }
  `;

  const links = (
    <>
      <li className="mx-1"><NavLink to="/" className={navLinkClass}>Home</NavLink></li>
      <li className="mx-1"><NavLink to="/about-us" className={navLinkClass}>About Us</NavLink></li>
      <li className="mx-1"><NavLink to="/guideline" className={navLinkClass}>Guideline</NavLink></li>
      <li className="mx-1"><NavLink to="/all-tickets" className={navLinkClass}>All Tickets</NavLink></li>
      {user && (
        <li className="mx-1">
          <NavLink to="/dashboard" className={navLinkClass}>
             <LayoutDashboard size={16} /> Dashboard
          </NavLink>
        </li>
      )}
    </>
  );

  return (
    <div
      className={`
        fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out
        ${isScrolled 
          ? "py-2 bg-(--bg-soft)/80 backdrop-blur-xl border-(--border-card) border-b" 
          : "py-4 bg-transparent border-transparent"
        }
      `}
    >
      <div className="navbar max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* --- Navbar Start: Logo & Mobile Menu --- */}
        <div className="navbar-start gap-3">
          
          {/* Mobile Menu Dropdown */}
          <div className="dropdown lg:hidden">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle hover:bg-(--bg-soft-accent) text-(--text-main)"
            >
              <Menu size={24} />
            </div>
            <ul
              tabIndex={0}
              className="
                menu menu-sm dropdown-content mt-3 z-50 p-3 
                shadow-2xl bg-(--bg-card) border border-(--border-card) 
                rounded-2xl w-64 gap-2 animate-in fade-in zoom-in-95 duration-200
              "
            >
              {links}
            </ul>
          </div>

          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2.5 group transition-transform "
          >
            <div className="relative">
              <img
                className="w-10 h-10 object-contain drop-shadow-md group-hover:rotate-12 transition-transform duration-500"
                src={logo}
                alt="Logo"
              />
            </div>
               {/* Text Logo with Theme Gradient */}
              <div className="flex flex-col">
                <span className="text-2xl font-black tracking-tighter leading-none flex items-center gap-1">
                  <span className="text-(--text-main)">TICKET</span>
                  {/* Gradient applied to ZONE matching the theme (Blue vs Green) */}
                  <span className="italic scale-110 text-transparent bg-clip-text bg-linear-to-r from-(--grad-start) to-(--grad-end)">
                    ZONE
                  </span>
                </span>
              </div>
          </Link>
        </div>

        {/* --- Navbar Center: Desktop Links --- */}
        <div className="navbar-center hidden lg:flex">
          <ul className="flex items-center gap-1 p-1.5 rounded-2xl bg-(--bg-soft-accent)/50 border border-(--border-card)/50 backdrop-blur-md">
            {links}
          </ul>
        </div>

        {/* --- Navbar End: Actions --- */}
        <div className="navbar-end gap-1">
          
          <ThemeToggle />

          {user ? (
            <div className="dropdown dropdown-end">
              {/* User Trigger */}
              <label
                tabIndex={0}
                className={`
                  flex items-center gap-2 pl-1 pr-3 py-1 rounded-full 
                  border transition-all duration-300 cursor-pointer
                  ${isScrolled 
                    ? "bg-(--bg-soft-accent) border-(--border-card)" 
                    : "bg-(--bg-card) border-(--border-card) shadow-lg"
                  }
                  hover:border-(--grad-start) hover:shadow-(--grad-start)/20
                `}
              >
                <div className="avatar">
                  <div className="w-9 h-9 rounded-full ring-2 ring-(--bg-page)">
                    <img
                      src={user.photoURL || "https://api.dicebear.com/7.x/notionists/svg?seed=TicketUser"}
                      alt="User"
                    />
                  </div>
                </div>
                <div className="hidden sm:flex flex-col items-start gap-0.5">
                  <span className="text-xs font-bold text-(--text-main) max-w-20 truncate">
                    {user.displayName?.split(" ")[0]}
                  </span>
                </div>
                <ChevronDown size={14} className="text-(--text-muted)" />
              </label>

              {/* User Menu */}
              <ul
                tabIndex={0}
                className="
                  menu dropdown-content mt-4 z-50 p-2 
                  shadow-2xl bg-(--bg-card) border border-(--border-card) 
                  rounded-2xl w-60 gap-1 animate-in slide-in-from-top-2 duration-200
                "
              >

                <li>
                  <Link to="/dashboard" className="rounded-xl font-bold text-(--text-main) hover:bg-(--bg-soft-accent) py-4">
                    <User size={16} /> My Profile
                  </Link>
                </li>
                <li>
                  <button onClick={handleLogOut} className="rounded-xl font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 py-4">
                    <LogOut size={16} /> Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <Link
              to="/login"
              className="
                group relative px-6 py-2.5 rounded-xl font-black text-sm text-(--text-inv) 
                overflow-hidden shadow-lg shadow-(--grad-start)/30 
                hover:shadow-(--grad-start)/50 hover:-translate-y-0.5 transition-all duration-300
              "
            >
              <div className="absolute inset-0 w-full h-full bg-linear-to-r from-(--grad-start) to-(--grad-end)"></div>
              <span className="relative z-10 flex items-center gap-2">
                 Login <span className="group-hover:translate-x-1 transition-transform">→</span>
              </span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
