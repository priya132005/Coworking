import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { toast } from "react-toastify";
import SummaryApi from "../../Common/index.js";

const PaymentSuccess = () => {
  const { bookingId } = useParams();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const { url, method } = SummaryApi.getBookingById(bookingId);
        const response = await fetch(url, { method, credentials: "include" });
        const data = await response.json();

        if (data.success) {
          setBooking(data.data);
        } else {
          toast.error(data.message || "Booking not found");
        }
      } catch (err) {
        toast.error("Could not connect to the server");
      } finally {
        setLoading(false);
      }
    };

    fetchBooking();
  }, [bookingId]);

  if (loading) {
    return <p className="py-20 text-center text-gray-500">Loading receipt...</p>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-10">
      <div className="w-full max-w-md p-8 text-center bg-white shadow-xl rounded-2xl">
        <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 text-3xl text-green-600 bg-green-100 rounded-full">
          ✓
        </div>
        <h2 className="mb-2 text-2xl font-bold">Payment Successful!</h2>
        <p className="mb-6 text-gray-500">Your booking has been confirmed.</p>

        {booking && (
          <div className="p-4 mb-6 space-y-2 text-sm text-left bg-gray-50 rounded-lg">
            <div className="flex justify-between">
              <span className="text-gray-500">Space</span>
              <span className="font-medium">{booking.space?.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Date</span>
              <span className="font-medium">
                {booking.date} at {booking.startTime}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Duration</span>
              <span className="font-medium">{booking.hours} hour(s)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Payment ID</span>
              <span className="font-medium">{booking.paymentId}</span>
            </div>
            <div className="flex justify-between pt-2 border-t">
              <span className="text-gray-500">Amount Paid</span>
              <span className="font-bold text-pink-700">₹{booking.totalAmount}</span>
            </div>
          </div>
        )}

        <div className="flex gap-3">
          <Link
            to="/my-bookings"
            className="flex-1 py-2 text-sm font-medium text-pink-700 border border-pink-700 rounded-lg hover:bg-pink-50"
          >
            My Bookings
          </Link>
          <Link
            to="/"
            className="flex-1 py-2 text-sm font-medium text-white bg-pink-700 rounded-lg hover:bg-pink-800"
          >
            Back Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
