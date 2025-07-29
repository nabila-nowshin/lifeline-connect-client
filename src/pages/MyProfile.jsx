import { useContext, useEffect, useState } from "react";

import { useQuery, useMutation } from "@tanstack/react-query";

import { toast } from "react-hot-toast";
import { FaEdit, FaSave } from "react-icons/fa";
import { AuthContext } from "../provider/AuthContext";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useAuth from "../hooks/useAuth";

const MyProfile = () => {
  const { user } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const axiosSecure = useAxiosSecure();
  const { loading } = useAuth();

  const { data: userData = {}, isPending } = useQuery({
    queryKey: ["userProfile", user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data;
    },
  });

  useEffect(() => {
    if (userData) {
      setFormData(userData);
    }
  }, [userData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const mutation = useMutation({
    mutationFn: async (updatedData) => {
      const res = await useAxiosSecure.patch(
        `/users/${user?.email}`,
        updatedData
      );
      return res.data;
    },
    onSuccess: () => {
      toast.success("Profile updated successfully");
      setIsEditing(false);
      refetch();
    },
    onError: () => toast.error("Failed to update profile"),
  });

  const handleSave = (e) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  if (loading) return <p>Loading profile...</p>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-base-200 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">My Profile</h2>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="btn btn-primary btn-sm flex items-center gap-1"
          >
            <FaEdit /> Edit
          </button>
        ) : (
          <button
            onClick={handleSave}
            className="btn btn-success btn-sm flex items-center gap-1"
          >
            <FaSave /> Save
          </button>
        )}
      </div>

      <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="label">Name</label>
          <input
            name="name"
            value={formData?.displayName || ""}
            onChange={handleInputChange}
            disabled={!isEditing}
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="label">Email</label>
          <input
            name="email"
            value={formData?.email || ""}
            disabled
            className="input input-bordered w-full bg-gray-100 cursor-not-allowed"
          />
        </div>

        <div>
          <label className="label">District</label>
          <input
            name="district"
            value={formData?.district || ""}
            onChange={handleInputChange}
            disabled={!isEditing}
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="label">Upazila</label>
          <input
            name="upazila"
            value={formData?.upazila || ""}
            onChange={handleInputChange}
            disabled={!isEditing}
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="label">Blood Group</label>
          <select
            name="bloodGroup"
            value={formData?.bloodGroup || ""}
            onChange={handleInputChange}
            disabled={!isEditing}
            className="select select-bordered w-full"
          >
            <option value="">Select</option>
            <option value="A+">A+</option>
            <option value="A−">A−</option>
            <option value="B+">B+</option>
            <option value="B−">B−</option>
            <option value="O+">O+</option>
            <option value="O−">O−</option>
            <option value="AB+">AB+</option>
            <option value="AB−">AB−</option>
          </select>
        </div>

        <div>
          <label className="label">Avatar URL</label>
          <input
            name="photo"
            value={formData?.photoURL || ""}
            onChange={handleInputChange}
            disabled={!isEditing}
            className="input input-bordered w-full"
          />
        </div>

        <div className="col-span-2 text-center border-red-600">
          {formData?.photoURL && (
            <img
              src={formData?.photoURL}
              alt="Avatar"
              className="w-24 h-24 rounded-full mx-auto mt-2 border-2 border-primary"
            />
          )}
        </div>
      </form>
    </div>
  );
};

export default MyProfile;
