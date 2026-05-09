import { useNavigate } from "react-router";
import { Lock, Star, CheckCircle2 } from "lucide-react";

export function StageMap() {
  const navigate = useNavigate();

  const stages = [
    { id: 1, name: "Genesis Gate", status: "completed", stars: 3, fortress: "Tower of Babel" },
    { id: 2, name: "Exodus Path", status: "completed", stars: 2, fortress: "Pharaoh's Palace" },
    { id: 3, name: "Leviticus Sanctuary", status: "current", stars: 1, fortress: "Golden Calf" },
    { id: 4, name: "Numbers Wilderness", status: "locked", stars: 0, fortress: "Rebel Camp" },
    { id: 5, name: "Deuteronomy Heights", status: "locked", stars: 0, fortress: "False Prophets" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-[#0f0f1a] to-background p-6">
      <div className="max-w-md mx-auto space-y-6 pt-6">
        <div className="text-center">
          <h1 className="text-3xl text-[#d4af37] mb-2">מפת מסע</h1>
          <p className="text-[#8b7355]">Journey Through Sacred Texts</p>
        </div>

        <div className="relative">
          {stages.map((stage, index) => (
            <div key={stage.id} className="relative mb-8">
              {index > 0 && (
                <div className="absolute left-1/2 -translate-x-1/2 -top-8 w-1 h-8 bg-gradient-to-b from-[#d4af37]/50 to-transparent"></div>
              )}

              <div
                onClick={() => stage.status !== "locked" && navigate(`/combat/${stage.id}`)}
                className={`relative bg-card border-2 rounded-lg p-4 transition-all ${
                  stage.status === "locked"
                    ? "border-[#8b7355]/30 opacity-60"
                    : "border-[#d4af37]/40 hover:border-[#d4af37]/70 cursor-pointer active:scale-95"
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="text-[#d4af37] mb-1">{stage.name}</h3>
                    <p className="text-sm text-[#8b7355]">{stage.fortress}</p>
                  </div>

                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    stage.status === "completed"
                      ? "bg-gradient-to-br from-[#d4af37] to-[#c5a028]"
                      : stage.status === "current"
                      ? "bg-gradient-to-br from-[#4a1a5c] to-[#1a2a4a] border-2 border-[#d4af37]"
                      : "bg-[#1a1a24] border-2 border-[#8b7355]/30"
                  }`}>
                    {stage.status === "locked" ? (
                      <Lock className="w-6 h-6 text-[#8b7355]" />
                    ) : stage.status === "completed" ? (
                      <CheckCircle2 className="w-6 h-6 text-[#0a0a0f]" />
                    ) : (
                      <span className="text-xl text-[#d4af37]">{stage.id}</span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  {[1, 2, 3].map((star) => (
                    <Star
                      key={star}
                      className={`w-4 h-4 ${
                        star <= stage.stars
                          ? "fill-[#d4af37] text-[#d4af37]"
                          : "text-[#8b7355]/30"
                      }`}
                    />
                  ))}
                </div>

                {stage.status === "current" && (
                  <div className="mt-3 pt-3 border-t border-[#d4af37]/20">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-[#8b7355]">Progress</span>
                      <span className="text-[#d4af37]">2/5 Questions</span>
                    </div>
                    <div className="w-full bg-[#1a1a24] rounded-full h-1.5 mt-2 overflow-hidden">
                      <div className="bg-gradient-to-r from-[#d4af37] to-[#c5a028] h-full w-[40%] rounded-full"></div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
