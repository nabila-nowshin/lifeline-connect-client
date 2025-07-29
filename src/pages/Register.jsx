import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router";
import Swal from "sweetalert2";

// Import your JSON or fetch it
import districtsData from "../assets/data/districts.json";
import upazilasData from "../assets/data/upazilas.json";
import useAuth from "../hooks/useAuth";

const IMAGEBB_API_KEY = "62eb909b082b3efc877b94928da6a4e7";

const Register = () => {
  const navigate = useNavigate();
  const { createUser, updateUserProfile, setUser } = useAuth();

  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [filteredUpazilas, setFilteredUpazilas] = useState([]);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
    avatarFile: null,
    bloodGroup: "",
    district: "",
    upazila: "",
  });

  useEffect(() => {
    setDistricts(districtsData);
    setUpazilas(upazilasData);
  }, []);

  useEffect(() => {
    if (formData.district) {
      setFilteredUpazilas(
        upazilas.filter((u) => u.district_id === formData.district)
      );
    } else {
      setFilteredUpazilas([]);
    }
    setFormData((prev) => ({ ...prev, upazila: "" }));
  }, [formData.district, upazilas]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "avatarFile") {
      setFormData({ ...formData, avatarFile: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const validatePassword = (password) => {
    const uppercase = /[A-Z]/.test(password);
    const lowercase = /[a-z]/.test(password);
    const minLength = password.length >= 6;
    return uppercase && lowercase && minLength;
  };

  const uploadAvatarToImageBB = async (file) => {
    if (!file) return null;
    const formData = new FormData();
    formData.append("image", file);
    const res = await fetch(
      `https://api.imgbb.com/1/upload?key=${IMAGEBB_API_KEY}`,
      {
        method: "POST",
        body: formData,
      }
    );
    const data = await res.json();
    if (data.success) return data.data.display_url;
    else throw new Error("Failed to upload image");
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const {
      name,
      email,
      password,
      confirm_password,
      avatarFile,
      bloodGroup,
      district,
      upazila,
    } = formData;

    if (!validatePassword(password)) {
      let msg = "<strong>Password must:</strong><ul style='text-align:left'>";
      if (!/[A-Z]/.test(password))
        msg += "<li>Include at least one UPPERCASE letter</li>";
      if (!/[a-z]/.test(password))
        msg += "<li>Include at least one lowercase letter</li>";
      if (password.length < 6) msg += "<li>Be at least 6 characters long</li>";
      msg += "</ul>";
      Swal.fire({ icon: "error", title: "Invalid Password", html: msg });
      return;
    }

    if (password !== confirm_password) {
      Swal.fire({
        icon: "error",
        title: "Password Mismatch",
        text: "Confirm password does not match.",
      });
      return;
    }

    if (!bloodGroup || !district || !upazila) {
      Swal.fire({
        icon: "error",
        title: "Missing Fields",
        text: "Please select blood group, district, and upazila.",
      });
      return;
    }

    setLoading(true);
    try {
      const avatarUrl = avatarFile
        ? await uploadAvatarToImageBB(avatarFile)
        : "";

      await createUser(email, password);
      await updateUserProfile({ displayName: name, photoURL: avatarUrl });

      // Set additional user info like bloodGroup, district, upazila, role="donor", status="active"
      // Usually you store this in your backend DB or Firebase Firestore
      // For now, just simulate it with setUser or a context update
      setUser({
        email,
        displayName: name,
        photoURL: avatarUrl,
        bloodGroup,
        district,
        upazila,
        role: "donor",
        status: "active",
      });

      Swal.fire({
        icon: "success",
        title: "Registration Successful!",
        text: "Redirecting to Home...",
        timer: 2000,
        showConfirmButton: false,
      });

      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: err.message,
      });
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center px-4">
      <form
        onSubmit={onSubmitHandler}
        className="max-w-md w-full bg-white/30 backdrop-blur-md border border-white/50 rounded-xl shadow-xl p-8"
      >
        <h2 className="text-3xl font-bold text-center text-primary mb-6">
          Create Your Account
        </h2>

        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="input input-bordered w-full mb-4"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="input input-bordered w-full mb-4"
        />

        <input
          type="password"
          name="password"
          placeholder="Password (min 6 chars, 1 uppercase, 1 lowercase)"
          value={formData.password}
          onChange={handleChange}
          required
          className="input input-bordered w-full mb-4"
        />

        <input
          type="password"
          name="confirm_password"
          placeholder="Confirm Password"
          value={formData.confirm_password}
          onChange={handleChange}
          required
          className="input input-bordered w-full mb-4"
        />

        <label className="block mb-2 font-semibold text-base-content">
          Upload Avatar (optional):
        </label>
        <input
          type="file"
          name="avatarFile"
          accept="image/*"
          onChange={handleChange}
          className="mb-4"
        />

        <label className="block mb-1 font-semibold text-base-content">
          Blood Group:
        </label>
        <select
          name="bloodGroup"
          value={formData.bloodGroup}
          onChange={handleChange}
          required
          className="select select-bordered w-full mb-4"
        >
          <option value="">Select Blood Group</option>
          {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((bg) => (
            <option key={bg} value={bg}>
              {bg}
            </option>
          ))}
        </select>

        <label className="block mb-1 font-semibold text-base-content">
          District:
        </label>
        <select
          name="district"
          value={formData.district}
          onChange={handleChange}
          required
          className="select select-bordered w-full mb-4"
        >
          <option value="">Select District</option>
          {districts.map((d) => (
            <option key={d.id} value={d.id}>
              {d.name}
            </option>
          ))}
        </select>

        <label className="block mb-1 font-semibold text-base-content">
          Upazila:
        </label>
        <select
          name="upazila"
          value={formData.upazila}
          onChange={handleChange}
          required
          disabled={!formData.district}
          className="select select-bordered w-full mb-6"
        >
          <option value="">Select Upazila</option>
          {filteredUpazilas.map((u) => (
            <option key={u.id} value={u.id}>
              {u.name}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className={`btn btn-primary w-full ${loading ? "loading" : ""}`}
          disabled={loading}
        >
          Register
        </button>

        <p className="mt-6 text-center text-sm text-base-content">
          Already have an account?{" "}
          <Link to="/login" className="text-primary hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
