const BASE_URL = "http://localhost:3000/api";

const SummaryApi = {
  signUp: {
    url: `${BASE_URL}/signup`,
    method: "POST",
  },
  signIn: {
    url: `${BASE_URL}/signin`,
    method: "POST",
  },
  userDetails: {
    url: `${BASE_URL}/user-details`,
    method: "GET",
  },
  allUsers: {
    url: `${BASE_URL}/all-users`,
    method: "GET",
  },
  createBooking: {
    url: `${BASE_URL}/booking`,
    method: "POST",
  },
};

export default SummaryApi;
