const FilterUser = ({
  userId,
  incrementUserId,
  decrementUserId,
  isFiltered,
  isClicked,
}) => {
  return isFiltered ? (
    <div>
      <h1 className="text-[36px] text-center grid grid-rows-1 gap-2 items-center mt-16">
        {isClicked ? "Latest" : "All"} Posts filtered by <br />
        userId
        <div className="flex justify-center text-[25px] gap-5 items-center mt-2">
          {userId > 1 ? (
            <button onClick={decrementUserId} className="px-4 border rounded">
              ←
            </button>
          ) : (
            <div className="px-4" />
          )}
          <span className="text-[38px]">{userId}</span>
          {userId < 10 ? (
            <button onClick={incrementUserId} className="px-4 border rounded">
              →
            </button>
          ) : (
            <div className="px-4" />
          )}
        </div>
      </h1>
    </div>
  ) : null;
};

export default FilterUser;
