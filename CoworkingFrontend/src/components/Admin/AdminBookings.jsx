import React from "react";

const AdminBookings = () => {
  const bookings = [
    { id: 1, user: "Priya", date: "2025-02-01", status: "Confirmed" },
    { id: 2, user: "Haris", date: "2025-02-02", status: "Pending" },
  ];

  return (
    <>
      <h1 className="mb-4 text-2xl font-bold">Bookings</h1>

      <table className="w-full bg-white rounded shadow">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-3">User</th>
            <th className="p-3">Date</th>
            <th className="p-3">Status</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((b) => (
            <tr key={b.id} className="text-center border-t">
              <td className="p-3">{b.user}</td>
              <td className="p-3">{b.date}</td>
              <td className="p-3">{b.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default AdminBookings;
