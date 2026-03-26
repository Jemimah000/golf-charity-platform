import React, { useEffect, useState } from "react";
import axios from "axios";

const Admin = () => {
  const token = localStorage.getItem("token");

  const [users, setUsers] = useState([]);
  const [draws, setDraws] = useState([]);

  // ================= USERS =================
  const fetchUsers = async () => {
    const res = await axios.get(
      "http://localhost:5000/api/auth/users",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    setUsers(res.data);
  };

  // ================= DRAWS =================
  const fetchDraws = async () => {
    const res = await axios.get(
      "http://localhost:5000/api/draw/all",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    setDraws(res.data);
  };

  useEffect(() => {
    fetchUsers();
    fetchDraws();
  }, []);

  // ================= RUN DRAW =================
  const runDraw = async () => {
    await axios.post(
      "http://localhost:5000/api/draw/run",
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    alert("Official Draw Completed 🎉");
    fetchDraws();
  };

  return (
    <div className="p-6 text-white bg-[#020617] min-h-screen">

      <h1 className="text-2xl font-bold mb-6">
        👑 Admin Panel
      </h1>

      <button
        onClick={runDraw}
        className="bg-green-500 px-4 py-2 rounded mb-6"
      >
        Run Official Draw 🎲
      </button>

      {/* USERS */}
      <h2 className="text-xl mb-3">Users</h2>
      {users.map((u) => (
        <div key={u._id} className="mb-2">
          {u.email}
        </div>
      ))}

      {/* DRAWS */}
      <h2 className="text-xl mt-6 mb-3">Draw History</h2>

      {draws.map((draw) => (
        <div key={draw._id} className="mb-4 border p-3 rounded">

          <p>Winning: {draw.winningNumbers.join(", ")}</p>

          {draw.winners.length === 0 ? (
            <p>No winners</p>
          ) : (
            draw.winners.map((w, i) => (
              <div key={i}>
                {w.email} - {w.prize} - 
                {w.isPaid ? " ✅ Paid" : " ❌ Pending"}
              </div>
            ))
          )}

        </div>
      ))}

    </div>
  );
};

export default Admin;