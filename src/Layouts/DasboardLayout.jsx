import { SlidersHorizontal, LayoutDashboard, LogOut, X } from "lucide-react";
import React, { useState } from "react";
import { NavLink, Outlet } from "react-router";
import SwappingDotLoader from "../Components/Loading/SwappingDotLoader";
import useRole from "../Hooks/useRole";

const menuItems = [
  { label: "Profile", path: "/dashboard/user-profile", roles: ["user", "vendor", "admin"] },
  { label: "My Booked Tickets", path: "/dashboard/my-booked-tickets", roles: ["user"] },
  { label: "Transaction History", path: "/dashboard/transaction-history", roles: ["user"] },
  { label: "Add Tickets", path: "/dashboard/add-tickets", roles: ["vendor"] },
  { label: "My Added Tickets", path: "/dashboard/my-added-tickets", roles: ["vendor"] },
  { label: "Requested Tickets", path: "/dashboard/requested-tickets", roles: ["vendor"] },
  { label: "Revenue Overview", path: "/dashboard/revenue-overview", roles: ["vendor"] },
  { label: "Manage Users", path: "/dashboard/manage-users", roles: ["admin"] },
  { label: "Manage Tickets", path: "/dashboard/manage-tickets", roles: ["admin"] },
  { label: "Advertisement", path: "/dashboard/advertisement-tickets", roles: ["admin"] },
];

const DashboardLayout = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { role, roleLoading } = useRole();

  if (roleLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-(--bg-page)">
        <SwappingDotLoader />
      </div>
    );
  }

  const allowedMenuItems = menuItems.filter((item) => item.roles.includes(role));

  return (
    // Root Wrapper: Stops whole page scrolling, handles layout
    <div className="flex h-screen max-w-7xl mx-auto bg-(--bg-page) text-(--text-main) overflow-hidden">
      
      {/* 
          MOBILE OVERLAY (Backdrop)
          Only visible when drawer is open on small screens
         */}
      {drawerOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden animate-in fade-in duration-300"
          onClick={() => setDrawerOpen(false)}
        />
      )}

      {/*
          SIDEBAR (Responsive)
       */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-50
          w-72 h-full
          bg-(--sidebar-bg) border-r border-(--sidebar-border)
          transform transition-transform duration-300 ease-in-out
          ${drawerOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full lg:translate-x-0 lg:shadow-none"}
          flex flex-col
        `}
      >
        {/* Sidebar Header */}
        <div className="p-6 border-b border-(--sidebar-border) flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-(--grad-start)/10 rounded-xl">
               <LayoutDashboard className="text-(--grad-start)" size={24} />
            </div>
            <div>
              <h2 className="text-xl font-black tracking-tight text-transparent bg-clip-text bg-linear-to-r from-(--grad-start) to-(--grad-end)">
                Dashboard
              </h2>
              <p className="text-[10px] font-bold uppercase tracking-widest text-(--text-muted)">
                {role} Panel
              </p>
            </div>
          </div>
          {/* Close Button (Mobile Only) */}
          <button 
            onClick={() => setDrawerOpen(false)}
            className="lg:hidden p-2 text-(--text-muted) hover:text-(--text-main)"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation Links (Scrollable Area) */}
        <nav className="flex-1 flex flex-col space-y-1 p-4 overflow-y-auto custom-scrollbar">
          {allowedMenuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setDrawerOpen(false)}
              className={({ isActive }) => `
                group relative flex items-center px-4 py-3.5 rounded-xl text-sm font-bold transition-all duration-200
                ${
                  isActive
                    ? "bg-(--nav-active-bg) text-(--nav-active-text) shadow-lg shadow-(--nav-active-bg)/20 translate-x-1"
                    : "text-(--text-muted) hover:bg-(--nav-item-hover) hover:text-(--text-main)"
                }
              `}
            >
              {({ isActive }) => (
                <>
                  {/* Active Indicator Strip */}
                  <span className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-r-full bg-(--nav-active-text) transition-opacity duration-200 ${isActive ? 'opacity-30' : 'opacity-0'}`} />
                  
                  <span className="relative z-10 flex items-center gap-3">
                    {/* Dot Indicator */}
                    <div className={`w-2 h-2 rounded-full transition-colors ${isActive ? "bg-(--nav-active-text)" : "bg-(--text-muted)/30"}`} />
                    {item.label}
                  </span>
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* 
          MAIN CONTENT AREA
       */}
      <div className="flex-1 flex flex-col h-full overflow-hidden bg-(--bg-soft-accent)">
        
        {/* Mobile Header (Sticky) */}
        <header className="lg:hidden flex items-center justify-between p-4 bg-(--bg-page) border-b border-(--sidebar-border) sticky top-0 z-30 shadow-sm">
          <div className="flex items-center gap-2">
            <LayoutDashboard className="text-(--grad-start)" size={20} />
            <h1 className="text-lg font-black text-(--text-main)">
              Dashboard
            </h1>
          </div>
          <button
            className="p-2 rounded-lg bg-(--nav-item-hover) text-(--text-main) active:scale-95 transition-transform"
            onClick={() => setDrawerOpen(true)}
          >
            <SlidersHorizontal size={20} />
          </button>
        </header>

        {/* Scrollable Page Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8 custom-scrollbar scroll-smooth">
          <div className="max-w-7xl mx-auto w-full pb-10">
             <Outlet />
          </div>
        </main>

      </div>
    </div>
  );
};

export default DashboardLayout;
