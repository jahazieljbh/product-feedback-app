import React from "react";
import { ScrollMenu } from "react-horizontal-scrolling-menu";
import { avatars } from "../../utils/avatars";
import 'react-horizontal-scrolling-menu/dist/styles.css';

const Arrow = ({ text, className }) => {
  return <div className={className}>{text}</div>;
};

const ArrowLeft = Arrow({ text: "<", className: "text-black text-md" });
const ArrowRight = Arrow({ text: ">", className: "text-black text-md" });

const AvatarsScroll = ({ setSelected, selected }) => {
  const onSelect = (key) => {
    setSelected(key);
  };

  return (
    <ScrollMenu
      arrowLeft={ArrowLeft}
      arrowRight={ArrowRight}
      selected={selected}
      onSelect={onSelect}
      className="overflow-x-hidden"
    >
      {avatars.map((item) => (
        <div
          className={`p-3 mt-2 select-none cursor-pointer rounded-full w-20 border-2 ${
            item.name === selected ? "border-purple-500" : "border-transparent"
          }`}
          onClick={() => onSelect(item.name)}
          key={item.name}
          id={`${item.name}`}
        >
          <img
            src={`https://avatars.dicebear.com/api/avataaars/${item.name}.svg`}
            alt={item.name}
          />
        </div>
      ))}
    </ScrollMenu>
  );
};

export default AvatarsScroll;