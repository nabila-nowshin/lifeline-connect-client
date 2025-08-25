import { useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import districtsData from "../assets/data/districts.json";
import upazilasData from "../assets/data/upazilas.json";
import { NavLink } from "react-router";
import { AuthContext } from "../provider/AuthContext";
import useAxiosPublic from "../hooks/axiosPublic";

const PendingDonations = () => {
  const axiosPublic = useAxiosPublic();

  const [page, setPage] = useState(1);
  const limit = 3;

  //   get all donation req info
  const {
    data: response = { donations: [], total: 0 },
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["donations", page],
    queryFn: async () => {
      const res = await axiosPublic.get(
        `/pending-donations?page=${page}&limit=${limit}`
      );
      return res.data;
    },
  });

  const requests = response.donations;

  const totalPages = Math.ceil(response.total / limit);

  if (isLoading) return <p className="text-center py-4">Loading...</p>;

  return (
    <div className="rounded-xl p-6 mt-6">
      <div className="max-w-7xl mx-auto px-4 bg-white py-5 rounded-2xl shadow">
        <h2 className="text-xl font-bold mb-4">Donation Requests</h2>
        <div className="overflow-x-auto">
          {requests.length === 0 ? (
            <p className="text-center text-gray-500 py-8">
              No donation requests found.
            </p>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>Recipient</th>
                  <th>Location</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Blood Group</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((req) => (
                  <tr key={req._id}>
                    <td>{req.recipientName}</td>
                    <td>
                      {districtsData.find((d) => d.id === req.recipientDistrict)
                        ?.name || ""}
                      ,{" "}
                      {upazilasData.find((u) => u.id === req.recipientUpazila)
                        ?.name || ""}
                    </td>
                    <td>{req.donationDate}</td>
                    <td>{req.donationTime}</td>
                    <td>{req.bloodGroup}</td>
                    <td className="capitalize">{req.status}</td>
                    <td className="flex gap-2">
                      <NavLink
                        className="btn btn-info btn-xs"
                        to={`/dashboard/donation-request/${req._id}`}
                      >
                        View
                      </NavLink>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {/* Pagination Controls */}
          <div className="flex justify-center mt-4 items-center gap-2">
            <button
              className="btn btn-sm"
              disabled={page === 1}
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            >
              Previous
            </button>

            {[...Array(totalPages)].map((_, idx) => {
              const pageNum = idx + 1;
              return (
                <button
                  key={pageNum}
                  onClick={() => setPage(pageNum)}
                  className={`btn btn-sm ${
                    pageNum === page ? "btn-primary" : "btn-ghost"
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}

            <button
              className="btn btn-sm"
              disabled={page === totalPages}
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PendingDonations;
