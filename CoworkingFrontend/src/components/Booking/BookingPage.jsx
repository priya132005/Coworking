import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const BookingPage = () => {
  const { spaceId } = useParams();
  const navigate = useNavigate();

  const [booking, setBooking] = useState({
    date: "",
    hours: "",
  });

  const handleChange = (e) => {
    setBooking({ ...booking, [e.target.name]: e.target.value });
  };

  const handleBooking = (e) => {
    e.preventDefault();

    if (!booking.date || !booking.hours) {
      toast.error("Please fill all fields");
      return;
    }

    const fakeBookingId = `BOOK-${Date.now()}`;
    toast.success("Booking confirmed!");
    navigate(`/payment/${fakeBookingId}`);
  };

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="w-full max-w-md p-6 bg-white shadow-xl rounded-2xl">
        <h2 className="mb-2 text-2xl font-bold text-center">
          Book Workspace
        </h2>

        <p className="mb-6 text-sm text-center text-gray-500">
          Space ID: <span className="font-semibold">{spaceId}</span>
        </p>

        <form onSubmit={handleBooking} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium">
              Select Date
            </label>
            <input
              type="date"
              name="date"
              value={booking.date}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-pink-500"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">
              Number of Hours
            </label>
            <input
              type="number"
              name="hours"
              value={booking.hours}
              onChange={handleChange}
              placeholder="e.g. 3"
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-pink-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 text-white transition bg-pink-600 rounded-lg hover:bg-pink-700"
          >
            Proceed to Payment →
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingPage;
