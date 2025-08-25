import { Link } from "react-router";
import { FaUserPlus, FaSearch } from "react-icons/fa";

const Banner = () => {
  return (
    <div className="bg-gradient-to-r from-base-100/50 to-base-200 h-[60vh] flex items-center justify-center relative overflow-hidden">
      <div className="text-center space-y-6 z-10">
        <h1
          className="text-4xl md:text-5xl font-bold text-red-600"
          data-aos="fade-down"
        >
          Be a Hero. Donate Blood.
        </h1>
        <div
          className="flex flex-col md:flex-row gap-4 justify-center"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <Link to="/register">
            <button className="btn btn-primary text-lg hover:scale-105 transition-transform">
              <FaUserPlus className="mr-2" /> Join as a Donor
            </button>
          </Link>
          <Link to="/search">
            <button className="btn btn-outline text-lg hover:scale-105 transition-transform">
              <FaSearch className="mr-2" /> Search Donors
            </button>
          </Link>
        </div>
      </div>

      {/* Optional subtle background shapes */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-red-200 rounded-full opacity-20 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-300 rounded-full opacity-20 translate-x-1/3 translate-y-1/3"></div>
    </div>
  );
};

export default Banner;
