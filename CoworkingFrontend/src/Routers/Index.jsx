import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Home from '../components/Home/Home';
import Login from '../components/Pages/Login';
import ForgetPassword from '../components/Pages/ForgetPassword.jsx';
import ResetPassword from '../components/Pages/ResetPassword';
import Signup from '../components/Pages/Signup';
import  About from '../components/About/About';
import Contact from '../Contact/Contact.jsx';
import User from '../components/User/User.jsx';
import Getstarted from "../components/Getstarted/Header/Header.jsx"; 
const Router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            { path: '', element: <Home /> },
            { path: '/loginpriya', element: <Login /> },
           { path: '/forget-password', element: <ForgetPassword /> },
      { path: '/reset-password/:resetToken', element: <ResetPassword /> },
            { path: '/sign-up', element: <Signup /> },
           {path:'about',element:<About/>},
           {path:'contact',element:<Contact/>},
           {path:'user:userid',element:<User/>},
           {path:'Getstarted',element:<Getstarted/>},
        ]
    }
]);

export default Router;
