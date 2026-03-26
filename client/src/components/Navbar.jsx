import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user")); // ✅ added

  return (
    <nav className="flex justify-between items-center p-4 bg-[#020617] text-white">

      <h1 className="text-xl font-bold">LuckyDraw</h1>

      <div className="flex items-center gap-4">

        <button onClick={() => navigate("/")}>Home</button>

        {token && (
          <button onClick={() => navigate("/dashboard")}>
            Dashboard
          </button>
        )}

        {/* ✅ ADMIN ONLY */}
        {user && user.role === "admin" && (
          <button onClick={() => navigate("/admin")}>
            Admin
          </button>
        )}

        {!token && (
          <button onClick={() => navigate("/login")}>
            Login
          </button>
        )}

      </div>
    </nav>
  );
};

export default Navbar;