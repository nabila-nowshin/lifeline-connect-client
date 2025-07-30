import React, { use } from "react";
import { AuthContext } from "../../provider/AuthContext";
import Statistics from "../AdminComponents/Statistics";

const VolunteerDashBoard = () => {
  const { user } = use(AuthContext);
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-primary mb-2">
        Welcome, {user?.displayName || "Volunteer"}! 🤝
      </h2>
      <p className="text-base text-gray-600">
        Your efforts make a real impact. From coordinating drives to reaching
        out to donors, you’re the heart of this mission.
      </p>
      <Statistics></Statistics>
    </div>
  );
};

export default VolunteerDashBoard;
