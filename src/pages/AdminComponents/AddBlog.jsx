import React, { useRef, useState } from "react";
import JoditEditor from "jodit-react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AddBlog = () => {
  const editor = useRef(null);
  const [title, setTitle] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [content, setContent] = useState("");
  const axiosSecure = useAxiosSecure();

  const handleImageUpload = async () => {
    const formData = new FormData();
    formData.append("image", thumbnail);
    const res = await fetch(
      `https://api.imgbb.com/1/upload?key=62eb909b082b3efc877b94928da6a4e7`,
      {
        method: "POST",
        body: formData,
      }
    );
    const data = await res.json();
    return data.data.url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const imgUrl = await handleImageUpload();
      const blogData = { title, thumbnail: imgUrl, content };
      const res = await axiosSecure.post("/blogs", blogData);
      if (res.data.insertedId) {
        Swal.fire("Success!", "Blog created as draft!", "success");
        setTitle("");
        setThumbnail(null);
        setContent("");
      }
    } catch (error) {
      Swal.fire("Error!", "Something went wrong", "error");
    }
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Add Blog</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Blog Title"
          className="input input-bordered w-full"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <input
          type="file"
          accept="image/*"
          className="file-input file-input-bordered w-full"
          onChange={(e) => setThumbnail(e.target.files[0])}
          required
        />

        <JoditEditor
          ref={editor}
          value={content}
          onChange={(newContent) => setContent(newContent)}
        />

        <button type="submit" className="btn btn-primary w-full">
          Create Blog
        </button>
      </form>
    </div>
  );
};

export default AddBlog;
