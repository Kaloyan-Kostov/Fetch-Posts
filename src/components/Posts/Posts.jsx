import { useEffect, useState } from "react";
import { fetchPosts, fetchUsers } from "../../helpers/dataFetcher.js";
import Hero from "../Hero/Hero.jsx";
import FilterUser from "../FilterUser/FilterUser.jsx";
import Navbar from "../Navbar/Navbar.jsx";
import PostList from "../PostList/PostList.jsx";
import CreatePost from "../CreatePost/CreatePost.jsx";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDisplayed, setIsDisplayed] = useState(false);
  const [isFiltered, setIsFiltered] = useState(false);
  const [userId, setUserId] = useState(10);
  const [isClicked, setIsClicked] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [createPost, setCreatePost] = useState(false);

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

  useEffect(() => {
    if (isFiltered) {
      const filteredPosts = posts.filter((post) => post.userId === userId);
      setIsEmpty(filteredPosts.length === 0);
    } else {
      setIsEmpty(false);
    }
  }, [isFiltered, userId, posts]);

  const handleRecentPosts = () => {
    setIsClicked(!isClicked);
  };

  const handleFilteredPosts = () => {
    setIsFiltered(!isFiltered);
    setIsDisplayed(false);
    setCreatePost(false);
  };
  const handleShowPosts = () => {
    setIsDisplayed(!isDisplayed);
    setIsFiltered(false);
    setCreatePost(false);
  };

  const handleCreatePost = () => {
    setCreatePost((prevCreatePost) => !prevCreatePost);
    setIsDisplayed(false);
    setIsFiltered(false);
    setIsClicked(false);
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
      <div className="sticky top-0 z-50">
        <Navbar
          isDisplayed={isDisplayed}
          isFiltered={isFiltered}
          handleShowPosts={handleShowPosts}
          handleFilteredPosts={handleFilteredPosts}
          handleRecentPosts={handleRecentPosts}
          isClicked={isClicked}
          handleCreatePost={handleCreatePost}
        />
      </div>
      {createPost ? (
        <CreatePost />
      ) : (
        <div>
          <Hero isDisplayed={isDisplayed} isFiltered={isFiltered} />
          <FilterUser
            userId={userId}
            incrementUserId={incrementUserId}
            decrementUserId={decrementUserId}
            isFiltered={isFiltered}
            isClicked={isClicked}
          />

          <div className="flex flex-col items-center gap-8">
            {isFiltered && isEmpty && (
              <div className=" h-[20vh] text-[16px]">
                <hr />
                <br />
                You are currently viewing Posts filtered by:
                <br />
                <span className="text-[20px]">- Recency</span>
                <br />
                <span className="text-[20px]">- userId</span> <br />
                In order to display more posts, click ❝Apply filter by All
                Posts❞.
              </div>
            )}
            {isDisplayed || isFiltered ? (
              <div className="flex flex-col items-center gap-8 mt-16">
                <PostList
                  posts={posts}
                  users={users}
                  isFiltered={isFiltered}
                  userId={userId}
                  isDisplayed={isDisplayed}
                />
              </div>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
};

export default Posts;
