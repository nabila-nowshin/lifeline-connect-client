import React, { use, useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import useAxiosSecure from "../hooks/useAxiosSecure";
import districtsData from "../assets/data/districts.json";
import upazilasData from "../assets/data/upazilas.json";
import { AuthContext } from "../provider/AuthContext";
import Swal from "sweetalert2";

const DonationRequestDetails = () => {
  const { id } = useParams(); // Get request ID from URL
  const axiosSecure = useAxiosSecure();
  const { user } = use(AuthContext);

  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequest = async () => {
      try {
        const res = await axiosSecure.get(`/donation-requests/${id}`);
        setRequest(res.data);
      } catch (error) {
        console.error("Failed to fetch request:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRequest();
  }, [id, axiosSecure]);

  if (loading) return <p>Loading...</p>;
  if (!request) return <p>Request not found.</p>;

  const districtName =
    districtsData.find((d) => d.id === request.recipientDistrict)?.name || "";
  const upazilaName =
    upazilasData.find((u) => u.id === request.recipientUpazila)?.name || "";

  const handleSubmit = async (e) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to mark this donation as 'In Progress'?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update it!",
    });

    if (result.isConfirmed) {
      try {
        const res = await axiosSecure.patch(`/donations/update-status/${id}`, {
          status: "inprogress",
          donorName: user.displayName,
          donorEmail: user.email,
        });

        if (res.data.modifiedCount > 0) {
          Swal.fire({
            icon: "success",
            title: "Updated!",
            text: "Status changed to 'In Progress'.",
            timer: 1500,
            showConfirmButton: false,
          });
        } else {
          Swal.fire({
            icon: "info",
            title: "No Update",
            text: "Status might already be 'In Progress'.",
          });
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: "Something went wrong. Try again later.",
        });
        console.error("Status update error:", error);
      }
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-base-200 rounded-xl shadow mt-6">
      <h2 className="text-2xl font-bold mb-4">Donation Request Details</h2>
      <div className="mb-4">
        <strong>Requester Name:</strong> {request.requesterName}
      </div>
      <div className="mb-4">
        <strong>Requester Email:</strong> {request.requesterEmail}
      </div>
      <div className="mb-4">
        <strong>Recipient Name:</strong> {request.recipientName}
      </div>
      <div className="mb-4">
        <strong>Recipient District:</strong> {districtName}
      </div>
      <div className="mb-4">
        <strong>Recipient Upazila:</strong> {upazilaName}
      </div>
      <div className="mb-4">
        <strong>Hospital Name:</strong> {request.hospitalName}
      </div>
      <div className="mb-4">
        <strong>Full Address:</strong> {request.fullAddress}
      </div>
      <div className="mb-4">
        <strong>Blood Group:</strong> {request.bloodGroup}
      </div>
      <div className="mb-4">
        <strong>Donation Date:</strong> {request.donationDate}
      </div>
      <div className="mb-4">
        <strong>Donation Time:</strong> {request.donationTime}
      </div>
      <div className="mb-4">
        <strong>Request Message:</strong> {request.requestMessage}
      </div>
      <div className="mb-4">
        <strong>Status:</strong>{" "}
        <span className="capitalize">{request.status}</span>
      </div>

      {request.status === "pending" ? (
        <>
          {/* Open the modal using document.getElementById('ID').showModal() method */}
          <button
            className="btn"
            onClick={() => document.getElementById("my_modal_5").showModal()}
          >
            Donate
          </button>
          <dialog
            id="my_modal_5"
            className="modal modal-bottom sm:modal-middle"
          >
            <div className="modal-box">
              <h3 className="font-bold text-lg mb-4">Are You Sure?</h3>
              <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
                <label className="label">Donor Name</label>
                <input
                  type="text"
                  className="input"
                  defaultValue={user.displayName}
                  disabled
                />
                <label className="label">Donor Email</label>
                <input
                  type="text"
                  className="input"
                  defaultValue={user.email}
                  disabled
                />
              </fieldset>
              <div className="modal-action">
                <form method="dialog">
                  {/* if there is a button in form, it will close the modal */}
                  <button
                    className="btn"
                    onClick={() => {
                      handleSubmit();
                    }}
                  >
                    Confirm
                  </button>
                </form>
              </div>
            </div>
          </dialog>
        </>
      ) : (
        <Link className="btn btn-primary mt-4" to="/dashboard">
          Back to Dashboard
        </Link>
      )}
    </div>
  );
};

export default DonationRequestDetails;
