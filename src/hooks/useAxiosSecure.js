import axios from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../provider/AuthContext";

const useAxiosSecure = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const instance = axios.create({
    baseURL: "https://lifeline-connect-server.vercel.app",
  });

  // Interceptor to attach token and handle 401/403
  instance.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${user?.accessToken}`;

    return config;
  });

  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401 || error.response?.status === 403) {
        // Optional: Auto-logout on token error
        console.warn("Unauthorized. Redirecting to login...");
        navigate("/login");
      }
      return Promise.reject(error);
    }
  );

  return instance;
};

export default useAxiosSecure;
