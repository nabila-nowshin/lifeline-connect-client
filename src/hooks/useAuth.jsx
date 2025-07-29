import React, { use } from "react";
import { AuthContext } from "../provider/AuthContext";

const useAuth = () => {
  return use(AuthContext);
};

export default useAuth;
