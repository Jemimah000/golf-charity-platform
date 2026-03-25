import React from "react";

const NumberGrid = ({ selectedNumbers, setSelectedNumbers }) => {
  const toggleNumber = (num) => {
    if (selectedNumbers.includes(num)) {
      setSelectedNumbers(
        selectedNumbers.filter((n) => n !== num)
      );
    } else {
      if (selectedNumbers.length < 5) {
        setSelectedNumbers([...selectedNumbers, num]);
      }
    }
  };

  return (
    <div className="grid grid-cols-5 gap-3">
      {Array.from({ length: 50 }, (_, i) => i + 1).map((num) => (
        <button
          key={num}
          onClick={() => toggleNumber(num)}
          className={`p-3 rounded-lg border ${
            selectedNumbers.includes(num)
              ? "bg-[#2DD4BF] text-black"
              : "border-slate-700"
          }`}
        >
          {num}
        </button>
      ))}
    </div>
  );
};

export default NumberGrid;