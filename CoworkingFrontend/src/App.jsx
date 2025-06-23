// src/App.jsx
import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Headers from './components/Headers/Headers';
import Footer from './components/Footer/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Context from './Context/index.js';
import SummaryApi from './Common';
import { useDispatch } from 'react-redux';
import { setUserDetails } from './Store/UserSlice';
import Header from './components/Getstarted/Header/Header.jsx'
function App() {
    const dispatch =useDispatch()
    const fetchUserDetails = async () => {
        try{
        const dataResponse = await fetch(SummaryApi.current_user.url, {
            method: SummaryApi.current_user.method,
            credentials: "include"
        });
         if (!dataResponse.ok) {
            throw new Error('Network response was not ok');
          }
        const dataApi = await dataResponse.json();

        if(dataApi.success){
         dispatch(setUserDetails( dataApi.user))
        }else
        console.log("data-user", dataResponse.message);
    }
      catch(error)  {
        console.log('error fetching user details:',error);
    }
}

    useEffect(() => {
        fetchUserDetails();
    }, []);

    return (
        <Context.Provider value={{ fetchUserDetails }}>
            <ToastContainer />
            <Headers />
            <main className='min-h-[calc(100vh-100px)] text-left'>
                <Outlet />
            </main>
            <Footer />
            {/* <Header/> */}
        </Context.Provider>
    );
}

export default App;
