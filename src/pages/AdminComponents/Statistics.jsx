import React from "react";
import { Users, HandCoins, Droplet } from "lucide-react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../provider/AuthContext";

const Statistics = () => {
  const axiosSecure = useAxiosSecure();

  const { data: usersCount = 0 } = useQuery({
    queryKey: ["usersCount"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/all-users-count`);
      return res.data;
    },
  });
  const { data: donationCount = 0 } = useQuery({
    queryKey: ["donationCount"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/all-donation-count`);
      return res.data;
    },
  });

  return (
    <div className="flex justify-center">
      <div className="stats stats-vertical lg:stats-horizontal shadow my-10 md:my-20 mx-auto">
        <div className="stat">
          <div className="flex items-center gap-2 stat-title text-primary">
            <Users className="w-5 h-5" />
            Total Users
          </div>
          <div className="stat-value">{usersCount}</div>
        </div>

        {/* <div className="stat">
          <div className="flex items-center gap-2 stat-title text-secondary">
            <HandCoins className="w-5 h-5" />
            Total Funding
          </div>
          <div className="stat-value">$4,200</div>
        </div> */}

        <div className="stat">
          <div className="flex items-center gap-2 stat-title text-red-500">
            <Droplet className="w-5 h-5" />
            Blood Donation Requests
          </div>
          <div className="stat-value">{donationCount}</div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
