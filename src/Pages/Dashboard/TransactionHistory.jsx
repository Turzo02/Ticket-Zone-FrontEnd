import React from "react";

const transactions = [
  { id: "pi_3PabcdeFgHiJklmnO12p", title: "Tokyo Shinkansen", amount: "$480.00", date: "Oct 19, 2024" },
  { id: "pi_1OxyzWAbCdEfGhIjK2L3", title: "Venice Gondola Tour", amount: "$85.50", date: "Sep 05, 2024" },
  { id: "pi_9MabCDeFgHiJkLmNoP4q", title: "Rome Colosseum Entry", amount: "$150.00", date: "Aug 21, 2024" },
];

const TransactionHistory = () => {
  return (
    <section className="pt-8">
      <h3 className="text-xl font-bold font-display">Transaction History</h3>
      <div className="mt-4 rounded-xl border  shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
            <thead className="">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider  ">Transaction ID</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider  ">Ticket Title</th>
                <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wider ">Amount</th>
                <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wider ">Payment Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200  dark:divide-gray-800 dark:bg-card-dark">
              {transactions.map(tx => (
                <tr key={tx.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono">{tx.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold  ">{tx.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">{tx.amount}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm ">{tx.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default TransactionHistory;
