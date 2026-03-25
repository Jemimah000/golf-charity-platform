import React, { useState } from "react";
import axios from "axios";
import NumberGrid from "../features/draw/NumberGrid";
import DrawResult from "../features/draw/DrawResult";

const Draw = () => {
  const [selectedNumbers, setSelectedNumbers] = useState([]);
  const [result, setResult] = useState(null);

  const runDraw = async () => {
    if (selectedNumbers.length !== 5) {
      alert("Select 5 numbers");
      return;
    }

    const token = localStorage.getItem("token");

    try {
      const res = await axios.post(
        "http://localhost:5000/api/draw/run",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setResult({
        drawn: res.data.drawnNumbers,
        matches: selectedNumbers.filter((n) =>
          res.data.drawnNumbers.includes(n)
        ),
      });

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white p-6">

      <h1 className="text-2xl font-bold mb-6">
        Lucky Draw 🎲
      </h1>

      <NumberGrid
        selectedNumbers={selectedNumbers}
        setSelectedNumbers={setSelectedNumbers}
      />

      <button
        onClick={runDraw}
        className="mt-6 bg-[#2DD4BF] text-black px-6 py-2 rounded-lg font-bold"
      >
        Play Draw
      </button>

      {result && <DrawResult result={result} />}

    </div>
  );
};

export default Draw;