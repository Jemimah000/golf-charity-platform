import React from "react";

const CharityCard = ({ charity, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer p-4 border border-slate-700 rounded-xl hover:border-[#2DD4BF] hover:bg-[#0b1224]/50 transition flex flex-col"
    >
      {charity.image && (
        <img
          src={charity.image}
          alt={charity.name}
          className="w-full h-24 object-cover rounded-lg mb-2"
        />
      )}
      <h3 className="font-bold">{charity.name}</h3>
      <p className="text-sm text-slate-400">{charity.description}</p>
      {charity.events && charity.events.length > 0 && (
        <p className="text-xs text-gray-500 mt-1">{charity.events.length} upcoming event(s)</p>
      )}
    </div>
  );
};

export default CharityCard;