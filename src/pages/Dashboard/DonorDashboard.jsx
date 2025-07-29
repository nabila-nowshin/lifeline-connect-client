import React, { use } from "react";
import { AuthContext } from "../../provider/AuthContext";
import RecentDonationRequests from "../RecentDonationRequests";

const DonorDashboard = () => {
  const { user } = use(AuthContext);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-primary mb-2">
        Welcome, {user?.displayName || "Donor"}! 🎉
      </h2>
      <p className="text-base text-gray-600">
        Thank you for being a donor. You can manage your donations and view
        donation history from here.
      </p>

      <RecentDonationRequests></RecentDonationRequests>
    </div>
  );
};

export default DonorDashboard;
