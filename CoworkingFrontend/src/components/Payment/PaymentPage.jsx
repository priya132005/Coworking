import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";

const PaymentPage = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();

  const handlePayment = () => {
    navigate(`/payment-success/${bookingId}`);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm p-6 bg-white shadow-xl rounded-2xl">
        <h2 className="mb-4 text-2xl font-bold text-center">Payment</h2>

        <div className="p-4 mb-6 rounded-lg bg-gray-50">
          <p className="text-sm text-gray-600">Booking ID</p>
          <p className="font-semibold">{bookingId}</p>

          <p className="mt-3 text-sm text-gray-600">Total Amount</p>
          <p className="text-xl font-bold">₹500</p>
        </div>

        <button
          onClick={handlePayment}
          className="w-full py-2 text-white transition bg-green-600 rounded-lg hover:bg-green-700"
        >
          Pay Now
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;
