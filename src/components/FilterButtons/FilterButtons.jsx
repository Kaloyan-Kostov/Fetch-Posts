const FilterButtons = ({
  isDisplayed,
  isFiltered,
  handleShowPosts,
  handleFilteredPosts,
  handleRecentPosts,
  isClicked,
  handleCreatePost,
}) => {
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
        <button
          className="rounded-sm p-1 hover:scale-105 transition-all"
          onClick={handleCreatePost}
        >
          Create Post
        </button>
      </div>
      {isFiltered && (
        <button
          onClick={handleRecentPosts}
          className="rounded-sm p-1 hover:scale-105 transition-all border border-t-1 border-t-[#160e0b] sticky top-10 z-50 bg-[#160e0b] py-2"
        >
          Apply filter by {isClicked ? "All Posts" : "Recent Posts"}
        </button>
      )}
    </div>
  );
};

export default FilterButtons;
