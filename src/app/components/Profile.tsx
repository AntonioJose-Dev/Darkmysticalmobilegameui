import { Trophy, Star, Scroll, Sword, Shield, Flame } from "lucide-react";

export function Profile() {
  const stats = [
    { icon: Sword, label: "Attack Power", value: "245", color: "text-[#d4af37]" },
    { icon: Shield, label: "Defense", value: "189", color: "text-[#4ade80]" },
    { icon: Flame, label: "Spirit", value: "312", color: "text-[#f97316]" },
    { icon: Scroll, label: "Wisdom", value: "450", color: "text-[#8b5cf6]" },
  ];

  const achievements = [
    { icon: "א", name: "Torah Master", desc: "Complete Genesis", unlocked: true },
    { icon: "ב", name: "Exodus Victor", desc: "Defeat Pharaoh", unlocked: true },
    { icon: "ג", name: "Faithful Warrior", desc: "Win 100 battles", unlocked: true },
    { icon: "ד", name: "Divine Scholar", desc: "Answer 500 questions", unlocked: false },
    { icon: "ה", name: "Covenant Keeper", desc: "30-day streak", unlocked: false },
    { icon: "ו", name: "Sacred Champion", desc: "Complete all stages", unlocked: false },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-[#0f0f1a] to-background p-6">
      <div className="max-w-md mx-auto space-y-6 pt-6 pb-20">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-[#d4af37] to-[#b8941f] border-4 border-[#d4af37]/30 shadow-lg shadow-[#d4af37]/30">
            <span className="text-4xl text-[#0a0a0f]">א</span>
          </div>

          <div>
            <h1 className="text-2xl text-[#d4af37] mb-1">David HaMelech</h1>
            <div className="flex items-center justify-center gap-2">
              <Star className="w-4 h-4 fill-[#d4af37] text-[#d4af37]" />
              <span className="text-[#8b7355]">Level 12 Warrior</span>
            </div>
          </div>

          <div className="bg-card border border-[#d4af37]/30 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-[#8b7355]">Experience</span>
              <span className="text-sm text-[#d4af37]">850 / 1000</span>
            </div>
            <div className="w-full bg-[#1a1a24] rounded-full h-2 overflow-hidden">
              <div className="bg-gradient-to-r from-[#d4af37] to-[#c5a028] h-full w-[85%] rounded-full shadow-lg shadow-[#d4af37]/50"></div>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h2 className="text-[#d4af37] flex items-center gap-2">
            <Trophy className="w-5 h-5" />
            Battle Statistics
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {stats.map((stat, i) => (
              <div key={i} className="bg-card border border-[#d4af37]/20 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                  <span className="text-xs text-[#8b7355]">{stat.label}</span>
                </div>
                <div className={`text-2xl ${stat.color}`}>{stat.value}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <h2 className="text-[#d4af37] flex items-center gap-2">
            <Star className="w-5 h-5" />
            Achievements
          </h2>
          <div className="grid grid-cols-3 gap-3">
            {achievements.map((achievement, i) => (
              <div
                key={i}
                className={`bg-card border rounded-lg p-3 text-center ${
                  achievement.unlocked
                    ? "border-[#d4af37]/40"
                    : "border-[#8b7355]/20 opacity-50"
                }`}
              >
                <div className={`text-3xl mb-2 ${achievement.unlocked ? "text-[#d4af37]" : "text-[#8b7355]"}`}>
                  {achievement.icon}
                </div>
                <div className={`text-xs mb-1 ${achievement.unlocked ? "text-[#d4af37]" : "text-[#8b7355]"}`}>
                  {achievement.name}
                </div>
                <div className="text-[10px] text-[#8b7355]">{achievement.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card border border-[#d4af37]/20 rounded-lg p-4 space-y-3">
          <h3 className="text-[#d4af37]">Recent Activity</h3>
          {[
            { action: "Completed", target: "Genesis Gate", time: "2 hours ago" },
            { action: "Defeated", target: "Pharaoh's Palace", time: "1 day ago" },
            { action: "Unlocked", target: "Torah Master", time: "2 days ago" },
          ].map((activity, i) => (
            <div key={i} className="flex items-center justify-between py-2 border-b border-[#d4af37]/10 last:border-0">
              <div>
                <div className="text-sm text-[#d4af37]">{activity.action} {activity.target}</div>
                <div className="text-xs text-[#8b7355]">{activity.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
