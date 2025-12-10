import React from "react";
const user = {
  id: 2,
  name: "Bob Smith",
  email: "bob.s@example.com",
  role: "Vendor",
  status: "Active",
};
const ManageUsers = () => {
  return (
    <div>
      <div className="p-4 sm:p-8 max-w-7xl mx-auto min-h-screen bg-gray-50">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8 sm:text-4xl">
          User Management (Demo View)
        </h1>

        {/* ---------------------------------------------------------------------- */}
        {/* --- Desktop/Tablet View (Table) - Visible on 'sm' screens and up --- */}
        {/* ---------------------------------------------------------------------- */}
        <div className="hidden sm:block">
          <div className="shadow-xl rounded-xl border border-gray-300 bg-white overflow-hidden">
            <table className="w-full table-auto text-left">
              <thead className="bg-gray-100 text-gray-700 uppercase text-sm">
                <tr>
                  <th className="p-4">Name</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Role</th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>
              {/* Table Body */}
              <tbody>
                <tr className="border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition">
                  <td className="p-4 font-medium text-gray-700">{user.name}</td>
                  <td className="p-4 text-gray-600">{user.email}</td>
                  <td className="p-4">
                    {/* Role Badge Demo */}
                    <span className="px-3 py-1 text-xs font-semibold rounded-full bg-teal-100 text-teal-700 border border-teal-300">
                      {user.role.toUpperCase()}
                    </span>
                  </td>

                  <td className="p-4">
                    <div className="flex gap-3">
                      {/* Make Admin */}
                      <button
                        disabled={user.role === "Admin"}
                        className="flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition bg-purple-500 text-white hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Admin
                      </button>

                      {/* Make Vendor */}
                      <button
                        disabled={user.role === "Admin"}
                        className="flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition bg-teal-500 text-white hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Vendor
                      </button>

                      {/* Mark as Fraud (Visible for Vendor) */}
                      {user.role === "Vendor" && (
                        <button
                          disabled={user.status === "Fraud"}
                          className="flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition bg-red-500 text-white hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Mark Fraud
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
                {/* You would map over the full data array here */}
              </tbody>
            </table>
          </div>
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* --- Mobile View (Cards) - Hidden on 'sm' screens and up --- */}
        {/* ---------------------------------------------------------------- */}
        <div className="sm:hidden">
          {/* User Card Demo */}
          <div className="bg-white p-4 shadow-md rounded-xl border border-gray-200 mb-4 transition-all">
            <div className="flex justify-between items-start mb-3 border-b pb-2">
              <div>
                <p className="text-lg font-bold text-gray-800">{user.name}</p>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
              {/* Role Badge Demo */}
              <span className="px-3 py-1 text-xs font-semibold rounded-full bg-teal-100 text-teal-700 border border-teal-300">
                {user.role.toUpperCase()}
              </span>
            </div>

            <div className="space-y-3">
              {/* Role Change Actions */}
              <div className="flex gap-2">
                {/* Make Admin */}
                <button
                  disabled={user.role === "Admin"}
                  className="flex items-center justify-center w-full gap-1 px-3 py-1.5 rounded-lg text-sm font-medium transition bg-purple-500 text-white hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Make Admin
                </button>
                {/* Make Vendor */}
                <button
                  disabled={user.role === "Admin"}
                  className="flex items-center justify-center w-full gap-1 px-3 py-1.5 rounded-lg text-sm font-medium transition bg-teal-500 text-white hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Make Vendor
                </button>
              </div>

              {/* Mark as Fraud Action */}
              {user.role === "Vendor" && user.status !== "Fraud" && (
                <button className="bg-red-500 text-white w-full flex items-center justify-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium transition hover:opacity-90">
                  Mark as Fraud
                </button>
              )}
            </div>
          </div>
          {/* You would map over the full data array here */}
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;
