import React, { useState } from "react";
import { FaEnvelope } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import SummaryApi from "../../Common";

function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error("Email cannot be empty");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(SummaryApi.forgotPassword.url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = await res.json();

      if (!data.success) throw new Error(data.message);
      toast.success("Reset link sent to email");
    } catch (err) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md p-6 mx-auto mt-10 bg-white rounded shadow">
      <div className="flex justify-center mb-4 text-3xl text-pink-700">
        <FaEnvelope />
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 bg-pink-200 outline-none"
        />

        <button
          type="submit"
          disabled={loading}
          className={`w-full p-2 text-white rounded ${
            loading ? "bg-pink-400" : "bg-pink-900 hover:bg-pink-800"
          }`}
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </button>
      </form>

      <p className="mt-4 text-center">
        Back to{" "}
        <Link to="/loginpriya" className="font-semibold text-pink-700">
          Login
        </Link>
      </p>
    </div>
  );
}

export default ForgetPassword;
