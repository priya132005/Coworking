import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import SummaryApi from "../../Common/index.js";

const BookingPage = () => {
  const { spaceId } = useParams();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);

  const [space, setSpace] = useState(null);
  const [loadingSpace, setLoadingSpace] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [booking, setBooking] = useState({
    date: "",
    startTime: "",
    hours: 1,
  });

  useEffect(() => {
    const fetchSpace = async () => {
      try {
        const { url, method } = SummaryApi.getSpaceById(spaceId);
        const response = await fetch(url, { method });
        const data = await response.json();

        if (data.success) {
          setSpace(data.data);
        } else {
          toast.error(data.message || "Space not found");
        }
      } catch (err) {
        toast.error("Could not connect to the server");
      } finally {
        setLoadingSpace(false);
      }
    };

    fetchSpace();
  }, [spaceId]);

  const handleChange = (e) => {
    setBooking({ ...booking, [e.target.name]: e.target.value });
  };

  const handleBooking = async (e) => {
    e.preventDefault();

    if (!user?._id) {
      toast.info("Please log in to book a workspace");
      navigate("/loginpriya");
      return;
    }

    if (!booking.date || !booking.startTime || !booking.hours) {
      toast.error("Please fill all fields");
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch(SummaryApi.createBooking.url, {
        method: SummaryApi.createBooking.method,
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          spaceId,
          date: booking.date,
          startTime: booking.startTime,
          hours: Number(booking.hours),
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success(data.message || "Booking created! Proceed to payment.");
        navigate(`/payment/${data.data._id}`);
      } else {
        toast.error(data.message || "Failed to create booking");
      }
    } catch (err) {
      toast.error("Could not connect to the server");
    } finally {
      setSubmitting(false);
    }
  };

  if (loadingSpace) {
    return <p className="py-20 text-center text-gray-500">Loading space details...</p>;
  }

  if (!space) {
    return (
      <div className="py-20 text-center">
        <p className="mb-4 text-gray-500">This space could not be found.</p>
        <Link to="/spaces" className="text-pink-700 hover:underline">
          Browse all spaces
        </Link>
      </div>
    );
  }

  const estimatedTotal = (Number(booking.hours || 0) * space.pricePerHour).toFixed(2);

  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-10">
      <div className="w-full max-w-md p-6 bg-white shadow-xl rounded-2xl">
        <h2 className="mb-1 text-2xl font-bold text-center">Book Workspace</h2>
        <p className="mb-6 text-sm text-center text-gray-500">
          {space.name} • {space.city} • ₹{space.pricePerHour}/hr
        </p>

        <form onSubmit={handleBooking} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium">Select Date</label>
            <input
              type="date"
              name="date"
              value={booking.date}
              min={new Date().toISOString().split("T")[0]}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-pink-500"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Start Time</label>
            <input
              type="time"
              name="startTime"
              value={booking.startTime}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-pink-500"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Number of Hours</label>
            <input
              type="number"
              name="hours"
              min={1}
              max={12}
              value={booking.hours}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-pink-500"
            />
          </div>

          <div className="flex items-center justify-between p-3 text-sm bg-pink-50 rounded-lg">
            <span>Estimated Total</span>
            <span className="text-lg font-bold text-pink-700">₹{estimatedTotal}</span>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-2 text-white transition bg-pink-600 rounded-lg hover:bg-pink-700 disabled:opacity-60"
          >
            {submitting ? "Booking..." : "Proceed to Payment →"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingPage;
