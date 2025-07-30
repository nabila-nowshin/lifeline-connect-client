import { useState } from "react";
import districts from "../assets/data/districts.json";
import upazilas from "../assets/data/upazilas.json";

import { FaSearch } from "react-icons/fa";
import useAxiosPublic from "../hooks/axiosPublic";

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const SearchDonors = () => {
  const axiosPublic = useAxiosPublic();
  const [district, setDistrict] = useState("");
  const [upazila, setUpazila] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosPublic.get(
        `/donors?bloodGroup=${bloodGroup}&district=${district}&upazila=${upazila}`
      );
      setResults(res.data);
    } catch (err) {
      console.error("Search failed", err);
    }
  };

  const filteredUpazilas = upazilas.filter(
    (item) => item.district_id === district
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-6 text-center">🔍 Search Donors</h2>

      <form
        onSubmit={handleSearch}
        className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end"
      >
        <div>
          <label className="label">Blood Group</label>
          <select
            className="select select-bordered w-full"
            value={bloodGroup}
            onChange={(e) => setBloodGroup(e.target.value)}
            required
          >
            <option value="">Select</option>
            {bloodGroups.map((group) => (
              <option key={group} value={group}>
                {group}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="label">District</label>
          <select
            className="select select-bordered w-full"
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            required
          >
            <option value="">Select</option>
            {districts.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="label">Upazila</label>
          <select
            className="select select-bordered w-full"
            value={upazila}
            onChange={(e) => setUpazila(e.target.value)}
            required
          >
            <option value="">Select</option>
            {filteredUpazilas.map((u) => (
              <option key={u.id} value={u.id}>
                {u.name}
              </option>
            ))}
          </select>
        </div>

        <button className="btn btn-primary w-full" type="submit">
          <FaSearch className="mr-2" /> Search
        </button>
      </form>

      {/* Results */}
      <div className="mt-10">
        {results.length > 0 ? (
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {results.map((donor) => (
              <div
                key={donor._id}
                className="p-4 rounded-lg border bg-base-100 shadow"
              >
                <h3 className="text-xl font-semibold">
                  {donor.name} ({donor.bloodGroup})
                </h3>
                <p>
                  {donor.districtName}, {donor.upazilaName}
                </p>
                <p>📞 {donor.phone}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 mt-8">
            No donors to show yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default SearchDonors;
