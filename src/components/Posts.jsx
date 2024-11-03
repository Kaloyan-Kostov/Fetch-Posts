import { useEffect, useState } from "react";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const FETCH_URL = "https://jsonplaceholder.typicode.com/";

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${FETCH_URL}/posts`);
        const postData = await response.json();
        setPosts(postData);
      } catch (e) {
        console.log("Error", e);
      }
    };
    fetchPosts();
  }, []);
  return (
    <div>
      <h1 className="text-left mb-6">Posts</h1>
      <div>
        {posts.map((post) => {
          return (
            <div
              id={post.id}
              className="mb-2 border rounded-[8px] max-w-64 py-4"
            >
              {post.title}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Posts;
