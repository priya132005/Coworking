import React, { useState } from "react";
import { FaEye, FaEyeSlash, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import SummaryApi from "../../Common";

const Signup = () => {
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [showCpass, setShowCpass] = useState(false);

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (data.password !== data.confirmpassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const res = await fetch(SummaryApi.signUp.url, {
        method: SummaryApi.signUp.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password,
        }),
      });

      const result = await res.json();

      if (res.ok) {
        toast.success(result.message);
        navigate("/login");
      } else {
        toast.error(result.message);
      }
    } catch (err) {
      toast.error("Server error");
    }
  };

  return (
    <div className="max-w-md p-5 mx-auto bg-white">
      <div className="mb-3 text-3xl text-center">
        <FaUser />
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          name="name"
          placeholder="Name"
          onChange={handleChange}
          required
          className="w-full p-2 bg-pink-200"
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          required
          className="w-full p-2 bg-pink-200"
        />

        <div className="flex p-2 bg-pink-200">
          <input
            name="password"
            type={showPass ? "text" : "password"}
            placeholder="Password"
            onChange={handleChange}
            required
            className="w-full bg-transparent outline-none"
          />
          <span onClick={() => setShowPass(!showPass)}>
            {showPass ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <div className="flex p-2 bg-pink-200">
          <input
            name="confirmpassword"
            type={showCpass ? "text" : "password"}
            placeholder="Confirm Password"
            onChange={handleChange}
            required
            className="w-full bg-transparent outline-none"
          />
          <span onClick={() => setShowCpass(!showCpass)}>
            {showCpass ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <button className="w-full p-2 text-white bg-pink-900 rounded">
          Sign Up
        </button>
      </form>

      <p className="mt-4">
        Already have account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default Signup;
