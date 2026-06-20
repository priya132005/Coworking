// const BASE_URL = "http://localhost:5000/api";

// const SummaryApi = {
//   signUp: {
//     url: `${BASE_URL}/signup`,
//     method: "POST",
//   },

//   signIn: {
//     url: `${BASE_URL}/signin`,
//     method: "POST",
//   },

//   userDetails: {
//     url: `${BASE_URL}/user-details`,
//     method: "GET",
//   },

//   allUsers: {
//     url: `${BASE_URL}/users`, // ✅ FIXED
//     method: "GET",
//   },

//   updateUserRole: {
//     url: `${BASE_URL}/update-role`,
//     method: "PUT",
//   },

//   forgotPassword: {
//     url: `${BASE_URL}/forgot-password`,
//     method: "POST",
//   },
//   verifyOtp: {
//     url: `${BASE_URL}/verify-otp`,
//     method: "POST",
//   },
//  resetPassword: {
//   url: `${BASE_URL}/reset-password`,
//   method: "POST",
// },


// };

// export default SummaryApi;



// Base URL of the backend API. Set VITE_API_URL in your .env file when
// deploying (e.g. https://your-backend.onrender.com/api). Falls back to
// localhost for local development.
export const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const SummaryApi = {
  // ---- Auth ----
  signUp: {
    url: `${BASE_URL}/signup`,
    method: 'POST',
  },
  signIn: {
    url: `${BASE_URL}/signin`,
    method: 'POST',
  },
  userDetails: {
    url: `${BASE_URL}/user-details`,
    method: 'GET',
  },
  logoutUser: {
    url: `${BASE_URL}/logout`,
    method: 'POST',
  },
  forgotPassword: {
    url: `${BASE_URL}/forgot-password`,
    method: 'POST',
  },
  resetPassword: (resetToken) => ({
    url: `${BASE_URL}/reset-password/${resetToken}`,
    method: 'POST',
  }),

  // ---- Admin: users ----
  allUsers: {
    url: `${BASE_URL}/all-users`,
    method: 'GET',
  },
  updateUser: {
    url: `${BASE_URL}/update-user`,
    method: 'POST',
  },

  // ---- Spaces (coworking listings) ----
  getAllSpaces: {
    url: `${BASE_URL}/spaces`,
    method: 'GET',
  },
  getAllSpacesAdmin: {
    url: `${BASE_URL}/spaces/admin/all`,
    method: 'GET',
  },
  getSpaceById: (id) => ({
    url: `${BASE_URL}/spaces/${id}`,
    method: 'GET',
  }),
  createSpace: {
    url: `${BASE_URL}/spaces`,
    method: 'POST',
  },
  updateSpace: (id) => ({
    url: `${BASE_URL}/spaces/${id}`,
    method: 'PUT',
  }),
  deleteSpace: (id) => ({
    url: `${BASE_URL}/spaces/${id}`,
    method: 'DELETE',
  }),

  // ---- Bookings ----
  createBooking: {
    url: `${BASE_URL}/bookings`,
    method: 'POST',
  },
  checkAvailability: {
    url: `${BASE_URL}/bookings/availability`,
    method: 'GET',
  },
  getMyBookings: {
    url: `${BASE_URL}/bookings/my`,
    method: 'GET',
  },
  getBookingById: (id) => ({
    url: `${BASE_URL}/bookings/${id}`,
    method: 'GET',
  }),
  cancelBooking: (id) => ({
    url: `${BASE_URL}/bookings/${id}/cancel`,
    method: 'PUT',
  }),
  getAllBookings: {
    url: `${BASE_URL}/bookings`,
    method: 'GET',
  },
  updateBookingStatus: (id) => ({
    url: `${BASE_URL}/bookings/${id}/status`,
    method: 'PUT',
  }),

  // ---- Payments ----
  payForBooking: (bookingId) => ({
    url: `${BASE_URL}/payments/${bookingId}/pay`,
    method: 'POST',
  }),

  // ---- Admin dashboard ----
  getDashboardStats: {
    url: `${BASE_URL}/admin/stats`,
    method: 'GET',
  },

  // ---- Contact ----
  sendMessage: {
    url: `${BASE_URL}/message`,
    method: 'POST',
  },
};

export default SummaryApi;
