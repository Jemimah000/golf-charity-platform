import React from "react";

const FeatureCard = ({ icon, title, description, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="bg-[#0b1224]/60 backdrop-blur-md border border-slate-800/40 p-8 rounded-2xl flex flex-col items-center text-center hover:bg-[#0f172a] transition-all cursor-pointer"
    >
      <div className="mb-4">{icon}</div>

      <h3 className="text-lg font-bold mb-2">{title}</h3>

      <p className="text-slate-400 text-sm">{description}</p>
    </div>
  );
};

export default FeatureCard;