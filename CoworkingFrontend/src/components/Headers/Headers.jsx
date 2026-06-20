// import React from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, NavLink, useNavigate } from "react-router-dom";
// import SummaryApi from "../../Common";
// import { toast } from "react-toastify";
// import { setUserDetails } from "../../Store/UserSlice";

// export default function Headers() {
//   const user = useSelector((state) => state.user.user);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleLogout = async () => {
//     try {
//       await fetch(SummaryApi.logout_user.url, {
//         method: SummaryApi.logout_user.method,
//         credentials: "include",
//       });
//     } catch {
//       console.warn("Logout API failed");
//     }

//     dispatch(setUserDetails(null));
//     localStorage.removeItem("user");
//     toast.success("Logged out successfully");
//     navigate("/");
//   };

//   return (
//     <header className="sticky top-0 z-50 bg-white shadow">
//       <nav className="relative max-w-screen-xl mx-auto px-4 lg:px-6 py-2.5 flex items-center">

//         {/* LEFT → LOGO */}
//         <Link to="/" className="flex items-center">
//           <img
//             src="https://thumbs.dreamstime.com/b/vector-logo-coworking-place-to-work-workspace-195704921.jpg"
//             className="h-20"
//             alt="Logo"
//           />
//         </Link>

//         {/* CENTER → NAV LINKS */}
//         <ul className="absolute hidden space-x-8 font-medium -translate-x-1/2 left-1/2 lg:flex">
//           {["/", "/about", "/contact"].map((path, idx) => (
//             <li key={idx}>
//               <NavLink
//                 to={path}
//                 className={({ isActive }) =>
//                   isActive
//                     ? "text-pink-700 font-semibold"
//                     : "text-gray-700 hover:text-pink-700"
//                 }
//               >
//                 {path === "/" ? "Home" : path.replace("/", "").replace("-", " ").replace(/\b\w/g, l => l.toUpperCase())}
//               </NavLink>
//             </li>
//           ))}
//         </ul>

//         {/* RIGHT → AUTH BUTTONS */}
//         <div className="flex items-center gap-4 ml-auto">
//           {!user?._id ? (
//             <>
//               <Link
//                 to="/loginpriya"
//                 className="px-4 py-2 text-sm text-gray-800 rounded-lg hover:bg-gray-50"
//               >
//                 Log in
//               </Link>

//               <Link
//                 to="/getstarted"
//                 className="px-4 py-2 text-sm text-white bg-pink-700 rounded-lg hover:bg-pink-800"
//               >
//                 Get started
//               </Link>
//             </>
//           ) : (
//             <>
//               <button
//                 onClick={handleLogout}
//                 className="px-3 py-1 text-white bg-pink-600 rounded-full hover:bg-pink-700"
//               >
//                 Logout
//               </button>

//               <Link
//                 to="/getstarted"
//                 className="px-4 py-2 text-sm text-white bg-pink-700 rounded-lg hover:bg-pink-800"
//               >
//                 Get started
//               </Link>
//             </>
//           )}
//         </div>

//       </nav>
//     </header>
//   );
// }



import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import SummaryApi from "../../Common";
import { toast } from "react-toastify";
import { setUserDetails } from "../../Store/UserSlice";

export default function Headers() {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch(SummaryApi.logoutUser.url, {
        method: SummaryApi.logoutUser.method,
        credentials: "include",
      });

      const data = await response.json();

      if (data.success) {
        toast.success(data.message);
        dispatch(setUserDetails(null));
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("An error occurred during logout.");
      console.error("Logout error:", error);
    }
  };

  const navLinkClass = ({ isActive }) =>
    `block py-2 duration-200 ${isActive ? "text-pink-700" : "text-gray-700"} hover:text-pink-600`;

  return (
    <header className="sticky top-0 z-50 shadow">
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5">
        <div className="flex flex-wrap items-center justify-between max-w-screen-xl mx-auto">

          {/* LOGO */}
          <Link to="/" className="flex items-center">
            <img
              src="https://thumbs.dreamstime.com/b/vector-logo-coworking-place-to-work-workspace-195704921.jpg"
              className="h-20 mr-3"
              alt="Logo"
            />
          </Link>

          {/* RIGHT SIDE BUTTONS */}
          <div className="flex items-center gap-4 lg:order-2">
            {user?._id ? (
              <>
                {user.role === "ADMIN" && (
                  <Link
                    to="/admin/dashboard"
                    className="px-3 py-1 text-sm font-medium text-pink-700 border border-pink-700 rounded-full hover:bg-pink-50"
                  >
                    Admin
                  </Link>
                )}
                <Link
                  to={`/user/${user._id}`}
                  className="px-3 py-1 text-sm font-medium text-gray-800 rounded-lg hover:bg-gray-50"
                >
                  {user.name?.split(" ")[0] || "Profile"}
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-3 py-1 text-white bg-pink-500 rounded-full hover:bg-pink-700"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/loginpriya"
                className="px-4 py-2 text-sm font-medium text-gray-800 rounded-lg hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 focus:outline-none"
              >
                Log in
              </Link>
            )}

            <Link
              to="/getstarted"
              className="px-4 py-2 text-sm font-medium text-white bg-pink-700 rounded-lg hover:bg-pink-800 focus:ring-4 focus:ring-pink-300 focus:outline-none"
            >
              Get started
            </Link>
          </div>

          {/* NAV LINKS */}
          <div className="hidden w-full lg:flex lg:w-auto lg:order-1">
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              <li>
                <NavLink to="/" className={navLinkClass}>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/spaces" className={navLinkClass}>
                  Spaces
                </NavLink>
              </li>
              <li>
                <NavLink to="/about" className={navLinkClass}>
                  About
                </NavLink>
              </li>
              <li>
                <NavLink to="/contact" className={navLinkClass}>
                  Contact Us
                </NavLink>
              </li>
              {user?._id && (
                <li>
                  <NavLink to="/my-bookings" className={navLinkClass}>
                    My Bookings
                  </NavLink>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
