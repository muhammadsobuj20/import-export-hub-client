// src/utils/api.js
import axios from "axios";
import { toast } from "react-toastify";
import { getAuth } from "firebase/auth";

// Axios instance 
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/products",
  withCredentials: true,
});

//  Request Interceptor
api.interceptors.request.use(
  async (config) => {
    const auth = getAuth();
    const user = auth.currentUser;

    // user login  Firebase
    if (user) {
      const token = await user.getIdToken();
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

//  Response Interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const status = error.response.status;
      const msg =
        error.response.data?.message ||
        "Something went wrong! Please try again.";

      if (status === 401) {
        toast.error("Session expired. Please login again.");
        const auth = getAuth();
        // Firebase logout
        auth.signOut();
        window.location.href = "/login";
      } else {
        toast.error(msg);
      }
    } else {
      toast.error("Network error! Please check your internet connection.");
    }

    return Promise.reject(error);
  }
);

export default api;
