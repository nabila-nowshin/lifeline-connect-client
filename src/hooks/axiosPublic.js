import axios from "axios";

const useAxiosPublic = () => {
  const instance = axios.create({
    baseURL: "https://lifeline-connect-server.vercel.app",
  });

  return instance;
};

export default useAxiosPublic;
