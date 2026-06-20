import React, { useState } from "react";
import { FaUser, FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import SummaryApi from "../../Common";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../../Store/UserSlice";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({ email: "", password: "" });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!data.email.trim() || !data.password.trim()) {
      toast.error("Email and password cannot be empty");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(SummaryApi.signIn.url, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: data.email.trim(),
          password: data.password.trim(),
        }),
      });

      const result = await res.json();

      if (!res.ok || !result.success) {
        throw new Error(result.message || "Login failed");
      }

      // ✅ SAVE USER
      dispatch(setUserDetails(result.user));
      localStorage.setItem("user", JSON.stringify(result.user));

      toast.success("Login successful");
      navigate("/");

    } catch (error) {
      console.error("Login error:", error);
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md p-6 mx-auto mt-10 bg-white rounded shadow">
      <div className="flex justify-center mb-4 text-3xl text-pink-700">
        <FaUser />
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          name="email"
          value={data.email}
          onChange={handleOnChange}
          placeholder="Email"
          className="w-full p-2 bg-pink-200 outline-none"
        />

        <div className="flex items-center p-2 bg-pink-200">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={data.password}
            onChange={handleOnChange}
            placeholder="Password"
            className="w-full bg-transparent outline-none"
          />
          <span
            className="cursor-pointer"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <div className="text-right">
          <Link to="/forget-password" className="text-sm text-pink-700">
            Forgot password?
          </Link>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full p-2 text-white rounded ${
            loading ? "bg-pink-400" : "bg-pink-900 hover:bg-pink-800"
          }`}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <p className="mt-4 text-center">
        Don&apos;t have an account?{" "}
        <Link to="/sign-up" className="font-semibold text-pink-700">
          Sign up
        </Link>
      </p>
    </div>
  );
}

export default Login;
