import SinglePost from "../SinglePost/SinglePost";

const PostList = ({ posts, users, isFiltered, userId, isDisplayed }) => {
  if (isFiltered) {
    return (
      <div className="flex justify-center gap-8 flex-wrap">
        {posts
          .filter((post) => post.userId === userId)
          .map((post) => {
            const user = users.find((user) => user.id === post.userId);
            return <SinglePost key={post.id} post={post} user={user} />;
          })}
      </div>
    );
  }

  return (
    <div>
      {isDisplayed && (
        <h1 className="text-[36px] mt-6 mb-6">
          Latest 20 Posts <hr />
        </h1>
      )}
      <div className="flex justify-center gap-8 flex-wrap">
        {posts.slice(-20).map((post) => {
          const user = users.find((user) => user.id === post.userId);
          return <SinglePost key={post.id} post={post} user={user} />;
        })}
      </div>
    </div>
  );
};

export default PostList;
