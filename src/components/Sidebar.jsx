import { useState } from "react";
import { NavLink } from "react-router";
import useRole from "../hooks/useRoles";
import {
  FaUser,
  FaUsers,
  FaBlog,
  FaHandHoldingHeart,
  FaDonate,
  FaBars,
  FaTimes,
} from "react-icons/fa";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { role, loading } = useRole();

  if (loading) return <div className="p-4">Loading...</div>;

  const toggleSidebar = () => setIsOpen(!isOpen);

  const linkClass = ({ isActive }) =>
    `flex items-center gap-2 px-3 py-2 rounded-lg transition-colors duration-200 ${
      isActive
        ? "bg-primary text-white font-semibold"
        : "text-base-content hover:bg-base-300 hover:text-primary"
    }`;

  return (
    <>
      {/* Hamburger Icon */}
      <div className="lg:hidden p-4">
        <button
          onClick={toggleSidebar}
          aria-label="Open sidebar"
          className="text-2xl text-primary"
        >
          <FaBars />
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed lg:static top-0 left-0 z-50 bg-base-200 w-64 h-screen p-6 border-r shadow-lg transform transition-transform duration-300
        ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 overflow-y-auto`}
      >
        {/* Close button on small devices */}
        <div className="flex justify-between items-center mb-6 lg:hidden">
          <h2 className="text-2xl font-bold text-primary">Dashboard</h2>
          <button
            onClick={toggleSidebar}
            aria-label="Close sidebar"
            className="text-2xl text-primary"
          >
            <FaTimes />
          </button>
        </div>

        {/* Header on large screen */}
        <h2 className="hidden lg:block text-2xl font-bold text-primary mb-6">
          Dashboard
        </h2>

        <nav role="navigation" className="space-y-2">
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
              <NavLink
                to="/dashboard/my-donation-requests"
                className={linkClass}
              >
                <FaDonate /> My Donation Requests
              </NavLink>
              <NavLink to="/dashboard/create-donation" className={linkClass}>
                <FaHandHoldingHeart /> Create Donation Request
              </NavLink>
            </>
          )}

          {role === "volunteer" && (
            <>
              <NavLink to="/dashboard/manage-donations" className={linkClass}>
                <FaBlog /> Manage Donations Requests volunteer
              </NavLink>
              <NavLink to="/dashboard/content-management" className={linkClass}>
                <FaHandHoldingHeart /> Content Management
              </NavLink>
            </>
          )}
        </nav>
      </aside>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40 lg:hidden"
          onClick={toggleSidebar}
          aria-hidden="true"
        />
      )}
    </>
  );
};

export default Sidebar;
