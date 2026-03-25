import React from 'react';
import { Sparkles, Crown, Dice5, Heart } from 'lucide-react';
import { useNavigate } from "react-router-dom";

const Home = () => {

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  return (
    <div className="relative min-h-screen w-full bg-[#020617] text-white font-sans overflow-x-hidden">
      
      {/* Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-cyan-900/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between px-10 py-8 max-w-[1400px] mx-auto">
        <div className="flex items-center gap-2 text-[#2DD4BF] font-bold text-xl tracking-tight">
          <Sparkles size={22} className="fill-[#2DD4BF]/20" />
          <span>LuckyDraw</span>
        </div>

        {/* ✅ UPDATED BUTTON */}
        <button
          onClick={() => navigate("/signup")}
          className="bg-[#2DD4BF] hover:bg-[#26bba8] text-[#020617] font-bold py-2 px-6 rounded-lg transition-all shadow-lg"
        >
          Get Started
        </button>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 flex flex-col items-center justify-center text-center px-4 pt-16 pb-24">
        
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#2DD4BF]/20 bg-[#061e1b] text-[#2DD4BF] text-[10px] font-bold uppercase tracking-[1.5px] mb-10">
          <Sparkles size={12} />
          <span>Charity Lottery Platform</span>
        </div>

        {/* Heading */}
        <h1 className="text-6xl md:text-[85px] font-extrabold mb-8 tracking-tighter leading-none">
          Play Lucky,{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2DD4BF] to-[#0891b2]">
            Give Back
          </span>
        </h1>

        {/* Subtext */}
        <p className="text-slate-400 max-w-lg text-lg mb-12 opacity-80 leading-relaxed font-medium">
          Pick your numbers, enter the draw, and support the charities you care about. 
          Every play makes a difference.
        </p>

        {/* ✅ UPDATED START BUTTON */}
        <button
          onClick={() => navigate(token ? "/dashboard" : "/signup")}
          className="bg-[#2DD4BF] hover:scale-105 text-[#020617] font-extrabold py-4 px-12 rounded-2xl text-lg shadow-[0_0_40px_rgba(45,212,191,0.3)] transition-all duration-300"
        >
          Start Playing
        </button>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-32 max-w-4xl w-full">
          <FeatureCard 
            icon={<Crown className="text-[#2DD4BF]" size={26} />}
            title="Subscribe & Play"
            description="Join for a chance to win big prizes every draw"
          />
          <FeatureCard 
            icon={<Dice5 className="text-[#2DD4BF]" size={26} />}
            title="Lucky Draws"
            description="5 random numbers drawn — match 3+ to win"
          />
          <FeatureCard 
            icon={<Heart className="text-[#2DD4BF]" size={26} />}
            title="Give Back"
            description="Choose a charity and donate a % of your winnings"
          />
        </div>
      </main>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-[#0b1224]/60 backdrop-blur-md border border-slate-800/40 p-10 rounded-[28px] flex flex-col items-center text-center hover:bg-[#0f172a] hover:border-slate-700 transition-all cursor-default group">
    <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">
      {icon}
    </div>
    <h3 className="text-lg font-bold mb-3 tracking-tight">{title}</h3>
    <p className="text-slate-400 text-[13px] leading-relaxed max-w-[190px]">
      {description}
    </p>
  </div>
);

export default Home;