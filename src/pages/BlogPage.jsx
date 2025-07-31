import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import useAxiosPublic from "../hooks/axiosPublic";

const BlogsPage = () => {
  const axiosInstance = useAxiosPublic();

  const {
    data: blogs = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["publishedBlogs"],
    queryFn: async () => {
      const res = await axiosInstance.get("/published-blogs");
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center mt-16">
        <span className="loading loading-dots loading-lg text-primary"></span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center mt-16 text-error">
        Failed to load blogs: {error.message}
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-center">Latest Blogs</h2>
      {blogs.length === 0 ? (
        <p className="text-center text-gray-500">
          No published blogs available.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="card bg-base-100 shadow-xl border border-base-200"
            >
              <figure>
                <img
                  src={blog.thumbnail}
                  alt={blog.title}
                  className="w-full h-48 object-cover"
                />
              </figure>
              <div className="card-body">
                <h3 className="card-title text-xl line-clamp-2">
                  {blog.title}
                </h3>

                <div className="mt-4">
                  <Link
                    to={`/blogs/${blog._id}`}
                    className="btn btn-primary btn-sm"
                  >
                    Read More
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogsPage;
