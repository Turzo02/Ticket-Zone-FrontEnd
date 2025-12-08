import { SlidersHorizontal } from "lucide-react";
import React, { useState } from "react";
import { Link, Outlet } from "react-router";
const menuItems = [
  { label: "User Profile", path: "/dashboard/user-profile" },
  { label: "My Booked Tickets", path: "/dashboard/my-booked-tickets" },
  { label: "Transaction History", path: "/dashboard/transaction-history" },
  { label: "Add Tickets", path: "/dashboard/add-tickets" },
  { label: "My Added Tickets", path: "/dashboard/my-added-tickets" },
  { label: "Requested Tickets", path: "/dashboard/requested-tickets" },
  { label: "Revenue Overview", path: "/dashboard/revenue-overview" },
  { label: "Manage Users", path: "/dashboard/manage-users" },
  { label: "Manage Tickets", path: "/dashboard/manage-tickets" },
  { label: "Advertisement", path: "/dashboard/advertisement-tickets" },
];

const DashboardLayout = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="flex min-h-screen ">
      {/* Sidebar */}
      <aside
        className={`fixed lg:relative bg-base-100 top-0 left-0 z-30 h-full w-64 transform dark:bg-card-dark border-r border-gray-200 dark:border-gray-800 transition-transform duration-300 ease-in-out ${
          drawerOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex flex-col h-full p-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
            Dashboard
          </h2>

          <nav className="flex flex-col space-y-2">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="px-3 py-2 rounded-lg"
                onClick={() => setDrawerOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {drawerOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-20 lg:hidden"
          onClick={() => setDrawerOpen(false)}
        ></div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Mobile menu button */}
        <header className="flex items-center justify-between p-4 dark:bg-card-dark border-b border-gray-200 dark:border-gray-800 lg:hidden">
          <h1 className="text-xl font-bold text-slate-900 dark:text-white">
            Dashboard
          </h1>
          <button
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-slate-700 dark:text-slate-200"
            onClick={() => setDrawerOpen(!drawerOpen)}
          >
            <SlidersHorizontal />
          </button>
        </header>

        <main className="flex-1 p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
