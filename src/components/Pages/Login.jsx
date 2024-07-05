import React, { useContext, useState } from 'react';
import { FaUser, FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import SummaryApi from '../../Common/index.js'; // Ensure correct path to SummaryApi
import { toast } from 'react-toastify';
import Context from '../../Context/index.js';
import { useDispatch } from 'react-redux';
import { setUserDetails } from '../../Store/UserSlice.js';

function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [data, setData] = useState({
        email: "",
        password: ""
    });
    const dispatch=useDispatch()

    const navigate = useNavigate();
    const {fetchUserDetails}= useContext(Context)

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const dataResponse = await fetch(SummaryApi.signIn.url, {
            method: SummaryApi.signIn.method,
            credentials: "include",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(data),
        });
        const dataApi = await dataResponse.json();
        if (dataApi.success) {
            toast.success(dataApi.message)
            dispatch(setUserDetails(dataApi.user));
            navigate('/');
            fetchUserDetails();
        } else {
            toast.error(dataApi.message);
        }
    };

    return (
        <section id='login'>
            <div className="container p-4 mx-auto">
                <div className="w-full max-w-md p-2 py-5 mx-auto bg-white">
                    <div className='w-20 h-20 mx-auto'>
                        <div className='text-3xl cursor-pointer'>
                            <FaUser />
                        </div>
                    </div>
                    <form className='flex flex-col gap-2 pt-6' onSubmit={handleSubmit}>
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
                                    className='w-full h-full bg-transparent outline-none' />
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
                                    className='w-full h-full bg-transparent outline-none' autoComplete='current-password' />
                                <div className="ml-2 text-xl cursor-pointer" onClick={() => setShowPassword(prev => !prev)}>
                                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                                </div>
                            </div>
                            <Link to="/forget-password" className="block mt-2 ml-auto w-fit hover:underline hover:text-pink-600">
                                Forgot password?
                            </Link>
                        </div>
                        <button className='block w-full max-w-xs px-6 py-2 mx-auto mt-6 text-white transition-all bg-pink-900 rounded-full hover:scale-90 hover:bg-pink-700'>
                            Login
                        </button>
                    </form>
                    <p className='my-5 text-left'>Don't have account? <Link to="/sign-up" className="text-pink-600 hover:text-pink-900 hover:underline">Sign up</Link></p>
                </div>
            </div>
        </section>
    );
}

export default Login;
