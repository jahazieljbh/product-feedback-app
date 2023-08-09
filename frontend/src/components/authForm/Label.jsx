import React from "react";

const Label = ({ labelName, labelFor }) => {
  return (
    <label
      className="text-tertiary-dark block font-medium text-sm pt-5 pb-2"
      htmlFor={labelFor}
    >
      {labelName}
    </label>
  );
};

export default Label;