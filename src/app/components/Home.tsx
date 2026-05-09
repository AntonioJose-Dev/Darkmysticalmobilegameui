import { useNavigate } from "react-router";
import { Sword, Scroll, Sparkles } from "lucide-react";

export function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-b from-background via-[#0f0f1a] to-background">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-[#d4af37] to-[#b8941f] shadow-lg shadow-[#d4af37]/20">
            <Scroll className="w-12 h-12 text-[#0a0a0f]" />
          </div>

          <h1 className="text-4xl text-[#d4af37] tracking-wider">
            ברוך הבא
          </h1>
          <p className="text-[#8b7355]">Welcome, Warrior of Faith</p>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => navigate("/map")}
            className="w-full bg-gradient-to-r from-[#d4af37] to-[#c5a028] text-[#0a0a0f] py-4 rounded-lg font-medium flex items-center justify-center gap-3 shadow-lg shadow-[#d4af37]/30 hover:shadow-[#d4af37]/50 transition-all active:scale-95"
          >
            <Sword className="w-5 h-5" />
            Begin Your Journey
          </button>

          <button
            onClick={() => navigate("/profile")}
            className="w-full bg-card border-2 border-[#d4af37]/40 text-[#d4af37] py-4 rounded-lg font-medium flex items-center justify-center gap-3 hover:border-[#d4af37]/60 transition-all active:scale-95"
          >
            <Sparkles className="w-5 h-5" />
            View Profile
          </button>
        </div>

        <div className="bg-card/50 border border-[#d4af37]/20 rounded-lg p-4 space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-[#8b7355]">Level</span>
            <span className="text-[#d4af37]">12</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-[#8b7355]">Spiritual Power</span>
            <span className="text-[#d4af37]">850 / 1000</span>
          </div>
          <div className="w-full bg-[#1a1a24] rounded-full h-2 overflow-hidden">
            <div className="bg-gradient-to-r from-[#d4af37] to-[#c5a028] h-full w-[85%] rounded-full shadow-lg shadow-[#d4af37]/50"></div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {[
            { icon: "א", label: "Stages", value: "15/30" },
            { icon: "ב", label: "Victories", value: "124" },
            { icon: "ג", label: "Wisdom", value: "450" },
          ].map((stat, i) => (
            <div key={i} className="bg-card border border-[#d4af37]/20 rounded-lg p-3 text-center">
              <div className="text-2xl text-[#d4af37] mb-1">{stat.icon}</div>
              <div className="text-xs text-[#8b7355] mb-1">{stat.label}</div>
              <div className="text-sm text-[#d4af37]">{stat.value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
