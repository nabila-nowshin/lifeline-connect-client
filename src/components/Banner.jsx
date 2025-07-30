import { Link } from "react-router";
import { FaUserPlus, FaSearch } from "react-icons/fa";

const Banner = () => {
  return (
    <div className="bg-base-200 h-[60vh] flex items-center justify-center">
      <div className="text-center space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold text-primary">
          Be a Hero. Donate Blood.
        </h1>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Link to="/register">
            <button className="btn btn-primary text-lg">
              <FaUserPlus className="mr-2" /> Join as a Donor
            </button>
          </Link>
          <Link to="/search">
            <button className="btn btn-outline text-lg">
              <FaSearch className="mr-2" /> Search Donors
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Banner;
