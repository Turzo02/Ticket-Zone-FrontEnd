import { SlidersHorizontal } from "lucide-react";
import React, { useState } from "react";
import { Link, NavLink, Outlet } from "react-router";
const menuItems = [
  // all
  { label: "User Profile", path: "/dashboard/user-profile", roles: ["user","vendor","admin"] },

  // user
  { label: "My Booked Tickets", path: "/dashboard/my-booked-tickets", roles: ["user"] },
  { label: "Transaction History", path: "/dashboard/transaction-history", roles: ["user"] },

  // vendor
  { label: "Add Tickets", path: "/dashboard/add-tickets", roles: ["vendor"] },
  { label: "My Added Tickets", path: "/dashboard/my-added-tickets", roles: ["vendor"] },
  { label: "Requested Tickets", path: "/dashboard/requested-tickets", roles: ["vendor"] },
  { label: "Revenue Overview", path: "/dashboard/revenue-overview", roles: ["vendor"] },

  // admin
  { label: "Manage Users", path: "/dashboard/manage-users", roles: ["admin"] },
  { label: "Manage Tickets", path: "/dashboard/manage-tickets", roles: ["admin"] },
  { label: "Advertisement", path: "/dashboard/advertisement-tickets", roles: ["admin"] },
];


const DashboardLayout = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const allowedMenuItems = menuItems.filter((item) => item.roles.includes("admin"));

  return (
    <div className="flex min-h-screen bg-base-100">
      {/* Sidebar */}
      <aside
        className={`fixed lg:relative bg-base-100 top-0 left-0 z-30 h-full w-64 transform 
        border-r border-base-300 transition-transform duration-300 ease-in-out 
        ${
          drawerOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex flex-col h-full p-4">
          <h2 className="text-2xl font-bold text-base-content mb-6">
            Dashboard
          </h2>

          <nav className="flex flex-col space-y-2">
            {menuItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setDrawerOpen(false)}
                className={({ isActive }) => 
                  `px-3 py-2 rounded-lg font-medium transition duration-150 ease-in-out
                  ${
                    isActive
                      ? "bg-primary text-primary-content shadow-md shadow-primary/30" // Active state
                      : "text-base-content hover:bg-base-300" // Inactive state
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {drawerOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setDrawerOpen(false)}
        ></div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen bg-base-100">
        {/* Mobile menu button & Header */}
        <header className="flex items-center justify-between p-4 bg-base-100 border-b border-base-300 lg:hidden">
          <h1 className="text-xl font-bold text-base-content">
            Dashboard
          </h1>
          <button
            className="btn btn-sm btn-ghost bg-base-200 text-base-content"
            onClick={() => setDrawerOpen(!drawerOpen)}
          >
            <SlidersHorizontal />
          </button>
        </header>

        <main className="flex-1 p-4 bg-base-100">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
