import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import SummaryApi from "../../Common/index.js";

const PaymentPage = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();

  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paying, setPaying] = useState(false);

  const [card, setCard] = useState({
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

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

  const handleChange = (e) => {
    setCard({ ...card, [e.target.name]: e.target.value });
  };

  const handlePay = async (e) => {
    e.preventDefault();

    if (!card.cardName || !card.cardNumber || !card.expiry || !card.cvv) {
      toast.error("Please fill in all payment details");
      return;
    }

    setPaying(true);
    try {
      const { url, method } = SummaryApi.payForBooking(bookingId);
      const response = await fetch(url, {
        method,
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cardName: card.cardName,
          cardNumber: card.cardNumber,
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success(data.message || "Payment successful!");
        navigate(`/payment-success/${bookingId}`);
      } else {
        toast.error(data.message || "Payment failed");
      }
    } catch (err) {
      toast.error("Could not connect to the server");
    } finally {
      setPaying(false);
    }
  };

  if (loading) {
    return <p className="py-20 text-center text-gray-500">Loading booking...</p>;
  }

  if (!booking) {
    return (
      <div className="py-20 text-center">
        <p className="mb-4 text-gray-500">This booking could not be found.</p>
        <Link to="/spaces" className="text-pink-700 hover:underline">
          Browse all spaces
        </Link>
      </div>
    );
  }

  if (booking.paymentStatus === "paid") {
    return (
      <div className="py-20 text-center">
        <p className="mb-4 text-gray-600">This booking has already been paid for.</p>
        <Link
          to={`/payment-success/${bookingId}`}
          className="text-pink-700 hover:underline"
        >
          View receipt
        </Link>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-10">
      <div className="w-full max-w-md p-6 bg-white shadow-xl rounded-2xl">
        <h2 className="mb-1 text-2xl font-bold text-center">Complete Payment</h2>
        <p className="mb-4 text-sm text-center text-gray-500">
          {booking.space?.name} • {booking.date} • {booking.startTime} • {booking.hours}h
        </p>

        <div className="flex items-center justify-between p-3 mb-6 text-sm bg-pink-50 rounded-lg">
          <span>Amount Due</span>
          <span className="text-xl font-bold text-pink-700">₹{booking.totalAmount}</span>
        </div>

        <form onSubmit={handlePay} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium">Cardholder Name</label>
            <input
              type="text"
              name="cardName"
              value={card.cardName}
              onChange={handleChange}
              placeholder="John Doe"
              required
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-pink-500"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Card Number</label>
            <input
              type="text"
              name="cardNumber"
              value={card.cardNumber}
              onChange={handleChange}
              placeholder="4242 4242 4242 4242"
              maxLength={19}
              required
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-pink-500"
            />
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block mb-1 text-sm font-medium">Expiry</label>
              <input
                type="text"
                name="expiry"
                value={card.expiry}
                onChange={handleChange}
                placeholder="MM/YY"
                required
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-pink-500"
              />
            </div>
            <div className="flex-1">
              <label className="block mb-1 text-sm font-medium">CVV</label>
              <input
                type="text"
                name="cvv"
                value={card.cvv}
                onChange={handleChange}
                placeholder="123"
                maxLength={4}
                required
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-pink-500"
              />
            </div>
          </div>

          <p className="text-xs text-gray-400">
            This is a demo checkout — no real card is charged.
          </p>

          <button
            type="submit"
            disabled={paying}
            className="w-full py-2 text-white transition bg-pink-600 rounded-lg hover:bg-pink-700 disabled:opacity-60"
          >
            {paying ? "Processing..." : `Pay ₹${booking.totalAmount}`}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentPage;
