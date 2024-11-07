import React, { useState, useEffect } from "react";

const CreatePost = () => {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    const savedPosts = JSON.parse(localStorage.getItem("posts")) || [];
    setPosts(savedPosts);
  }, []);

  const handleSubmit = () => {
    if (title && body) {
      const newPost = { title, body };

      const updatedPosts = [newPost, ...posts];
      setPosts(updatedPosts);

      localStorage.setItem("posts", JSON.stringify(updatedPosts));

      setTitle("");
      setBody("");
    }
  };

  return (
    <div className="relative h-[80vh] flex flex-col items-center justify-center p-4 text-white text-center">
      {/* Form */}
      <form className="flex flex-col gap-4 w-full max-w-lg sm:w-[60vh]">
        <div className="text-[28px] sm:text-[36px] mt-[30rem] sm:mt-[10rem]">
          Create a mock post
        </div>
        <hr className="border-gray-300 w-full" />
        <input
          className="border rounded-sm p-2 w-full"
          type="text"
          name="title"
          id="title"
          placeholder="Your title goes here"
          value={title}
          required
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="border rounded-sm p-2 w-full h-32 resize-none"
          name="body"
          id="body"
          placeholder="Content of the post.."
          value={body}
          required
          onChange={(e) => setBody(e.target.value)}
        />
        <button
          type="button"
          className="border rounded-sm p-2 hover:scale-105 transition-all hover:bg-[#685b55] text-white"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </form>

      <div className="w-full max-w-lg sm:w-[60vh] mt-8 grid gap-4">
        {posts.map((post, index) => (
          <div
            key={index}
            className="border rounded-lg p-4 hover:bg-[#685b55] hover:scale-105 transition-all overflow-hidden"
          >
            <div className="text-lg sm:text-xl font-semibold mb-2 break-words">
              {post?.title}
            </div>
            <div className="text-left text-gray-200 break-words">
              {post?.body}
            </div>
            <div className="text-right">- Unknown</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CreatePost;
