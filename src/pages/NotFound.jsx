import { Link } from "react-router";

import animationData from "../assets/NotFound.json";
import Lottie from "lottie-react";

const NotFound = () => {
  return (
    <div className="max-h-screen flex flex-col items-center justify-center bg-base-100 p-6">
      <Lottie
        animationData={animationData}
        loop={true}
        style={{ height: 300 }}
      />
      <h1 className="text-3xl font-bold mt-6 text-base-content">
        Whoops! You're off the map 🌍
      </h1>
      <p className="text-lg text-base-content text-center mt-2 max-w-md">
        The page you’re looking for might be lost in the Himalayas or deep in
        the ocean.
      </p>
      <Link to="/" className="btn btn-primary mt-6">
        🧭 Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
