import React from "react";

const bookedTickets = [
  {
    title: "Paris Flight",
    from: "London",
    to: "Paris",
    quantity: 1,
    price: "$250.00",
    departure: "Oct 28, 2024, 10:30 AM",
    status: "Accepted",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBrW0os1nfiIGj_uqvXfXxMQ95e34c7i9jbm5cgdHq4vrZmi3-uzjh5-tYqf95DcD7Z0-SwE350ZM2OsSiW00F85RvnrEZHRLKNjRlPtsJvYXfz-C2vIGoiwXuvl4MLiQeExI-1uxYzOQAjCtlk_KIETPo5wUGHcBrCZlKlI0a1DfNRXRxZ5JNLr8a5DKl6GUCzc9YCeKe-WxuVYp31j4fUAn9R63scueJYXDdfkQmXm7ko_ddLLA4bEV0f_GYqfWpr6RKCZ1lAqOQ",
  },
  {
    title: "Tokyo Shinkansen",
    from: "Tokyo",
    to: "Kyoto",
    quantity: 2,
    price: "$480.00",
    departure: "Nov 05, 2024, 08:00 AM",
    status: "Paid",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDmF15sfB8tvao0qbEeEkMzDGq6AUG7NZRaaeqeXg7g_tnbQOa7ia3ouL-E6jAQD9JkSflOSIgQovJyT2IKoAK_zdKqRVvk2u_pvw1vGjDNJhcX8LeoFg3h1KHczm6mT7eYjqvZU-AtXFLCasI_37cDOpD4zAxn-hUsILG-_FjnaAqDVfP3huEEmO4EpVFlmHkfmloBL0xDjiUL4vo-Ksm8WlftjjeYNHE9_Htb73IQaF9Cn7xi6P3wpFA0wV2ofpH3bSY8Ri-FQf4",
  },
  {
    title: "NY Express Train",
    from: "New York",
    to: "Boston",
    quantity: 1,
    price: "$120.00",
    departure: "Nov 15, 2024, 09:45 AM",
    status: "Rejected",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBDPqOEo7Pfsf5BSWfRBJkote0XMQLal8048e8jBxw-oG_oN-_igENLoc55U7VMi-IteVFLKjsJyXui_cwRJ3CZ6V9QmHZSxsjdOsojjAeycly3YeSImDgL71yKyP2MTOYVt-O9svQB9jU5kBWoS1pjSYZdvHHpBmVtDZpTDiJ7VoEudz5Se2QtIJ3lhj5wgDq4NcNmNTQsZTX3DHKbh3DXNoi0ieDe55DbE3wEMQQ35LQnd5KPHKiZtHFXGQl4AfVB8mPoNZvcSK_EJhzS2Ls",
  },
];

const MyBookedTickets = () => {
  return (
    <section className="space-y-6">
      <h3 className="text-xl font-bold text-slate-900 dark:text-white font-display">My Booked Tickets</h3>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {bookedTickets.map((ticket, idx) => (
          <div
            key={idx}
            className="flex flex-col rounded-xl border border-gray-200 shadow-sm dark:border-gray-800 dark:bg-card-dark overflow-hidden"
          >
            <img className="h-40 w-full object-cover" src={ticket.image} alt={ticket.title} />
            <div className="flex flex-1 flex-col p-4">
              <h4 className="text-lg font-bold text-slate-900 dark:text-white">{ticket.title}</h4>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{ticket.from} → {ticket.to}</p>
              <div className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-slate-500 dark:text-slate-400">Quantity:</span><span className="font-semibold">{ticket.quantity}</span></div>
                <div className="flex justify-between"><span className="text-slate-500 dark:text-slate-400">Total Price:</span><span className="font-semibold">{ticket.price}</span></div>
                <div className="flex justify-between"><span className="text-slate-500 dark:text-slate-400">Departure:</span><span className="font-semibold">{ticket.departure}</span></div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 dark:text-slate-400">Status:</span>
                  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                    ticket.status === "Accepted" ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" :
                    ticket.status === "Paid" ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" :
                    "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                  }`}>{ticket.status}</span>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-center gap-2 rounded-lg bg-amber-100/60 p-2 text-center text-sm font-semibold text-amber-800 dark:bg-amber-900/30 dark:text-amber-400">
                <span className="material-symbols-outlined text-base">timer</span>
                <span>Departs in 10d 14h 22m</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MyBookedTickets;
