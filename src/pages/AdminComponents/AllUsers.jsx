import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { MoreVertical } from "lucide-react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 3;

  const {
    data: allUsers = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["allUsers", statusFilter, currentPage],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/all-users?status=${statusFilter}&page=${currentPage}&limit=${usersPerPage}`
      );
      return res.data;
    },
  });

  //   console.log(allUsers.users);

  const handleBlockUnblock = async (id, newStatus) => {
    const action = newStatus === "blocked" ? "Block" : "Unblock";
    const result = await Swal.fire({
      title: `Are you sure you want to ${action.toLowerCase()} this user?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: `Yes, ${action}`,
    });

    if (result.isConfirmed) {
      try {
        const res = await axiosSecure.patch(`/users/${id}/status`, {
          status: newStatus,
        });
        if (res.data.modifiedCount > 0) {
          Swal.fire(`${action}ed!`, `User is now ${newStatus}.`, "success");
          refetch();
        }
      } catch (err) {
        Swal.fire(
          "Error!",
          `Could not ${action.toLowerCase()} the user.`,
          "error"
        );
      }
    }
  };

  const handleMakeRole = async (id, role) => {
    const res = await axiosSecure.patch(`/users/${id}/role`, { role });
    if (res.data.modifiedCount > 0) {
      Swal.fire("Success", `User is now ${role}.`, "success");
      refetch();
    }
  };

  const totalUsers = allUsers.total || 0;
  const totalPages = Math.ceil(totalUsers / usersPerPage);
  const users = allUsers.users || [];

  return (
    <div className="px-4 md:px-10 py-8">
      <h2 className="text-2xl font-bold mb-6">All Users</h2>

      {/* Filter Tabs */}
      <div className="tabs tabs-boxed mb-4 w-fit">
        {["all", "active", "blocked"].map((status) => (
          <button
            key={status}
            className={`tab capitalize ${
              statusFilter === status && "tab-active"
            }`}
            onClick={() => setStatusFilter(status)}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Loading State */}
      {isLoading ? (
        <div className="text-center my-10">
          <span className="loading loading-bars loading-lg text-primary"></span>
        </div>
      ) : (
        <div className="overflow-x-auto shadow rounded-lg border border-base-300">
          <table className="table table-zebra">
            <thead className="bg-base-200">
              <tr>
                <th>#</th>
                <th>Avatar</th>
                <th>Email</th>
                <th>Name</th>
                <th>Role</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, idx) => (
                <tr key={user._id}>
                  <td>{(currentPage - 1) * usersPerPage + idx + 1}</td>
                  <td>
                    <div className="avatar">
                      <div className="w-10 rounded-full">
                        <img
                          src={user.photoURL || "https://i.pravatar.cc/40"}
                          alt="User"
                        />
                      </div>
                    </div>
                  </td>
                  <td>{user.email}</td>
                  <td>{user.displayName}</td>
                  <td>
                    <span className="badge capitalize badge-info">
                      {user.role}
                    </span>
                  </td>
                  <td>
                    <span
                      className={`badge capitalize ${
                        user.status === "active"
                          ? "badge-success"
                          : "badge-error"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td>
                    <div className="dropdown dropdown-end">
                      <button tabIndex={0} className="btn btn-sm btn-ghost">
                        <MoreVertical className="w-5 h-5" />
                      </button>
                      <ul
                        tabIndex={0}
                        className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-44"
                      >
                        {user.status === "active" ? (
                          <li>
                            <button
                              onClick={() =>
                                handleBlockUnblock(user._id, "blocked")
                              }
                            >
                              Block User
                            </button>
                          </li>
                        ) : (
                          <li>
                            <button
                              onClick={() =>
                                handleBlockUnblock(user._id, "active")
                              }
                            >
                              Unblock User
                            </button>
                          </li>
                        )}
                        {user.role !== "donor" && (
                          <li>
                            <button
                              onClick={() => handleMakeRole(user._id, "donor")}
                            >
                              Make Donor
                            </button>
                          </li>
                        )}
                        {user.role !== "volunteer" && (
                          <li>
                            <button
                              onClick={() =>
                                handleMakeRole(user._id, "volunteer")
                              }
                            >
                              Make Volunteer
                            </button>
                          </li>
                        )}
                        {user.role !== "admin" && (
                          <li>
                            <button
                              onClick={() => handleMakeRole(user._id, "admin")}
                            >
                              Make Admin
                            </button>
                          </li>
                        )}
                      </ul>
                    </div>
                  </td>
                </tr>
              ))}
              <tr>
                <td colSpan="7" className="py-15 bg-base-100"></td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      <div className="mt-6 flex justify-center">
        <div className="join">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              className={`join-item btn btn-sm ${
                currentPage === i + 1 && "btn-active"
              }`}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllUsers;
