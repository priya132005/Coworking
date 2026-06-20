import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import SummaryApi from "../../Common/index.js";

const statusColors = {
  pending: "bg-yellow-100 text-yellow-700",
  confirmed: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
  completed: "bg-blue-100 text-blue-700",
};

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      const response = await fetch(SummaryApi.getAllBookings.url, {
        method: SummaryApi.getAllBookings.method,
        credentials: "include",
      });
      const data = await response.json();

      if (data.success) {
        setBookings(data.data);
      } else {
        toast.error(data.message || "Failed to load bookings");
      }
    } catch (err) {
      toast.error("Could not connect to the server");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleStatusChange = async (id, status) => {
    try {
      const { url, method } = SummaryApi.updateBookingStatus(id);
      const response = await fetch(url, {
        method,
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      const data = await response.json();

      if (data.success) {
        toast.success("Booking status updated");
        fetchBookings();
      } else {
        toast.error(data.message || "Failed to update status");
      }
    } catch (err) {
      toast.error("Could not connect to the server");
    }
  };

  if (loading) {
    return <p className="text-gray-500">Loading bookings...</p>;
  }

  return (
    <>
      <h1 className="mb-4 text-2xl font-bold">Bookings</h1>

      <div className="overflow-x-auto bg-white shadow rounded-xl">
        <table className="w-full text-sm text-left">
          <thead className="text-gray-500 bg-gray-50">
            <tr>
              <th className="p-3">User</th>
              <th className="p-3">Space</th>
              <th className="p-3">Date</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Payment</th>
              <th className="p-3">Status</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-4 text-center text-gray-400">
                  No bookings yet
                </td>
              </tr>
            ) : (
              bookings.map((b) => (
                <tr key={b._id} className="border-t">
                  <td className="p-3">
                    {b.user?.name}
                    <br />
                    <span className="text-xs text-gray-400">{b.user?.email}</span>
                  </td>
                  <td className="p-3">{b.space?.name}</td>
                  <td className="p-3">
                    {b.date} {b.startTime}
                  </td>
                  <td className="p-3">₹{b.totalAmount}</td>
                  <td className="p-3 capitalize">{b.paymentStatus}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                        statusColors[b.status] || "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {b.status}
                    </span>
                  </td>
                  <td className="p-3">
                    <select
                      value={b.status}
                      onChange={(e) => handleStatusChange(b._id, e.target.value)}
                      className="p-1 text-sm border rounded"
                    >
                      <option value="pending">pending</option>
                      <option value="confirmed">confirmed</option>
                      <option value="cancelled">cancelled</option>
                      <option value="completed">completed</option>
                    </select>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AdminBookings;
