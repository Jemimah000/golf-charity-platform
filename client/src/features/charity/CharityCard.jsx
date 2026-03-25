import React from "react";

const CharityCard = ({ charity, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer p-4 border border-slate-700 rounded-xl hover:border-[#2DD4BF]"
    >
      <h3 className="font-bold">{charity.name}</h3>
      <p className="text-sm text-slate-400">
        {charity.description}
      </p>
    </div>
  );
};

export default CharityCard;