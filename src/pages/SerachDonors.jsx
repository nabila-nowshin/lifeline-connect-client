import { useState } from "react";
import districtsData from "../assets/data/districts.json";
import upazilasData from "../assets/data/upazilas.json";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../hooks/axiosPublic";

const SearchDonor = () => {
  const axiosPublic = useAxiosPublic();

  const [filters, setFilters] = useState({
    bloodGroup: "",
    district: "",
    upazila: "",
  });

  const [searchParams, setSearchParams] = useState(null);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchParams(filters); // Trigger query with current filters
  };

  const { data: donors = [], isLoading } = useQuery({
    queryKey: ["searchDonors", searchParams],
    queryFn: async () => {
      const res = await axiosPublic.get("/search-users", {
        params: searchParams,
      });
      return res.data;
    },
    enabled: !!searchParams, // Only run query after searchParams is set
  });

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-6">Search Donors</h2>

      <form
        onSubmit={handleSearch}
        className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
      >
        <select name="bloodGroup" onChange={handleChange} className="select">
          <option value="">Select Blood Group</option>
          {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((bg) => (
            <option key={bg} value={bg}>
              {bg}
            </option>
          ))}
        </select>

        <select name="district" onChange={handleChange} className="select">
          <option value="">Select District</option>
          {districtsData.map((d) => (
            <option key={d.id} value={d.id}>
              {d.name}
            </option>
          ))}
        </select>

        <select name="upazila" onChange={handleChange} className="select">
          <option value="">Select Upazila</option>
          {upazilasData
            .filter((u) => u.district_id === filters.district)
            .map((u) => (
              <option key={u.id} value={u.id}>
                {u.name}
              </option>
            ))}
        </select>

        <button
          type="submit"
          className="btn btn-primary col-span-1 md:col-span-3"
        >
          Search
        </button>
      </form>

      {isLoading ? (
        <p className="text-center">Loading...</p>
      ) : searchParams && donors.length === 0 ? (
        <p className="text-center text-gray-500">No donors found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {donors.map((donor) => (
            <div key={donor._id} className="card bg-base-100 shadow-xl p-4">
              <img
                src={
                  donor.photoURL || "https://i.ibb.co/G9DC8S0/default-user.png"
                }
                alt={donor.displayName}
                className="w-full h-40 object-cover rounded-xl mb-3"
              />
              <h3 className="text-xl font-semibold">{donor.displayName}</h3>
              <p className="text-sm text-primary">{donor.bloodGroup}</p>
              <p className="text-sm text-gray-500">
                District:
                {districtsData.find((u) => u.id === donor.district).name},
                Upazila:
                {upazilasData.find((u) => u.id === donor.upazila).name}
              </p>
              <p className="text-sm text-gray-500">Email: {donor.email}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchDonor;
