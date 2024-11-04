import { useEffect, useState } from "react";
import { FETCH_URL } from "../../helpers/constants.js";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDisplayed, setIsDisplayed] = useState(false);
  const [isFiltered, setIsFiltered] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${FETCH_URL}/posts`);
      const postData = await response.json();
      // setPosts(postData);
      setPosts(postData.slice(-20));
    } catch (e) {
      console.log("Error", e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFilteredPosts = () => {
    setIsFiltered(!isFiltered);
  };

  const handleShowPosts = () => {
    setIsDisplayed(!isDisplayed);
  };

  if (isLoading) {
    return <div>currently loading..</div>;
  }

  return (
    <div>
      <div className="flex gap-4">
        <button
          onClick={handleFilteredPosts}
          className="rounded-sm border mb-5 p-1"
        >
          {isFiltered ? "Hide Filtered Posts" : "Filtered Posts"}
        </button>
        <button
          onClick={handleShowPosts}
          className="rounded-sm border mb-5 p-1"
        >
          {isDisplayed ? "Hide Posts" : "Show Posts"}
        </button>
      </div>
      {/* <div className="flex gap-8 flex-wrap">
        {isDisplayed &&
          posts.map((post) => {
            return (
              <div
                key={post.id}
                className="border rounded-[8px] max-w-prose w-auto p-2"
              >
                <div className="text-xl mb-2">{post.title}</div>
                <div className="text-left">{post.body}</div>
              </div>
            );
          })}
      </div> */}

      <div className="flex flex-col items-center gap-8">
        {isFiltered && (
          <h1 className="text-[36px]">Latest Posts filtered by userId 10</h1>
        )}
        {isFiltered && (
          <div className="flex justify-center gap-8 flex-wrap">
            {posts
              .filter((post) => post.userId === 10)
              .map((post) => (
                <div
                  key={post.id}
                  className="border rounded-[8px] max-w-prose w-auto p-2"
                >
                  <div className="text-xl mb-2">{post.title}</div>
                  <div>{post.body}</div>
                </div>
              ))}
          </div>
        )}
      </div>
      <div className="flex flex-col items-center gap-8">
        {isDisplayed && <h1 className="text-[36px]">Latest 20 Posts</h1>}
        {isDisplayed && (
          <div className="flex justify-center gap-8 flex-wrap">
            {posts.map((post) => (
              <div
                key={post.id}
                className="border rounded-[8px] max-w-prose w-auto p-2"
              >
                <div className="text-xl mb-2">{post.title}</div>
                <div>{post.body}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Posts;
