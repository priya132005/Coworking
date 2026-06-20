import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import SummaryApi from "../../Common";

const VerifyOtp = () => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const email = localStorage.getItem("resetEmail");

  const submit = async (e) => {
    e.preventDefault();

    const res = await fetch(SummaryApi.verifyOtp.url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp }),
    });

    const data = await res.json();

    if (data.success) {
      toast.success("OTP verified");
      localStorage.setItem("resetOtp", otp);
      navigate("/reset-password");
    } else {
      toast.error(data.message);
    }
  };

  return (
    <form onSubmit={submit}>
      <input value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="Enter OTP" />
      <button>Verify OTP</button>
    </form>
  );
};

export default VerifyOtp;
