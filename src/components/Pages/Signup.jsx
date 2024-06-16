import React, { useState } from 'react';
import { FaUser, FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import SummaryApi from '../../Common/index.js'; // Ensure correct path
import { toast } from 'react-toastify';

function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmpassword: ""
  });

  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (data.password === data.confirmpassword) {
      try {
        const response = await fetch(SummaryApi.signUP.url, {
          method: SummaryApi.signUP.method,
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            name: data.name,
            email: data.email,
            password: data.password
          })
        });
        const dataApi = await response.json();

        if (response.ok) {
          toast.success(dataApi.message || "Signup successful!");
          navigate("/loginpriya");
        } else {
          toast.error(dataApi.message || "Something went wrong!");
        }
      } catch (error) {
        toast.error("Error during signup: " + error.message);
        console.error("Error during signup:", error);
      }
    } else {
      toast.error("Passwords do not match!");
      console.log("Please check your password!!");
    }
  };

  return (
    <section id='signup' >
      <div className="container p-4 mx-auto ">
        <div className="w-full max-w-md p-2 py-5 mx-auto bg-white">
          <div className='relative w-20 h-20 mx-auto'>
            <div className='flex items-center justify-center text-3xl cursor-pointer'>
              <FaUser />
            </div>
          </div>
          <form className='flex flex-col gap-2 pt-6' onSubmit={handleSubmit}>
            <div className="grid text-left">
              <label>Name:</label>
              <div className="p-2 bg-pink-200">
                <input
                  type='text'
                  placeholder='Enter your name...'
                  name='name'
                  value={data.name}
                  onChange={handleOnChange}
                  required
                  className='w-full h-full bg-transparent outline-none'
                />
              </div>
            </div>
            <div className="grid text-left">
              <label>Email:</label>
              <div className="p-2 bg-pink-200">
                <input
                  type='email'
                  placeholder='Enter email...'
                  name='email'
                  value={data.email}
                  onChange={handleOnChange}
                  required
                  className='w-full h-full bg-transparent outline-none'
                />
              </div>
            </div>
            <div className="mt-4 text-left">
              <label>Password:</label>
              <div className="flex p-2 bg-pink-200">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder='Enter password...'
                  name='password'
                  value={data.password}
                  onChange={handleOnChange}
                  required
                  className='w-full h-full bg-transparent outline-none'
                />
                <div className="ml-2 text-xl cursor-pointer" onClick={() => setShowPassword(prev => !prev)}>
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
            </div>
            <div className="mt-4 text-left">
              <label>Confirm Password:</label>
              <div className="flex p-2 bg-pink-200">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder='Enter confirm password...'
                  name='confirmpassword'
                  value={data.confirmpassword}
                  onChange={handleOnChange}
                  required
                  className='w-full h-full bg-transparent outline-none'
                />
                <div className="ml-2 text-xl cursor-pointer" onClick={() => setShowConfirmPassword(prev => !prev)}>
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
            </div>
            <button className='block w-full max-w-xs px-6 py-2 mx-auto mt-6 text-white transition-all bg-pink-900 rounded-full hover:scale-90 hover:bg-pink-700'>
              Sign up
            </button>
          </form>
          <p className='my-5 text-left'>Already have an account? <Link to="/loginpriya" className="text-pink-600 hover:text-pink-900 hover:underline">Login</Link></p>
        </div>
      </div>
    </section>
  );
}

export default Signup;
