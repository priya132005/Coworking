import React from "react";
import { useParams, Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";

const PaymentSuccess = () => {
  const { bookingId } = useParams();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm p-6 text-center bg-white shadow-xl rounded-2xl">
        <CheckCircle size={48} className="mx-auto mb-4 text-green-600" />

        <h2 className="mb-2 text-2xl font-bold">
          Payment Successful
        </h2>

        <p className="mb-4 text-sm text-gray-600">
          Booking ID: <span className="font-semibold">{bookingId}</span>
        </p>

        <Link
          to="/"
          className="inline-block px-4 py-2 text-white bg-pink-600 rounded-lg hover:bg-pink-700"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default PaymentSuccess;
