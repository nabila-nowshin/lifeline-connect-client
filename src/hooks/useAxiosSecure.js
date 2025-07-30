import { useContext, useEffect } from "react";

import axios from "axios";
import { AuthContext } from "../provider/AuthContext";
import useAuth from "./useAuth";
import { useNavigate } from "react-router";

const useAxiosSecure = () => {
  const { user } = useContext(AuthContext);
  //   const {signOutUser}=useAuth();
  //   const navigate=useNavigate();
  //   console.log(user);

  //   console.log("🚀 ~ useAxiosSecure ~ accessToken:", user.accessToken);
  const instance = axios.create({
    baseURL: "http://localhost:3000",
    // headers: {
    //   Authorization: `Bearer ${user.accessToken}`,
    // },
  });

  useEffect(() => {}, []);

  return instance;
};

export default useAxiosSecure;
