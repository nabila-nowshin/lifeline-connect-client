import React, { use } from "react";
import { AuthContext } from "../../provider/AuthContext";
import Statistics from "../AdminComponents/Statistics";

const AdminDashboard = () => {
  const { user } = use(AuthContext);
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-primary mb-2">
        Welcome, {user?.displayName || "Admin"}! 🛠️
      </h2>
      <p className="text-base text-gray-600">
        You have full control of the platform. Manage users, monitor donations,
        and keep everything running smoothly.
      </p>

      <Statistics></Statistics>
    </div>
  );
};

export default AdminDashboard;
