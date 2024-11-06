import { useEffect, useState } from "react";
import { fetchPosts, fetchUsers } from "../../helpers/dataFetcher.js";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDisplayed, setIsDisplayed] = useState(false);
  const [isFiltered, setIsFiltered] = useState(false);
  const [userId, setUserId] = useState(10);
  const [isClicked, setIsClicked] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);

  useEffect(() => {
    const loadFetchedData = async () => {
      setIsLoading(true);
      const postData = await fetchPosts();
      const userData = await fetchUsers();
      setPosts(isClicked ? postData.slice(-20) : postData);
      setUsers(userData);
      setIsLoading(false);
    };
    loadFetchedData();
  }, [isClicked]);

  // Check if the filtered posts list is empty
  useEffect(() => {
    if (isFiltered) {
      const filteredPosts = posts.filter((post) => post.userId === userId);
      setIsEmpty(filteredPosts.length === 0);
    } else {
      setIsEmpty(false);
    }
  }, [isFiltered, userId, posts]);

  const handleFilteredPosts = () => {
    setIsFiltered(!isFiltered);
    setIsDisplayed(false);
  };

  const handleShowPosts = () => {
    setIsDisplayed(!isDisplayed);
    setIsFiltered(false);
  };

  const handleRecentPosts = () => {
    setIsClicked(!isClicked);
  };

  const incrementUserId = () => {
    setUserId((prevUserId) => (prevUserId < 10 ? prevUserId + 1 : 10));
  };

  const decrementUserId = () => {
    setUserId((prevUserId) => (prevUserId > 1 ? prevUserId - 1 : 1));
  };

  if (isLoading) {
    return (
      <div className="flex h-[80vh] justify-center items-center">
        currently loading..
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-center gap-4 sticky top-0 border border-t-transparent z-50 bg-[#160e0b] py-1">
        <button
          onClick={handleShowPosts}
          className="rounded-sm p-1 hover:scale-105 transition-all"
        >
          {isDisplayed ? "Hide Recent Posts" : "Recent Posts"}
        </button>
        <button
          onClick={handleFilteredPosts}
          className="rounded-sm p-1 hover:scale-105 transition-all"
        >
          {isFiltered ? "Hide Filtered Posts" : "Filtered Posts"}
        </button>
        <button className="rounded-sm p-1 hover:scale-105 transition-all">
          Create Post
        </button>
      </div>
      {isFiltered && (
        <button
          onClick={handleRecentPosts}
          className="rounded-sm p-1 hover:scale-105 transition-all border border-t-0 sticky top-10 z-50 bg-[#160e0b] py-2"
        >
          Apply filter by {isClicked ? "All Posts" : "Recent Posts"}
        </button>
      )}
      {!isDisplayed && !isFiltered && (
        <div className="flex h-[80vh] justify-center items-center">
          This is a landing page
        </div>
      )}
      <div className="flex flex-col items-center gap-8">
        {isFiltered && (
          <h1 className="text-[36px] text-center grid grid-rows-1 gap-2 items-center mt-16">
            {isClicked ? "Latest" : "All"} Posts filtered by <br />
            userId
            <div className="flex justify-center text-[25px] gap-5 items-center mt-2">
              {userId > 1 ? (
                <button
                  onClick={decrementUserId}
                  className="px-4 border rounded"
                >
                  ←
                </button>
              ) : (
                <div className="px-4" />
              )}
              <span className="text-[38px]">{userId}</span>
              {userId < 10 ? (
                <button
                  onClick={incrementUserId}
                  className="px-4 border rounded"
                >
                  →
                </button>
              ) : (
                <div className="px-4" />
              )}
            </div>
          </h1>
        )}
        {isFiltered && isEmpty && (
          <div className=" h-[20vh] text-[16px]">
            <hr />
            <br />
            You are currently viewing Posts filtered by:
            <br />
            <span className="text-[20px]">- Recency</span>
            <br />
            <span className="text-[20px]">- userId</span> <br />
            In order to display more posts, click ❝Apply filter by All Posts❞.
          </div>
        )}
        {isFiltered && !isEmpty && (
          <div className="flex justify-center gap-8 flex-wrap">
            {posts
              .filter((post) => post.userId === userId)
              .map((post) => {
                const user = users.find((user) => user.id === post.userId);
                return (
                  <div
                    key={post.id}
                    className="border rounded-[8px] max-w-prose w-auto p-2 hover:bg-[#685b55] hover:scale-105 transition-all"
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
        {isDisplayed && <h1 className="text-[36px] mt-16">Latest 20 Posts</h1>}
        {isDisplayed && (
          <div className="flex justify-center gap-8 flex-wrap">
            {posts.map((post) => {
              const user = users.find((user) => user.id === post.userId);
              return (
                <div
                  key={post.id}
                  className="border rounded-[8px] max-w-prose w-auto p-2 hover:bg-[#685b55] hover:scale-105 transition-all"
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
