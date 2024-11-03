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
      <h1>Posts</h1>
      {posts.map((post) => {
        return (
          <div id={post.id}>
            {post.title}
            <br />
            <br />
          </div>
        );
      })}
    </div>
  );
};

export default Posts;
