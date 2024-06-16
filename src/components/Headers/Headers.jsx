import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import  {Link,NavLink} from 'react-router-dom'
import SummaryApi from '../../Common';
import { toast } from 'react-toastify';
import { setUserDetails } from '../../Store/UserSlice';
export default function Headers() {
    const user = useSelector((state) => state.user.user);
    const dispatch = useDispatch();
    // const [menuDisplay, setMenuDisplay] = useState(false);
    const handleLogout = async () => {
        try {
          const response = await fetch(SummaryApi.logout_user.url, {
            method: SummaryApi.logout_user.method,
            credentials: 'include',
          });
          const data = await response.json();
          if (data.success) {
            toast.success(data.message);
            dispatch(setUserDetails(null));
          } else {
            toast.error(data.message);
          }
        } catch (error) {
          toast.error('An error occurred during logout.');
          console.error('Logout error:', error);
        }
      };
    return (
        <header className="sticky top-0 z-50 shadow">
            <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5">
                <div className="flex flex-wrap items-center justify-between max-w-screen-xl mx-auto">
                    <Link to="/" className="flex items-center">
                        <img
                            src="https://thumbs.dreamstime.com/b/vector-logo-coworking-place-to-work-workspace-195704921.jpg"
                            className="h-12 mr-3"
                            alt="Logo"
                        />
                    </Link>
                    <div className="flex items-center lg:order-2">
                        <div>
                    {user?._id ? (
                <button onClick={handleLogout} className="px-3 py-1 text-white bg-pink-500 rounded-full hover:bg-pink-700">
                  Logout
                </button>
              ) 
                        :(<Link
                            to="loginpriya"
                            className="text-gray-800 hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
                        >
                            Log in
                        </Link>)}</div>
                      <div>  <Link
                            to="/Contact"
                            className="text-white bg-pink-700 hover:bg-pink-800 focus:ring-4 focus:ring-pink-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
                        >
                            Get started
                        </Link></div>
                    </div>
                    <div
                        className="items-center justify-between hidden w-full lg:flex lg:w-auto lg:order-1"
                        id="mobile-menu-2"
                    >
                        <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                            <li>
                                <NavLink
                                to="/"
                                    className={(isActive) =>
                                        `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-pink-700":"text-gray-700"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                                    }
                                >
                                    Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                to="/About"
                                    className={(isActive) =>
                                        `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-pink-700":"text-gray-700"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                                    }
                                >
                                About
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                to="/Contact"
                                    className={(isActive) =>
                                        `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-pink-700":"text-gray-700"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                                    }
                                >
                                    Contact Us
                                </NavLink>
                            </li>
                            
                            
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
}