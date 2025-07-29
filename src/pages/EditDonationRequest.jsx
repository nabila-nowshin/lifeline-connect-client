import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useParams, useNavigate } from "react-router";
import districtsData from "../assets/data/districts.json";
import upazilasData from "../assets/data/upazilas.json";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const EditDonationRequest = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [filteredUpazilas, setFilteredUpazilas] = useState([]);

  const { data: requestData, isLoading } = useQuery({
    queryKey: ["donation-request", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/donation-requests/${id}`);
      return res.data;
    },
  });

  const [formData, setFormData] = useState(null);

  useEffect(() => {
    setDistricts(districtsData);
    setUpazilas(upazilasData);
  }, []);

  useEffect(() => {
    if (requestData) setFormData({ ...requestData });
  }, [requestData]);

  useEffect(() => {
    if (formData?.recipientDistrict) {
      setFilteredUpazilas(
        upazilas.filter((u) => u.district_id === formData.recipientDistrict)
      );
    } else {
      setFilteredUpazilas([]);
    }
  }, [formData?.recipientDistrict, upazilas]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const mutation = useMutation({
    mutationFn: async (updatedData) => {
      return await axiosSecure.patch(`/donation-requests/${id}`, updatedData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["donation-request", id]);
      Swal.fire(
        "Updated!",
        "Donation request updated successfully.",
        "success"
      );
      navigate("/dashboard/my-donation-requests");
    },
    onError: (err) => {
      Swal.fire("Error", err.message || "Failed to update request", "error");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData) return;
    mutation.mutate(formData);
  };

  if (isLoading || !formData) return <p className="text-center">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-md shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-6 text-primary">
        Edit Donation Request
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold mb-1">Recipient Name</label>
            <input
              name="recipientName"
              value={formData.recipientName}
              onChange={handleChange}
              required
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">
              Recipient District
            </label>
            <select
              name="recipientDistrict"
              value={formData.recipientDistrict}
              onChange={handleChange}
              className="select select-bordered w-full"
            >
              <option value="">Select District</option>
              {districts.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-semibold mb-1">
              Recipient Upazila
            </label>
            <select
              name="recipientUpazila"
              value={formData.recipientUpazila}
              onChange={handleChange}
              className="select select-bordered w-full"
            >
              <option value="">Select Upazila</option>
              {filteredUpazilas.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-semibold mb-1">Hospital Name</label>
            <input
              name="hospitalName"
              value={formData.hospitalName}
              onChange={handleChange}
              required
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Full Address</label>
            <input
              name="fullAddress"
              value={formData.fullAddress}
              onChange={handleChange}
              required
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Blood Group</label>
            <select
              name="bloodGroup"
              value={formData.bloodGroup}
              onChange={handleChange}
              required
              className="select select-bordered w-full"
            >
              <option value="">Select Blood Group</option>
              {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((bg) => (
                <option key={bg} value={bg}>
                  {bg}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-semibold mb-1">Donation Date</label>
            <input
              type="date"
              name="donationDate"
              value={formData.donationDate}
              onChange={handleChange}
              required
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Donation Time</label>
            <input
              type="time"
              name="donationTime"
              value={formData.donationTime}
              onChange={handleChange}
              required
              className="input input-bordered w-full"
            />
          </div>
        </div>

        <div>
          <label className="block font-semibold mb-1">Request Message</label>
          <textarea
            name="requestMessage"
            value={formData.requestMessage}
            onChange={handleChange}
            rows={4}
            className="textarea textarea-bordered w-full"
          ></textarea>
        </div>

        <button
          type="submit"
          className={`btn btn-primary w-full ${
            mutation.isLoading ? "loading" : ""
          }`}
          disabled={mutation.isLoading}
        >
          Update Request
        </button>
      </form>
    </div>
  );
};

export default EditDonationRequest;
