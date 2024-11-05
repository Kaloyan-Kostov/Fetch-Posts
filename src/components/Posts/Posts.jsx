import { useEffect, useState } from "react";
import { FETCH_URL } from "../../helpers/constants.js";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDisplayed, setIsDisplayed] = useState(false);
  const [isFiltered, setIsFiltered] = useState(false);
  const [userId, setUserId] = useState(10);

  useEffect(() => {
    fetchPosts();
    fetchUsers();
  }, []);

  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${FETCH_URL}/posts`);
      const postData = await response.json();
      setPosts(postData.slice(-20));
    } catch (e) {
      console.log("Error", e);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${FETCH_URL}/users`);
      const userData = await response.json();
      setUsers(userData);
    } catch (e) {
      console.log("Error", e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFilteredPosts = () => {
    setIsFiltered(!isFiltered);
    setIsDisplayed(false);
  };

  const handleShowPosts = () => {
    setIsDisplayed(!isDisplayed);
    setIsFiltered(false);
  };

  const incrementUserId = () => {
    setUserId((prevUserId) => (prevUserId < 10 ? prevUserId + 1 : 10));
  };

  const decrementUserId = () => {
    setUserId((prevUserId) => (prevUserId > 1 ? prevUserId - 1 : 1));
  };

  if (isLoading) {
    return <div>currently loading..</div>;
  }

  return (
    <div>
      <div className="flex gap-4 sticky top-1">
        <button
          onClick={handleFilteredPosts}
          className="rounded-sm border p-1 bg-[#160e0b] hover:scale-105 transition-all"
        >
          {isFiltered ? "Hide Filtered Posts" : "Filtered Posts"}
        </button>
        <button
          onClick={handleShowPosts}
          className="rounded-sm border p-1 bg-[#160e0b] hover:scale-105 transition-all"
        >
          {isDisplayed ? "Hide Posts" : "Show Posts"}
        </button>
      </div>
      {!isDisplayed && !isFiltered && (
        <div className="flex h-[80vh] justify-center items-center">
          This is a landing page
        </div>
      )}
      <div className="flex flex-col items-center gap-8">
        {isFiltered && (
          <h1 className="text-[36px] flex items-center gap-2">
            Latest Posts filtered by userId
            <div className="grid grid-rows-3 text-[25px] gap-2 ml-2 items-center">
              {userId < 10 ? (
                <button
                  onClick={incrementUserId}
                  className="p-1 border rounded row-start-1"
                >
                  ↑
                </button>
              ) : (
                <div className="row-start-1" />
              )}
              <span className="row-start-2 text-[38px]">{userId}</span>{" "}
              {userId > 1 ? (
                <button
                  onClick={decrementUserId}
                  className="p-1 border rounded row-start-3"
                >
                  ↓
                </button>
              ) : (
                <div className="row-start-3" />
              )}
            </div>
          </h1>
        )}
        {isFiltered && (
          <div className="flex justify-center gap-8 flex-wrap">
            {posts
              .filter((post) => post.userId === userId)
              .map((post) => {
                const user = users.find((user) => user.id === post.userId);
                return (
                  <div
                    key={post.id}
                    className="border rounded-[8px] max-w-prose w-auto p-2"
                  >
                    <div className="text-xl mb-2">{post.title}</div>
                    <div className="text-left">{post.body}</div>
                    <div className="text-right text-[14px] mt-5">
                      - {user?.username}
                    </div>
                  </div>
                );
              })}
          </div>
        )}
      </div>

      <div className="flex flex-col items-center gap-8">
        {isDisplayed && <h1 className="text-[36px]">Latest 20 Posts</h1>}
        {isDisplayed && (
          <div className="flex justify-center gap-8 flex-wrap">
            {posts.map((post) => {
              const user = users.find((user) => user.id === post.userId);
              return (
                <div
                  key={post.id}
                  className="border rounded-[8px] max-w-prose w-auto p-2"
                >
                  <div className="text-xl mb-2">{post.title}</div>
                  <div className="text-left">{post.body}</div>
                  <div className="text-right text-[14px]">
                    - {user?.username}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Posts;
