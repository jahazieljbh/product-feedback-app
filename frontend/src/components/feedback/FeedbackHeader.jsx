import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import iconSuggestion from "../../assets/imgs/icon-suggestions.svg";
import iconPlus from "../../assets/imgs/icon-plus.svg";
import toast from "react-hot-toast";

const FeedbackHeader = ({
  headerName,
  btnName,
  search,
  setSearch,
  handleKeyPress,
}) => {
  const history = useNavigate();
  const feedbacks = useSelector((state) => state.feedbacks);
  const user = JSON.parse(localStorage.getItem("profile"));
  const handleClick = () => {
    if (user?.result?.name) {
      history("/create");
    } else {
      toast.error("You're not logged in!");
    }
  };
  return (
    <div className="w-full max-w-5xl md:rounded-lg bg-primary-dark px-2 sm:px-5 py-4 flex justify-between items-center">
      <div className="hidden md:flex md:items-center">
        <img src={iconSuggestion} className="mr-4" alt="suggestions" />
        <h1 className="text-white font-bold text-xl">{`${feedbacks.length} ${headerName}`}</h1>
      </div>
      <div className="w-full md:w-max">
        <input
          type="text"
          name="search"
          id="search"
          onKeyDown={handleKeyPress}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search..."
          className="px-4 py-3 mr-2 rounded-full text-primary-dark font-normal text-sm outline-none focus:ring-1 focus:ring-tertiary-dark"
        />
        <button
          onClick={() => handleClick()}
          className="px-5 py-3 float-right rounded-lg bg-neutral text-white transition hover:bg-btn-hover"
        >
          <img src={iconPlus} alt="plus" className="inline mr-2" />
          {btnName}
        </button>
      </div>
    </div>
  );
};

export default FeedbackHeader;