import { useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { AuthContext } from "../provider/AuthContext";
import districtsData from "../assets/data/districts.json";
import upazilasData from "../assets/data/upazilas.json";
import { NavLink } from "react-router";

const RecentDonationRequests = () => {
  const { user, loading } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const [editRequest, setEditRequest] = useState(null);
  const [deleteRequest, setDeleteRequest] = useState(null);
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const {
    data: requests = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["recents", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/donation-requests/recent/${user.email}`
      );
      return res.data;
    },
    enabled: !loading && !!user?.email,
  });

  const handleUpdate = async () => {
    try {
      setUpdating(true);
      await axiosSecure.patch(
        `/donation-requests/${editRequest._id}`,
        editRequest
      );
      setEditRequest(null);
      refetch();
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async () => {
    try {
      setDeleting(true);
      await axiosSecure.delete(`/donation-requests/${deleteRequest._id}`);
      setDeleteRequest(null);
      refetch();
    } finally {
      setDeleting(false);
    }
  };

  if (isLoading || requests.length === 0) return null;

  return (
    <div className="bg-white rounded-xl p-6 shadow mt-6">
      <h2 className="text-xl font-bold mb-4">Your Recent Donation Requests</h2>
      <div className="overflow-x-auto">
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
                  ,
                  {upazilasData.find((u) => u.id === req.recipientUpazila)
                    ?.name || ""}
                </td>
                <td>{req.donationDate}</td>
                <td>{req.donationTime}</td>
                <td>{req.bloodGroup}</td>
                <td className="capitalize">{req.status}</td>
                <td className="flex gap-2">
                  {req.status === "inprogress" && (
                    <>
                      <button className="btn btn-success btn-xs">Done</button>
                      <button className="btn btn-error btn-xs">Cancel</button>
                    </>
                  )}
                  <button className="btn btn-info btn-xs">View</button>
                  <NavLink
                    to="/dashboard/edit-donation"
                    className="btn btn-warning btn-xs"
                  >
                    Edit
                  </NavLink>
                  <button
                    className="btn btn-outline btn-xs"
                    onClick={() => setDeleteRequest(req)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {editRequest && (
        <dialog open className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">Edit Donation Request</h3>

            <input
              className="input input-bordered w-full mb-2"
              value={editRequest.recipientName}
              onChange={(e) =>
                setEditRequest({
                  ...editRequest,
                  recipientName: e.target.value,
                })
              }
            />
            <input
              className="input input-bordered w-full mb-2"
              value={editRequest.donationDate}
              onChange={(e) =>
                setEditRequest({ ...editRequest, donationDate: e.target.value })
              }
            />
            <input
              className="input input-bordered w-full mb-2"
              value={editRequest.donationTime}
              onChange={(e) =>
                setEditRequest({ ...editRequest, donationTime: e.target.value })
              }
            />

            <div className="modal-action">
              <button
                className="btn btn-success"
                onClick={handleUpdate}
                disabled={updating}
              >
                {updating ? "Updating..." : "Update"}
              </button>
              <button
                className="btn btn-ghost"
                onClick={() => setEditRequest(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </dialog>
      )}

      {/* Delete Modal */}
      {deleteRequest && (
        <dialog open className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">Confirm Delete Request?</h3>
            <p>
              Are you sure you want to delete the request for{" "}
              <strong>{deleteRequest.recipientName}</strong>?
            </p>
            <div className="modal-action">
              <button
                className="btn btn-error"
                onClick={handleDelete}
                disabled={deleting}
              >
                {deleting ? "Deleting..." : "Yes, Delete"}
              </button>
              <button
                className="btn btn-ghost"
                onClick={() => setDeleteRequest(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </dialog>
      )}

      <div className="mt-4 text-right">
        <button className="btn btn-link text-primary">
          View All My Requests
        </button>
      </div>
    </div>
  );
};

export default RecentDonationRequests;
