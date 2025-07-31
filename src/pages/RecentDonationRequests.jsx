import { useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import districtsData from "../assets/data/districts.json";
import upazilasData from "../assets/data/upazilas.json";
import { NavLink } from "react-router";
import { AuthContext } from "../provider/AuthContext";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useRole from "../hooks/useRoles";
import Swal from "sweetalert2";

const RecentDonationRequests = () => {
  const { user, loading } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const [deleteId, setDeleteId] = useState(null);
  const { role } = useRole();
  // console.log(role);

  const handleDelete = async () => {
    try {
      const res = await axiosSecure.delete(`/donation-requests/${deleteId}`);
      if (res.data.deletedCount > 0) {
        refetch();
        document.getElementById("delete_modal").close();
      }
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const [editingRequest, setEditingRequest] = useState(null);

  //   get all donation req info
  const {
    data: response = { donations: [], total: 0 },
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["donations"],
    queryFn: async () => {
      if (!user?.email || !role) {
        return { donations: [], total: 0 };
      }
      const res = await axiosSecure.get(
        `/all-donations?email=${user.email}&role=${role}`
      );
      return res.data;
    },

    enabled: !loading && !!user?.email,
  });

  //   console.log("response", response.total);
  //   console.log("response", response.donations);
  const requests = response.donations;

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const updatedRequest = {
      recipientName: form.recipientName.value,
      donationDate: form.donationDate.value,
      donationTime: form.donationTime.value,
      bloodGroup: form.bloodGroup.value,
    };

    try {
      const res = await axiosSecure.patch(
        `/donation-requests/${editingRequest._id}`,
        updatedRequest
      );
      if (res.data.modifiedCount > 0) {
        refetch();
        setEditingRequest(null); // close modal
      }
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await axiosSecure.patch(`/donations/update-status/${id}`, {
        status: newStatus,
      });

      if (res.data.modifiedCount > 0) {
        Swal.fire({
          icon: "success",
          title: `Marked as ${
            newStatus.charAt(0).toUpperCase() + newStatus.slice(1)
          }`,
          timer: 1500,
          showConfirmButton: false,
        });
        refetch(); // refetch data to update UI (if using react-query)
      } else {
        Swal.fire({
          icon: "info",
          title: "No update",
          text: "Status might already be updated.",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Failed to update status. Try again later.",
      });
      console.error(error);
    }
  };

  if (isLoading) return <p className="text-center py-4">Loading...</p>;

  return (
    <div>
      {requests.length !== 0 && (
        <div className="bg-white rounded-xl p-6 shadow mt-6">
          <h2 className="text-xl font-bold mb-4">
            My Recent Donation Requests
          </h2>
          <div className="overflow-x-auto">
            <>
              <table className="table">
                <thead>
                  <tr>
                    <th>Recipient</th>
                    <th>Location</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Blood Group</th>
                    <th>Status</th>
                    <th>Donor Info</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {requests.map((req) => (
                    <tr key={req._id}>
                      <td>{req.recipientName}</td>
                      <td>
                        {districtsData.find(
                          (d) => d.id === req.recipientDistrict
                        )?.name || ""}
                        ,{" "}
                        {upazilasData.find((u) => u.id === req.recipientUpazila)
                          ?.name || ""}
                      </td>
                      <td>{req.donationDate}</td>
                      <td>{req.donationTime}</td>
                      <td>{req.bloodGroup}</td>
                      <td className="capitalize">{req.status}</td>
                      {req.status === "inprogress" ? (
                        <td className="capitalize">
                          {req.donorName},{req?.donorEmail}
                        </td>
                      ) : (
                        <td></td>
                      )}

                      <td className="flex gap-2">
                        {req.status === "inprogress" && (
                          <>
                            <button
                              className="btn btn-success btn-xs"
                              onClick={() =>
                                handleStatusChange(req._id, "done")
                              }
                            >
                              Done
                            </button>
                            <button
                              className="btn btn-error btn-xs"
                              onClick={() =>
                                handleStatusChange(req._id, "canceled")
                              }
                            >
                              Cancel
                            </button>
                          </>
                        )}

                        <NavLink
                          className="btn btn-info btn-xs"
                          to={`/dashboard/donation-request/${req._id}`}
                        >
                          View
                        </NavLink>
                        <button
                          className="btn btn-warning btn-xs"
                          onClick={() => setEditingRequest(req)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-outline btn-xs"
                          onClick={() => {
                            setDeleteId(req._id);
                            document.getElementById("delete_modal").showModal();
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          </div>
          {/* ✅ Modal rendered once, conditionally shown */}
          {editingRequest && (
            <dialog id="edit_modal" className="modal" open>
              <div className="modal-box">
                <h3 className="font-bold text-lg mb-4">
                  Edit Donation Request
                </h3>

                <form
                  onSubmit={handleEditSubmit}
                  className="grid grid-cols-1 gap-3"
                  method="dialog"
                >
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    name="recipientName"
                    defaultValue={editingRequest.recipientName}
                    required
                  />
                  <input
                    type="date"
                    className="input input-bordered w-full"
                    name="donationDate"
                    defaultValue={editingRequest.donationDate}
                    required
                  />
                  <input
                    type="time"
                    className="input input-bordered w-full"
                    name="donationTime"
                    defaultValue={editingRequest.donationTime}
                    required
                  />
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    name="bloodGroup"
                    defaultValue={editingRequest.bloodGroup}
                    required
                  />

                  <div className="modal-action mt-4">
                    <button type="submit" className="btn btn-primary">
                      Update
                    </button>
                    <button
                      type="button"
                      className="btn"
                      onClick={() => setEditingRequest(null)}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </dialog>
          )}
          {/* Delete Confirmation Modal */}
          <dialog id="delete_modal" className="modal">
            <div className="modal-box">
              <h3 className="font-bold text-lg text-error">Confirm Delete</h3>
              <p className="py-4">
                Are you sure you want to delete this request? This action cannot
                be undone.
              </p>
              <div className="modal-action">
                <form method="dialog">
                  <button className="btn btn-outline">Cancel</button>
                </form>
                <button className="btn btn-error" onClick={handleDelete}>
                  Yes, Delete
                </button>
              </div>
            </div>
          </dialog>
          <div className="mt-4 text-right">
            <NavLink
              to="/dashboard/my-donation-requests"
              className="btn btn-link text-primary"
            >
              View All My Requests
            </NavLink>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecentDonationRequests;
