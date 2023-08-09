import React from "react";
import { useNavigate } from "react-router-dom";

const PageHeader = ({ color = "secondary-dark" }) => {
  const history = useNavigate();
  return (
    <button
      onClick={() => history(-1)}
      className={`text-${color} text-sm font-bold`}
    >
      <i className={`fas fa-angle-left text-${color}`}></i>
      &nbsp;&nbsp; Go back
    </button>
  );
};

export default PageHeader;