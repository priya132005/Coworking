import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import SummaryApi from '../../Common/index.js';

const ForgetPassword = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Email is required");
      return;
    }

    if (!email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
      toast.error("Invalid email id");
      return;
    }

    try {
      const response = await fetch(SummaryApi.forgotPassword.url, {
        method: SummaryApi.forgotPassword.method,
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();

      if (result.success) {
        toast.success(result.message || "Verification link sent to your email");
        setEmail("");
      } else {
        toast.error(result.message || "Failed to send verification link");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <section id='forget-password' className="container max-w-md p-4 mx-auto">
      <h1 className="mb-6 text-2xl font-bold text-center">Forget Password</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <label>Email:</label>
        <input
          type="email"
          placeholder="Enter your registered email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="p-2 border rounded bg-gray-50"
        />
        <button
          type="submit"
          className="py-2 text-white transition bg-pink-900 rounded hover:bg-pink-700"
        >
          Get Verification Link
        </button>
      </form>
      <p className="mt-4 text-center">
        Remembered your password?{" "}
        <Link to="/loginpriya" className="text-pink-600 hover:text-pink-900 hover:underline">
          Login
        </Link>
      </p>
    </section>
  );
};

export default ForgetPassword;
