import React from "react";

const ManageTickets = () => {
  return (
    <div>
      <h1>ManageTickets</h1>
      {/* <!-- Tickets Management --> */}
      <section className="space-y-4" id="tickets">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-text-main-light dark:text-text-main-dark">
            Ticket Approvals
          </h2>
          <button className="text-sm font-medium text-primary hover:text-primary-dark">
            View All
          </button>
        </div>
        <div className="overflow-hidden rounded-xl border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm whitespace-nowrap">
              <thead className="uppercase tracking-wider border-b border-border-light dark:border-border-dark bg-gray-50 dark:bg-gray-800/50">
                <tr>
                  <th className="px-6 py-4 font-medium text-text-sec-light dark:text-text-sec-dark">
                    Ticket ID
                  </th>
                  <th className="px-6 py-4 font-medium text-text-sec-light dark:text-text-sec-dark">
                    Vendor
                  </th>
                  <th className="px-6 py-4 font-medium text-text-sec-light dark:text-text-sec-dark">
                    Route
                  </th>
                  <th className="px-6 py-4 font-medium text-text-sec-light dark:text-text-sec-dark">
                    Price
                  </th>
                  <th className="px-6 py-4 font-medium text-text-sec-light dark:text-text-sec-dark">
                    Status
                  </th>
                  <th className="px-6 py-4 font-medium text-text-sec-light dark:text-text-sec-dark text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-light dark:divide-border-dark">
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                  <td className="px-6 py-4 text-text-sec-light dark:text-text-sec-dark font-mono">
                    #TK-9921
                  </td>
                  <td className="px-6 py-4 font-medium">Global Travels Inc.</td>
                  <td className="px-6 py-4 text-text-sec-light dark:text-text-sec-dark">
                    NYC{" "}
                    <span className="material-symbols-outlined align-middle text-[16px] mx-1">
                      arrow_forward
                    </span>{" "}
                    LON
                  </td>
                  <td className="px-6 py-4 font-bold">$450</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400">
                      <span className="size-1.5 rounded-full bg-amber-500"></span>{" "}
                      Pending
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        className="p-1.5 rounded-lg text-green-600 hover:bg-green-100 dark:text-green-400 dark:hover:bg-green-900/30 transition-colors"
                        title="Approve"
                      >
                        <span className="material-symbols-outlined">check</span>
                      </button>
                      <button
                        className="p-1.5 rounded-lg text-red-600 hover:bg-red-100 dark:text-red-400 dark:hover:bg-red-900/30 transition-colors"
                        title="Reject"
                      >
                        <span className="material-symbols-outlined">close</span>
                      </button>
                    </div>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                  <td className="px-6 py-4 text-text-sec-light dark:text-text-sec-dark font-mono">
                    #TK-9922
                  </td>
                  <td className="px-6 py-4 font-medium">SkyHigh Voyages</td>
                  <td className="px-6 py-4 text-text-sec-light dark:text-text-sec-dark">
                    TOK{" "}
                    <span className="material-symbols-outlined align-middle text-[16px] mx-1">
                      arrow_forward
                    </span>{" "}
                    SFO
                  </td>
                  <td className="px-6 py-4 font-bold">$820</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400">
                      <span className="size-1.5 rounded-full bg-amber-500"></span>{" "}
                      Pending
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        className="p-1.5 rounded-lg text-green-600 hover:bg-green-100 dark:text-green-400 dark:hover:bg-green-900/30 transition-colors"
                        title="Approve"
                      >
                        <span className="material-symbols-outlined">check</span>
                      </button>
                      <button
                        className="p-1.5 rounded-lg text-red-600 hover:bg-red-100 dark:text-red-400 dark:hover:bg-red-900/30 transition-colors"
                        title="Reject"
                      >
                        <span className="material-symbols-outlined">close</span>
                      </button>
                    </div>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                  <td className="px-6 py-4 text-text-sec-light dark:text-text-sec-dark font-mono">
                    #TK-9924
                  </td>
                  <td className="px-6 py-4 font-medium">EuroRail Ways</td>
                  <td className="px-6 py-4 text-text-sec-light dark:text-text-sec-dark">
                    LON{" "}
                    <span className="material-symbols-outlined align-middle text-[16px] mx-1">
                      arrow_forward
                    </span>{" "}
                    DUB
                  </td>
                  <td className="px-6 py-4 font-bold">$85</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">
                      <span className="size-1.5 rounded-full bg-red-500"></span>{" "}
                      Flagged
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        className="p-1.5 rounded-lg text-green-600 hover:bg-green-100 dark:text-green-400 dark:hover:bg-green-900/30 transition-colors"
                        title="Approve"
                      >
                        <span className="material-symbols-outlined">check</span>
                      </button>
                      <button
                        className="p-1.5 rounded-lg text-red-600 hover:bg-red-100 dark:text-red-400 dark:hover:bg-red-900/30 transition-colors"
                        title="Reject"
                      >
                        <span className="material-symbols-outlined">close</span>
                      </button>
                    </div>
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

export default ManageTickets;
