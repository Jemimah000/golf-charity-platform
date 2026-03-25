import React from "react";

const DrawResult = ({ result }) => {
  const isWin = result.matches.length >= 3;

  return (
    <div className="mt-6 p-4 border border-slate-700 rounded-xl">

      <h2 className="font-bold mb-2">Draw Result</h2>

      <p>Drawn Numbers: {result.drawn.join(", ")}</p>

      <p>Matched Numbers: {result.matches.join(", ")}</p>

      <h3 className={`mt-2 font-bold ${isWin ? "text-green-400" : "text-red-400"}`}>
        {isWin ? "🎉 You Win!" : "😢 Try Again"}
      </h3>

    </div>
  );
};

export default DrawResult;