import React, { useEffect, useState } from "react";
import axios from "axios";
import { Sparkles, Users, Heart, PlusCircle } from "lucide-react";

const Admin = () => {
  const token = localStorage.getItem("token");

  const [users, setUsers] = useState([]);
  const [charities, setCharities] = useState([]);

  const [newCharityName, setNewCharityName] = useState("");
  const [newCharityDesc, setNewCharityDesc] = useState("");

  // ================= FETCH USERS =================
  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/auth/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // ================= FETCH CHARITIES =================
  const fetchCharities = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/charity");
      setCharities(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchCharities();
  }, []);

  // ================= ADD CHARITY =================
  const addCharity = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/charity/add",
        {
          name: newCharityName,
          description: newCharityDesc,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setNewCharityName("");
      setNewCharityDesc("");
      fetchCharities();
    } catch (err) {
      alert("Only admin can add charity ❌");
    }
  };

  // ================= RUN DRAW =================
  const runDraw = async () => {
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

      
    } catch (err) {
      alert("Draw failed ❌");
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white px-6 py-10">

      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <div className="flex items-center gap-2 text-[#2DD4BF] text-xl font-bold">
          <Sparkles />
          Admin Panel
        </div>

        <button
          onClick={runDraw}
          className="bg-[#2DD4BF] text-[#020617] px-5 py-2 rounded-lg font-bold hover:scale-105 transition"
        >
          Run Draw 🎲
        </button>
      </div>

      {/* USERS SECTION */}
      <div className="bg-[#0b1224]/70 p-6 rounded-2xl border border-slate-800 mb-10">
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
          <Users size={20} /> Users
        </h2>

        {users.length === 0 ? (
          <p className="text-slate-400">No users found</p>
        ) : (
          <div className="space-y-3">
            {users.map((user) => (
              <div
                key={user._id}
                className="bg-[#020617] border border-slate-700 p-4 rounded-xl flex justify-between"
              >
                <span>{user.email}</span>
                <span className="text-[#2DD4BF]">{user.role}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* CHARITY SECTION */}
      <div className="bg-[#0b1224]/70 p-6 rounded-2xl border border-slate-800 mb-10">
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
          <Heart size={20} /> Charities
        </h2>

        {charities.length === 0 ? (
          <p className="text-slate-400">No charities yet</p>
        ) : (
          <div className="space-y-3 mb-6">
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

        {/* ADD CHARITY */}
        <div className="mt-6">
          <h3 className="font-bold mb-3">Add Charity</h3>

          <input
            type="text"
            placeholder="Charity Name"
            value={newCharityName}
            onChange={(e) => setNewCharityName(e.target.value)}
            className="w-full mb-3 bg-[#020617] border border-slate-700 p-3 rounded-lg outline-none"
          />

          <input
            type="text"
            placeholder="Description"
            value={newCharityDesc}
            onChange={(e) => setNewCharityDesc(e.target.value)}
            className="w-full mb-3 bg-[#020617] border border-slate-700 p-3 rounded-lg outline-none"
          />

          <button
            onClick={addCharity}
            className="bg-[#2DD4BF] text-[#020617] px-6 py-2 rounded-lg font-bold flex items-center gap-2"
          >
            <PlusCircle size={18} />
            Add Charity
          </button>
        </div>
      </div>
    </div>
  );
};

export default Admin;