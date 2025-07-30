import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../provider/AuthContext";
import districtsData from "../assets/data/districts.json";
import upazilasData from "../assets/data/upazilas.json";
import Swal from "sweetalert2";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const CreateDonationRequest = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [filteredUpazilas, setFilteredUpazilas] = useState([]);

  const [formData, setFormData] = useState({
    requesterName: user?.displayName || "",
    requesterEmail: user?.email || "",
    recipientName: "",
    recipientDistrict: "",
    recipientUpazila: "",
    hospitalName: "",
    fullAddress: "",
    bloodGroup: "",
    donationDate: "",
    donationTime: "",
    requestMessage: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setDistricts(districtsData);
    setUpazilas(upazilasData);
  }, []);

  useEffect(() => {
    if (formData.recipientDistrict) {
      setFilteredUpazilas(
        upazilas.filter((u) => u.district_id === formData.recipientDistrict)
      );
    } else {
      setFilteredUpazilas([]);
    }
    setFormData((prev) => ({ ...prev, recipientUpazila: "" }));
  }, [formData.recipientDistrict, upazilas]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  //get user status for users
  let { data: userStatus = {} } = useQuery({
    queryKey: ["status", user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data.status;
    },
  });

  //   console.log(userStatus);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // console.log(user.status);

    if (userStatus !== "active") {
      Swal.fire({
        icon: "error",
        title: "Access Denied",
        text: "Your account is blocked and cannot create donation requests.",
      });
      return;
    }
    setLoading(true);

    // Basic validation (can be improved)
    const requiredFields = [
      "recipientName",
      "recipientDistrict",
      "recipientUpazila",
      "hospitalName",
      "fullAddress",
      "bloodGroup",
      "donationDate",
      "donationTime",
      "requestMessage",
    ];

    for (const field of requiredFields) {
      if (!formData[field]) {
        Swal.fire({
          icon: "error",
          title: "Missing Field",
          text: `Please fill the "${field.replace(/([A-Z])/g, " $1")}" field.`,
        });
        setLoading(false);
        return;
      }
    }

    try {
      // Prepare request payload with status default "pending"
      const payload = {
        requesterName: formData.requesterName,
        requesterEmail: formData.requesterEmail,
        recipientName: formData.recipientName,
        recipientDistrict: formData.recipientDistrict,
        recipientUpazila: formData.recipientUpazila,
        hospitalName: formData.hospitalName,
        fullAddress: formData.fullAddress,
        bloodGroup: formData.bloodGroup,
        donationDate: formData.donationDate,
        donationTime: formData.donationTime,
        requestMessage: formData.requestMessage,
        status: "pending",
      };

      await axiosSecure.post("/donation-requests", payload);

      Swal.fire({
        icon: "success",
        title: "Request Submitted",
        text: "Your donation request has been created successfully.",
      });

      setFormData((prev) => ({
        ...prev,
        recipientName: "",
        recipientDistrict: "",
        recipientUpazila: "",
        hospitalName: "",
        fullAddress: "",
        bloodGroup: "",
        donationDate: "",
        donationTime: "",
        requestMessage: "",
      }));
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: err.message || "Something went wrong!",
      });
    }

    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-md shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-6 text-primary">
        Create Donation Request
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold mb-1">Requester Name</label>
          <input
            type="text"
            name="requesterName"
            value={formData.requesterName}
            readOnly
            className="input input-bordered w-full bg-gray-100 cursor-not-allowed"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Requester Email</label>
          <input
            type="email"
            name="requesterEmail"
            value={formData.requesterEmail}
            readOnly
            className="input input-bordered w-full bg-gray-100 cursor-not-allowed"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Recipient Name</label>
          <input
            type="text"
            name="recipientName"
            value={formData.recipientName}
            onChange={handleChange}
            required
            className="input input-bordered w-full"
            placeholder="Recipient full name"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Recipient District</label>
          <select
            name="recipientDistrict"
            value={formData.recipientDistrict}
            onChange={handleChange}
            required
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
          <label className="block font-semibold mb-1">Recipient Upazila</label>
          <select
            name="recipientUpazila"
            value={formData.recipientUpazila}
            onChange={handleChange}
            required
            disabled={!formData.recipientDistrict}
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
            type="text"
            name="hospitalName"
            value={formData.hospitalName}
            onChange={handleChange}
            required
            placeholder="e.g. Dhaka Medical College Hospital"
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Full Address</label>
          <input
            type="text"
            name="fullAddress"
            value={formData.fullAddress}
            onChange={handleChange}
            required
            placeholder="e.g. Zahir Raihan Rd, Dhaka"
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

        <div>
          <label className="block font-semibold mb-1">Request Message</label>
          <textarea
            name="requestMessage"
            value={formData.requestMessage}
            onChange={handleChange}
            required
            rows={4}
            placeholder="Explain why you are requesting blood"
            className="textarea textarea-bordered w-full"
          ></textarea>
        </div>

        <button
          type="submit"
          className={`btn btn-primary w-full ${loading ? "loading" : ""}`}
          disabled={loading}
        >
          Submit Request
        </button>
      </form>
    </div>
  );
};

export default CreateDonationRequest;
