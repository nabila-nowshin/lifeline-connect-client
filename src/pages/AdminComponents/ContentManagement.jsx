import React, { useState } from "react";
import { Link } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useRole from "../../hooks/useRoles";
import { useQuery } from "@tanstack/react-query";

const limit = 6;

const ContentManagement = () => {
  const [filter, setFilter] = useState("all");
  const [page, setPage] = useState(1);
  const skip = (page - 1) * limit;

  const axiosSecure = useAxiosSecure();
  const { role } = useRole();

  const {
    data: response = { blogs: [], total: 0 },
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["blogs", filter, page],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/blogs?status=${filter}&skip=${skip}&limit=${limit}`
      );
      return res.data;
    },
  });

  const blogs = response.blogs;
  const totalPages = Math.ceil(response.total / limit);

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      await axiosSecure.delete(`/blogs/${id}`);
      refetch();
      Swal.fire("Deleted!", "Blog has been deleted.", "success");
    }
  };

  const handleStatusToggle = async (id, currentStatus) => {
    const newStatus = currentStatus === "draft" ? "published" : "draft";
    await axiosSecure.patch(`/blogs/${id}/status`, { status: newStatus });
    refetch();
    Swal.fire(
      `Blog ${newStatus === "published" ? "Published" : "Unpublished"}!`,
      "",
      "success"
    );
  };

  return (
    <div className="p-4 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Content Management</h2>
        <Link to="/dashboard/content-management/add-blog">
          <button className="btn btn-primary">Add Blog</button>
        </Link>
      </div>

      <div className="flex justify-end">
        <select
          className="select select-bordered w-48"
          value={filter}
          onChange={(e) => {
            setFilter(e.target.value);
            setPage(1); // reset page when filter changes
          }}
        >
          <option value="all">All</option>
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
      </div>

      {isLoading ? (
        <p>Loading blogs...</p>
      ) : blogs.length > 0 ? (
        <>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {blogs.map((blog) => (
              <div
                key={blog._id}
                className="card bg-base-100 shadow-md border border-gray-200"
              >
                <figure>
                  <img
                    src={blog.thumbnail}
                    alt={blog.title}
                    className="h-48 w-full object-cover"
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{blog.title}</h2>
                  <p dangerouslySetInnerHTML={{ __html: blog.content }}></p>
                  <div className="flex items-center justify-between mt-4">
                    <span
                      className={`badge px-3 py-1 rounded-full ${
                        blog.status === "published"
                          ? "badge-success"
                          : "badge-warning"
                      }`}
                    >
                      {blog.status}
                    </span>

                    {role === "admin" && (
                      <div className="flex gap-2">
                        <button
                          className={`btn btn-sm btn-outline ${
                            blog.status === "draft"
                              ? "btn-success"
                              : "btn-warning"
                          }`}
                          onClick={() =>
                            handleStatusToggle(blog._id, blog.status)
                          }
                        >
                          {blog.status === "draft" ? "Publish" : "Unpublish"}
                        </button>

                        <button
                          className="btn btn-sm btn-error btn-outline"
                          onClick={() => handleDelete(blog._id)}
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-6 gap-2">
            <button
              className="btn btn-sm"
              disabled={page === 1}
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            >
              Prev
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`btn btn-sm ${
                  i + 1 === page ? "btn-primary" : "btn-outline"
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              className="btn btn-sm"
              disabled={page === totalPages}
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            >
              Next
            </button>
          </div>
        </>
      ) : (
        <p className="text-center">No blogs found.</p>
      )}
    </div>
  );
};

export default ContentManagement;
