import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  return (
    <nav className="flex justify-between items-center p-4 bg-[#020617] text-white">

      <h1 className="text-xl font-bold">LuckyDraw</h1>

      <div className="flex items-center gap-4">

        {/* Home */}
        <button onClick={() => navigate("/")}>Home</button>

        {/* Dashboard */}
        {token && (
          <button onClick={() => navigate("/dashboard")}>
            Dashboard
          </button>
        )}

        {/* ✅ ADMIN BUTTON (PASTE HERE) */}
        {token && (
          <button onClick={() => navigate("/admin")}>
            Admin
          </button>
        )}

        {/* Login */}
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