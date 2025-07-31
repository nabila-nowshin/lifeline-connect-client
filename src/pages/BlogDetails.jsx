import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { Loader2 } from "lucide-react";
import useAxiosPublic from "../hooks/axiosPublic";

const BlogDetails = () => {
  const { id } = useParams();
  const axiosInstance = useAxiosPublic();

  const {
    data: blog,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["blog", id],
    queryFn: async () => {
      const res = await axiosInstance.get(`/published-blogs/${id}`);
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center py-10">
        <Loader2 className="animate-spin w-8 h-8 text-primary" />
      </div>
    );
  }

  if (isError || !blog) {
    return (
      <div className="text-center text-red-500 mt-10">
        Blog not found or unpublished.
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <img
        src={blog.thumbnail}
        alt={blog.title}
        className="w-full h-64 object-cover rounded-xl shadow-md mb-6"
      />
      <h1 className="text-3xl font-bold text-gray-800 mb-2">{blog.title}</h1>
      <div className="text-sm text-gray-500 mb-4">
        {format(new Date(blog.createdAt), "PPP")}
      </div>
      <div
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      ></div>
    </div>
  );
};

export default BlogDetails;
