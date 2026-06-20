import React, { useState } from "react";
import { FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import SummaryApi from "../../Common";

function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password.trim()) {
      toast.error("Password cannot be empty");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${SummaryApi.resetPassword.url}/${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: password.trim() }),
      });

      const data = await res.json();

      if (!data.success) throw new Error(data.message);

      toast.success("Password reset successful");
      navigate("/loginpriya");
    } catch (err) {
      toast.error(err.message || "Reset failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md p-6 mx-auto mt-10 bg-white rounded shadow">
      <div className="flex justify-center mb-4 text-3xl text-pink-700">
        <FaLock />
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center p-2 bg-pink-200">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-transparent outline-none"
          />
          <span
            className="cursor-pointer"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full p-2 text-white rounded ${
            loading ? "bg-pink-400" : "bg-pink-900 hover:bg-pink-800"
          }`}
        >
          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </form>
    </div>
  );
}

export default ResetPassword;
