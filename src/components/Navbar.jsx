import { useContext } from "react";
import { Link, NavLink } from "react-router";
import toast from "react-hot-toast";
import { AuthContext } from "../provider/AuthContext";
import { FaDroplet } from "react-icons/fa6";
import { ThemeContext } from "../provider/ThemeContext";
import { FiMoon, FiSun } from "react-icons/fi";

const Navbar = () => {
  const { user, signOutUser, loading } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const handleLogout = () => {
    signOutUser()
      .then(() => toast.success("Logged out successfully"))
      .catch(() => toast.error("Logout failed"));
  };

  const navLinkClasses = ({ isActive }) =>
    `relative after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[2px] after:bg-primary after:scale-x-0 after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100 ${
      isActive ? "text-primary after:scale-x-100" : "text-base-content"
    }`;

  const navLinks = (
    <>
      <li>
        <NavLink to="/" className={navLinkClasses}>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/donation" className={navLinkClasses}>
          Donation Requests
        </NavLink>
      </li>
      <li>
        <NavLink to="/blogs" className={navLinkClasses}>
          Blogs
        </NavLink>
      </li>
      {user && (
        // <li>
        //   <NavLink to="/fundings" className={navLinkClasses}>
        //     Funding Links
        //   </NavLink>
        // </li>
        <li>
          <NavLink to="/faq" className={navLinkClasses}>
            FAQ
          </NavLink>
        </li>
      )}
    </>
  );

  return (
    <div className="w-full bg-base-100 shadow-md bg-opacity-90 backdrop-blur-md sticky top-0 z-50">
      <div className="navbar max-w-7xl mx-auto px-4">
        {/* Left - Logo */}
        <div className="navbar-start">
          <Link
            to="/"
            className="text-xl md:text-3xl font-bold text-primary font-mono flex items-center gap-1"
          >
            <FaDroplet size={24} className="text-red-500" />
            BloodConnect
          </Link>
        </div>

        {/* Center - Desktop Nav */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 space-x-6 text-lg">
            {navLinks}
          </ul>
        </div>

        {/* Right - User / Auth */}
        <div className="navbar-end space-x-4">
          <button onClick={toggleTheme} className="btn btn-sm btn-ghost">
            {theme === "caramellatte" ? (
              <FiMoon className="text-base-content w-6 h-6" />
            ) : (
              <FiSun className="text-yellow-400 w-6 h-6" />
            )}
          </button>
          {/* Mobile Dropdown */}
          <div className="dropdown lg:hidden">
            <div tabIndex={0} role="button" className="btn btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h10m-10 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 z-50"
            >
              {navLinks}
            </ul>
          </div>

          {/* Auth Section */}
          {loading ? (
            <span className="loading loading-spinner loading-sm text-primary"></span>
          ) : user ? (
            <div className="dropdown dropdown-end">
              <div tabIndex={0}>
                <img
                  src={
                    user.photoURL || "https://i.ibb.co/2YcWrvKc/notfound.png"
                  }
                  alt="User Avatar"
                  className="w-10 h-10 rounded-full border-2 border-primary cursor-pointer"
                  title={user.displayName || "User"}
                />
              </div>
              <ul
                tabIndex={0}
                className="menu dropdown-content bg-base-100 rounded-box p-3 mt-2 shadow-md w-48"
              >
                <li>
                  <NavLink to="/dashboard" className={navLinkClasses}>
                    Dashboard
                  </NavLink>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="btn btn-sm btn-error mt-2"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <Link to="/login" className="btn btn-outline btn-primary px-5">
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
