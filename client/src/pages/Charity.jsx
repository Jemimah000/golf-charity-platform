import React, { useEffect, useState } from "react";
import CharityCard from "../features/charity/CharityCard";
import axios from "axios";

const API_BASE = "https://golf-charity-platform-5wiu.onrender.com";

const CharityPage = ({ onSelectCharity }) => {
  const [charities, setCharities] = useState([]);
  const [selectedCharity, setSelectedCharity] = useState(null);
  const [contribution, setContribution] = useState(10); // default min 10%
  const [search, setSearch] = useState("");

  const token = localStorage.getItem("token");

  const fetchCharities = async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/charity`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCharities(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCharities();
  }, []);

  const handleSave = () => {
    if (!selectedCharity) {
      alert("Select a charity first!");
      return;
    }
    // Pass selected charity and contribution to parent (signup / subscription flow)
    onSelectCharity({ charity: selectedCharity, contribution });
    alert(`Charity "${selectedCharity.name}" saved with ${contribution}% contribution!`);
  };

  // Filtered charities based on search
  const filteredCharities = charities.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.description.toLowerCase().includes(search.toLowerCase())
  );

  // Spotlight / featured charity
  const featured = charities.find(c => c.isFeatured);

  return (
    <div className="min-h-screen p-6 bg-[#020617] text-white">
      <h1 className="text-3xl font-bold mb-6 text-[#2DD4BF]">Choose Your Charity</h1>

      {/* Featured Charity */}
      {featured && (
        <div className="mb-8 p-6 bg-[#0b1224]/50 rounded-2xl border border-[#2DD4BF]">
          <h2 className="text-xl font-bold mb-2">🌟 Featured Charity</h2>
          <CharityCard
            charity={featured}
            onClick={() => setSelectedCharity(featured)}
          />
        </div>
      )}

      {/* Search */}
      <input
        type="text"
        placeholder="Search charities..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-6 p-2 rounded bg-[#0b1224] w-full max-w-md"
      />

      {/* Charity Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredCharities.map(c => (
          <CharityCard
            key={c._id}
            charity={c}
            onClick={() => setSelectedCharity(c)}
          />
        ))}
      </div>

      {/* Contribution Section */}
      {selectedCharity && (
        <div className="mt-8 p-6 bg-[#0b1224]/50 rounded-2xl border border-[#2DD4BF] max-w-md">
          <h3 className="text-lg font-bold mb-2">Selected Charity: {selectedCharity.name}</h3>
          <p className="text-sm text-slate-400 mb-4">{selectedCharity.description}</p>

          <label className="block mb-2">
            Contribution Percentage (Min 10%)
          </label>
          <input
            type="number"
            min={10}
            max={100}
            value={contribution}
            onChange={(e) => setContribution(Math.max(10, Number(e.target.value)))}
            className="p-2 rounded w-24 text-black"
          />

          <button
            onClick={handleSave}
            className="mt-4 bg-[#2DD4BF] text-black px-4 py-2 rounded font-bold"
          >
            Save Charity
          </button>
        </div>
      )}
    </div>
  );
};

export default CharityPage;