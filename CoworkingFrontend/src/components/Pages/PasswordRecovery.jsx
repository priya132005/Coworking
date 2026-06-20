import React, { useState } from "react";
import ForgotPassword from "./ForgotPassword";
import VerifyOtp from "./VerifyOtp";
import ResetPassword from "./ResetPassword";

const PasswordRecovery = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  return (
    <>
      {step === 1 && <ForgotPassword setStep={setStep} setEmail={setEmail} />}
      {step === 2 && <VerifyOtp email={email} setStep={setStep} setOtp={setOtp} />}
      {step === 3 && <ResetPassword email={email} otp={otp} />}
    </>
  );
};

export default PasswordRecovery;
