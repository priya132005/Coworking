import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import SummaryApi from "../../Common/index.js";

const statusColors = {
  pending: "bg-yellow-100 text-yellow-700",
  confirmed: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
  completed: "bg-blue-100 text-blue-700",
};

export default function MyBookings() {
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      const response = await fetch(SummaryApi.getMyBookings.url, {
        method: SummaryApi.getMyBookings.method,
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
    if (!user?._id) {
      navigate("/loginpriya");
      return;
    }
    fetchBookings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleCancel = async (id) => {
    if (!window.confirm("Cancel this booking?")) return;
    try {
      const { url, method } = SummaryApi.cancelBooking(id);
      const response = await fetch(url, { method, credentials: "include" });
      const data = await response.json();

      if (data.success) {
        toast.success("Booking cancelled");
        fetchBookings();
      } else {
        toast.error(data.message || "Failed to cancel booking");
      }
    } catch (err) {
      toast.error("Could not connect to the server");
    }
  };

  if (loading) {
    return <p className="py-20 text-center text-gray-500">Loading your bookings...</p>;
  }

  return (
    <section className="container max-w-3xl px-4 py-10 mx-auto">
      <h1 className="mb-6 text-2xl font-bold text-gray-800">My Bookings</h1>

      {bookings.length === 0 ? (
        <div className="py-10 text-center text-gray-500">
          You have no bookings yet.{" "}
          <Link to="/spaces" className="text-pink-700 hover:underline">
            Browse spaces
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="flex flex-col gap-2 p-4 bg-white border rounded-lg shadow-sm sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="font-semibold text-gray-800">{booking.space?.name}</p>
                <p className="text-sm text-gray-500">
                  {booking.date} at {booking.startTime} • {booking.hours}h • ₹
                  {booking.totalAmount}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span
                  className={`px-3 py-1 text-xs font-medium rounded-full ${
                    statusColors[booking.status] || "bg-gray-100 text-gray-700"
                  }`}
                >
                  {booking.status}
                </span>

                {booking.paymentStatus !== "paid" && booking.status !== "cancelled" && (
                  <Link
                    to={`/payment/${booking._id}`}
                    className="px-3 py-1 text-xs font-medium text-white bg-pink-700 rounded-full hover:bg-pink-800"
                  >
                    Pay Now
                  </Link>
                )}

                {booking.status !== "cancelled" && booking.status !== "completed" && (
                  <button
                    onClick={() => handleCancel(booking._id)}
                    className="px-3 py-1 text-xs font-medium text-gray-600 border rounded-full hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
