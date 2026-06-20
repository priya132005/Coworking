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
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
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
        toast.success(result.message || "Signup successful");
        navigate("/loginpriya"); // ✅ correct route
      } else {
        toast.error(result.message || "Signup failed");
      }
    } catch (error) {
      toast.error("Server error");
    }
  };

  return (
    <div className="max-w-md p-6 mx-auto mt-10 bg-white rounded shadow">
      <div className="flex justify-center mb-4 text-3xl text-pink-700">
        <FaUser />
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          value={data.name}
          placeholder="Name"
          onChange={handleChange}
          required
          className="w-full p-2 bg-pink-200 outline-none"
        />

        <input
          name="email"
          type="email"
          value={data.email}
          placeholder="Email"
          onChange={handleChange}
          required
          className="w-full p-2 bg-pink-200 outline-none"
        />

        <div className="flex items-center p-2 bg-pink-200">
          <input
            name="password"
            type={showPass ? "text" : "password"}
            value={data.password}
            placeholder="Password"
            onChange={handleChange}
            required
            className="w-full bg-transparent outline-none"
          />
          <span
            className="cursor-pointer"
            onClick={() => setShowPass((prev) => !prev)}
          >
            {showPass ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <div className="flex items-center p-2 bg-pink-200">
          <input
            name="confirmpassword"
            type={showCpass ? "text" : "password"}
            value={data.confirmpassword}
            placeholder="Confirm Password"
            onChange={handleChange}
            required
            className="w-full bg-transparent outline-none"
          />
          <span
            className="cursor-pointer"
            onClick={() => setShowCpass((prev) => !prev)}
          >
            {showCpass ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <button
          type="submit"
          className="w-full p-2 text-white bg-pink-900 rounded hover:bg-pink-800"
        >
          Sign Up
        </button>
      </form>

      <p className="mt-4 text-center">
        Already have an account?{" "}
        <Link to="/loginpriya" className="font-semibold text-pink-700">
          Login
        </Link>
      </p>
    </div>
  );
};

export default Signup;
