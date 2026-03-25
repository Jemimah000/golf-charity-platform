import React from "react";

const ScoreBoard = ({ scores }) => {
  return (
    <div className="p-4 border border-slate-700 rounded-xl">
      <h3 className="font-bold mb-2">Scores</h3>

      {scores.map((s, i) => (
        <div key={i} className="flex justify-between">
          <span>{s.value}</span>
          <span>{new Date(s.date).toLocaleDateString()}</span>
        </div>
      ))}
    </div>
  );
};

export default ScoreBoard;