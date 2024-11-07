import React, { useEffect, useState } from "react";
import { postRequest } from "../../helpers/dataFetcher";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [newPosts, setNewPosts] = useState([]);

  useEffect(() => {
    const storedPosts = JSON.parse(localStorage.getItem("posts")) || [];
    setNewPosts(storedPosts);
  }, []);

  useEffect(() => {
    if (newPosts.length > 0) {
      localStorage.setItem("posts", JSON.stringify(newPosts));
      console.log(
        "POST request fulfilled\n",
        `Title: ${title}\n`,
        `Body: ${body}\n`,
        newPosts
      );
    }
  }, [newPosts]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatusMessage("");

    if (!title || !body) {
      setStatusMessage("Please fill in both the title and body.");
      return;
    }

    try {
      const newPost = await postRequest({ title, body, userId: 10 });
      if (newPost) {
        setNewPosts((prevPosts) => [newPost, ...prevPosts]);
        setStatusMessage("Post created successfully!");
        setTitle("");
        setBody("");
      }
    } catch (error) {
      setStatusMessage("Error creating post. Please try again.");
    }
  };

  return (
    <div className="relative grid justify-center items-center border text-white text-center min-h-screen">
      <form
        className="flex flex-col gap-4 w-full max-w-lg sm:w-[70%] md:w-[80%] lg:w-[100%] p-4"
        onSubmit={handleSubmit}
      >
        <div className="text-[28px] sm:text-[36px] mb-4">
          Create a mock post
        </div>
        <hr className="border-gray-500" />

        <input
          className="border rounded-sm p-3 w-full text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          name="title"
          id="title"
          placeholder="Your title goes here"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="border rounded-sm p-3 w-full h-32 resize-none text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          name="body"
          id="body"
          placeholder="Content of the post"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />

        <button
          type="submit"
          className="border rounded-sm p-3 hover:scale-105 transition-all"
        >
          Submit
        </button>

        <p
          className={`mt-2 ${
            statusMessage.includes("Please") ? "text-red-500" : "text-green-500"
          }`}
        >
          {statusMessage}
        </p>

        {newPosts.length > 0 && (
          <div className="mt-6 flex flex-col gap-4">
            {newPosts.map((post, index) => (
              <div
                key={index}
                className="border rounded-lg p-4 hover:bg-[#685b55] hover:scale-105 transition-all"
              >
                <div className="text-xl mb-2">{post?.title}</div>
                <div className="text-left text-lg">{post?.body}</div>
                <div className="text-right text-sm mt-5">- Unknown</div>
              </div>
            ))}
          </div>
        )}
      </form>
    </div>
  );
};

export default CreatePost;
