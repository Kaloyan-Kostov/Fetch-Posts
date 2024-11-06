const SinglePost = ({ post, user }) => {
  return (
    <div className="border rounded-[8px] max-w-prose w-auto p-2 hover:bg-[#685b55] hover:scale-105 transition-all">
      <div className="text-xl mb-2">{post?.title}</div>
      <div className="text-left">{post?.body}</div>
      <div className="text-right text-[14px] mt-5">- {user?.username}</div>
    </div>
  );
};

export default SinglePost;
