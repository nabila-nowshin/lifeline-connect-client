import { NavLink } from "react-router"; // fixed from "react-router" to "react-router-dom"
import useRole from "../hooks/useRoles";
import {
  FaUser,
  FaUsers,
  FaBlog,
  FaHandHoldingHeart,
  FaDonate,
  FaPen,
  FaFileAlt,
} from "react-icons/fa";

const Sidebar = () => {
  const { role, loading } = useRole();

  if (loading) return <div className="p-4">Loading...</div>;

  const linkClass = ({ isActive }) =>
    `flex items-center gap-2 px-3 py-2 rounded-lg transition-colors duration-200 ${
      isActive
        ? "bg-primary text-white font-semibold"
        : "text-base-content hover:bg-base-300 hover:text-primary"
    }`;

  return (
    <aside className="w-64 min-h-screen bg-base-200 p-6 border-r space-y-6 shadow-lg">
      <h2 className="text-2xl font-bold text-primary">Dashboard</h2>

      <nav className="space-y-2">
        <NavLink to="/dashboard/profile" className={linkClass}>
          <FaUser /> My Profile
        </NavLink>

        {role === "admin" && (
          <>
            <NavLink to="/dashboard/all-users" className={linkClass}>
              <FaUsers /> All Users
            </NavLink>
            <NavLink to="/dashboard/manage-donations" className={linkClass}>
              <FaBlog /> Manage Donations Requests
            </NavLink>
            <NavLink to="/dashboard/content-management" className={linkClass}>
              <FaHandHoldingHeart /> Content Management
            </NavLink>
          </>
        )}

        {role === "donor" && (
          <>
            <NavLink to="/dashboard/my-donation-requests" className={linkClass}>
              <FaDonate /> My Donation Requests
            </NavLink>
            <NavLink to="/dashboard/create-donation" className={linkClass}>
              <FaHandHoldingHeart /> Create Donation Request
            </NavLink>
          </>
        )}

        {role === "volunteer" && (
          <>
            <NavLink to="/dashboard/my-blogs" className={linkClass}>
              <FaFileAlt /> My Blogs
            </NavLink>
            <NavLink to="/dashboard/create-blog" className={linkClass}>
              <FaPen /> Create Blog
            </NavLink>
          </>
        )}
      </nav>
    </aside>
  );
};

export default Sidebar;
