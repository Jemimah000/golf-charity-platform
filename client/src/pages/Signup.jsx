import React, { useState } from "react";
import { Sparkles, User, Mail, Lock } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // ✅ added

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate(); // ✅ added

  // ONLY change handleSignup function

const handleSignup = async () => {
  try {
    const res = await axios.post("http://localhost:5000/api/auth/signup", {
      name,
      email,
      password,
    });

    localStorage.setItem("token", res.data.token);

    // ✅ store user
    localStorage.setItem("user", JSON.stringify(res.data.user));

    navigate("/dashboard");

  } catch (err) {
    alert("Signup failed ❌");
  }
};

  return (
    <div className="relative min-h-screen w-full bg-[#020617] text-white flex items-center justify-center px-4">

      {/* Background Glow */}
      <div className="absolute top-[-10%] left-[-10%] w-[400px] h-[400px] bg-purple-900/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-cyan-900/10 rounded-full blur-[120px]" />

      {/* Signup Card */}
      <div className="relative z-10 bg-[#0b1224]/70 backdrop-blur-xl border border-slate-800/40 p-10 rounded-3xl w-full max-w-md shadow-2xl">

        {/* Logo */}
        <div className="flex items-center justify-center gap-2 text-[#2DD4BF] font-bold text-xl mb-8">
          <Sparkles size={22} />
          <span>LuckyDraw</span>
        </div>

        {/* Heading */}
        <h2 className="text-3xl font-extrabold text-center mb-6">
          Create Account ✨
        </h2>

        {/* Name */}
        <div className="mb-5">
          <label className="text-sm text-slate-400 mb-2 block">Name</label>
          <div className="flex items-center bg-[#020617] border border-slate-700 rounded-lg px-3">
            <User size={18} className="text-slate-400" />
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full bg-transparent outline-none p-3 text-sm"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>

        {/* Email */}
        <div className="mb-5">
          <label className="text-sm text-slate-400 mb-2 block">Email</label>
          <div className="flex items-center bg-[#020617] border border-slate-700 rounded-lg px-3">
            <Mail size={18} className="text-slate-400" />
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full bg-transparent outline-none p-3 text-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="text-sm text-slate-400 mb-2 block">Password</label>
          <div className="flex items-center bg-[#020617] border border-slate-700 rounded-lg px-3">
            <Lock size={18} className="text-slate-400" />
            <input
              type="password"
              placeholder="Create a password"
              className="w-full bg-transparent outline-none p-3 text-sm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        {/* Button */}
        <button
          onClick={handleSignup}
          className="w-full bg-[#2DD4BF] hover:scale-105 text-[#020617] font-bold py-3 rounded-xl shadow-[0_0_20px_rgba(45,212,191,0.3)] transition-all duration-300"
        >
          Sign Up
        </button>

        {/* Footer */}
        <p className="text-center text-slate-400 text-sm mt-6">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")} // ✅ clickable
            className="text-[#2DD4BF] cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;