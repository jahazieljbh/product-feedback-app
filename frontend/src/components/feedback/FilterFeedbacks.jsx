import React from "react";
import Tag from "../helpers/Tag";
import { tags } from "../../utils/tags";

const FilterFeedbacks = () => {
  return (
    <div className="md:block bg-white rounded-lg p-4 lg:my-4 place-self-stretch mb-5 md:mb-0">
      <h2 className="text-md text-left text-primary-dark font-bold mb-3">
        Popular Tags
      </h2>
      <div className="flex justify-start flex-wrap">
        {tags.map((tag) => (
          <Tag btnName={tag.name} key={tag.name} />
        ))}
      </div>
    </div>
  );
};

export default FilterFeedbacks;