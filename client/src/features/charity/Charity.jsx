import React from "react";
import CharityCard from "./CharityCard";

const Charity = ({ charities, onSelect }) => {
  return (
    <div className="grid gap-4">
      {charities.map((c) => (
        <CharityCard
          key={c._id}
          charity={c}
          onClick={() => onSelect(c)}
        />
      ))}
    </div>
  );
};

export default Charity;