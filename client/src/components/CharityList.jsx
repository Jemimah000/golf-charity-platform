import React, { useEffect, useState } from "react";
import API from "../services/api";
import { Heart } from "lucide-react";

const CharityList = () => {
  const [charities, setCharities] = useState([]);

  const fetchCharities = async () => {
    try {
      const res = await API.get("/charity");
      setCharities(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCharities();
  }, []);

  return (
    <div className="bg-[#0b1224]/70 p-6 rounded-2xl border border-slate-800">
      <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
        <Heart size={18} /> Charities
      </h2>

      {charities.length === 0 ? (
        <p className="text-slate-400">No charities available</p>
      ) : (
        <div className="space-y-3">
          {charities.map((charity) => (
            <div
              key={charity._id}
              className="bg-[#020617] border border-slate-700 p-4 rounded-xl"
            >
              <h3 className="font-bold">{charity.name}</h3>
              <p className="text-sm text-slate-400">
                {charity.description}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CharityList;