import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import useAxiosSecure from "../hooks/useAxiosSecure";
import districtsData from "../assets/data/districts.json";
import upazilasData from "../assets/data/upazilas.json";

const DonationRequestDetails = () => {
  const { id } = useParams(); // Get request ID from URL
  const axiosSecure = useAxiosSecure();

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

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow mt-6">
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
      <Link to="/dashboard" className="btn btn-primary mt-4">
        Back to Dashboard
      </Link>
    </div>
  );
};

export default DonationRequestDetails;
