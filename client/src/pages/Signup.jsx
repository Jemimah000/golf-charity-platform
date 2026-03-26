import React, { useState } from "react";
import { Sparkles, User, Mail, Lock } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user"); // ✅ NEW

  const navigate = useNavigate();

  const handleSignup = async () => {
  try {
    const res = await axios.post("http://localhost:5000/api/auth/signup", {
      name,
      email,
      password,
      role,
    });

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));

    if (res.data.user.role === "admin") {
      navigate("/admin");
    } else {
      navigate("/dashboard");
    }

  } catch (err) {
    console.log("❌ SIGNUP ERROR:", err.response?.data || err.message); 
    alert(err.response?.data?.message || "Signup failed ❌");
  }
};

  return (
    <div className="relative min-h-screen w-full bg-[#020617] text-white flex items-center justify-center px-4">

      <div className="relative z-10 bg-[#0b1224]/70 p-10 rounded-3xl w-full max-w-md">

        <div className="flex items-center justify-center gap-2 text-[#2DD4BF] font-bold text-xl mb-8">
          <Sparkles size={22} />
          LuckyDraw
        </div>

        <h2 className="text-3xl font-extrabold text-center mb-6">
          Create Account ✨
        </h2>

        {/* NAME */}
        <input
          type="text"
          placeholder="Name"
          className="w-full mb-4 p-3 rounded bg-[#020617]"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        {/* EMAIL */}
        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 p-3 rounded bg-[#020617]"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* PASSWORD */}
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 p-3 rounded bg-[#020617]"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* ✅ ROLE DROPDOWN */}
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full mb-6 p-3 rounded bg-[#020617]"
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        <button
          onClick={handleSignup}
          className="w-full bg-[#2DD4BF] text-black py-3 rounded"
        >
          Sign Up
        </button>

        <p className="text-center mt-4">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-[#2DD4BF] cursor-pointer"
          >
            Login
          </span>
        </p>

      </div>
    </div>
  );
};

export default Signup;