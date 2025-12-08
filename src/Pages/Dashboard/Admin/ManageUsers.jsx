import React from "react";

const ManageUsers = () => {
  return (
    <div>
      <h1>Manage Users</h1>
      <section className="space-y-4" id="users">
        <h2 className="text-xl font-bold text-text-main-light dark:text-text-main-dark">
          User Management
        </h2>
        <div className="overflow-hidden rounded-xl border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm whitespace-nowrap">
              <thead className="uppercase tracking-wider border-b border-border-light dark:border-border-dark bg-gray-50 dark:bg-gray-800/50">
                <tr>
                  <th className="px-6 py-4 font-medium text-text-sec-light dark:text-text-sec-dark">
                    User
                  </th>
                  <th className="px-6 py-4 font-medium text-text-sec-light dark:text-text-sec-dark">
                    Email
                  </th>
                  <th className="px-6 py-4 font-medium text-text-sec-light dark:text-text-sec-dark">
                    Role
                  </th>
                  <th className="px-6 py-4 font-medium text-text-sec-light dark:text-text-sec-dark">
                    Risk Level
                  </th>
                  <th className="px-6 py-4 font-medium text-text-sec-light dark:text-text-sec-dark text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-light dark:divide-border-dark">
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                  <td className="px-6 py-4 flex items-center gap-3">
                    <div className="size-8 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 flex items-center justify-center font-bold text-xs">
                      JS
                    </div>
                    <span className="font-medium">John Smith</span>
                  </td>
                  <td className="px-6 py-4 text-text-sec-light dark:text-text-sec-dark">
                    john.smith@example.com
                  </td>
                  <td className="px-6 py-4">
                    <select className="form-select text-sm py-1 px-2 rounded border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark focus:ring-primary">
                      <option>User</option>
                      <option>Vendor</option>
                      <option>Admin</option>
                    </select>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-green-600 dark:text-green-400 font-medium">
                      Low
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-red-500 hover:text-red-700 text-xs font-bold uppercase tracking-wide">
                      Mark Fraud
                    </button>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                  <td className="px-6 py-4 flex items-center gap-3">
                    <div className="size-8 rounded-full bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300 flex items-center justify-center font-bold text-xs">
                      AT
                    </div>
                    <span className="font-medium">Air Travel Ltd.</span>
                  </td>
                  <td className="px-6 py-4 text-text-sec-light dark:text-text-sec-dark">
                    contact@airtravel.com
                  </td>
                  <td className="px-6 py-4">
                    <select
                      className="form-select text-sm py-1 px-2 rounded border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark focus:ring-primary"
                      selected="Vendor"
                    >
                      <option>User</option>
                      <option>Vendor</option>
                      <option>Admin</option>
                    </select>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-amber-500 dark:text-amber-400 font-medium">
                      Medium
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-red-500 hover:text-red-700 text-xs font-bold uppercase tracking-wide">
                      Mark Fraud
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ManageUsers;
