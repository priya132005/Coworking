import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useParams, useNavigate } from 'react-router-dom';
import SummaryApi from '../../Common/index.js';

const ResetPassword = () => {
  const { resetToken } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState({
    password: '',
    cnfPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!data.password || !data.cnfPassword) {
      toast.error("All fields are mandatory");
      return;
    }

    if (!data.password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/)) {
      toast.error("Password must be 8-20 chars with uppercase, lowercase, and number");
      return;
    }

    if (data.password !== data.cnfPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const { url, method } = SummaryApi.resetPassword(resetToken);
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password: data.password }),
      });

      const result = await response.json();

      if (result.success) {
        toast.success(result.message || "Password reset successful");
        navigate('/loginpriya');
      } else {
        toast.error(result.message || "Failed to reset password");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <section id="reset-password" className="container max-w-md p-4 mx-auto">
      <h1 className="mb-6 text-2xl font-bold text-center">Reset Password</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <label>New Password:</label>
        <input
          type="password"
          name="password"
          placeholder="Enter new password"
          value={data.password}
          onChange={handleChange}
          required
          className="p-2 border rounded bg-gray-50"
        />

        <label>Confirm Password:</label>
        <input
          type="password"
          name="cnfPassword"
          placeholder="Confirm new password"
          value={data.cnfPassword}
          onChange={handleChange}
          required
          className="p-2 border rounded bg-gray-50"
        />

        <button
          type="submit"
          className="py-2 text-white transition bg-pink-900 rounded hover:bg-pink-700"
        >
          Reset Password
        </button>
      </form>
    </section>
  );
};

export default ResetPassword;
