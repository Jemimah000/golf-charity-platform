import React, { useState } from "react";
import axios from "axios";
import CharityList from "../components/CharityList";

const Charity = () => {
  const [selectedCharity, setSelectedCharity] = useState(null);
  const [percent, setPercent] = useState(10);

  const saveSelection = async () => {
    if (!selectedCharity) {
      alert("Please select a charity");
      return;
    }

    const token = localStorage.getItem("token");

    try {
      await axios.post(
        "http://localhost:5000/api/charity/select",
        {
          charityId: selectedCharity._id,
          percentage: percent,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Charity saved ❤️");
    } catch (err) {
      console.log(err);
      alert("Error saving charity ❌");
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white p-6">

      <h1 className="text-2xl font-bold mb-6">
        Give Back ❤️
      </h1>

      <CharityList onSelect={setSelectedCharity} />

      <div className="mt-6">
        <p>Donation: {percent}%</p>

        <input
          type="range"
          min="10"
          max="50"
          value={percent}
          onChange={(e) => setPercent(Number(e.target.value))}
          className="w-full"
        />
      </div>

      {selectedCharity && (
        <p className="mt-4 text-[#2DD4BF]">
          Selected: {selectedCharity.name}
        </p>
      )}

      <button
        onClick={saveSelection}
        className="mt-6 bg-[#2DD4BF] text-black px-6 py-2 rounded-lg font-bold"
      >
        Save
      </button>

    </div>
  );
};

export default Charity;