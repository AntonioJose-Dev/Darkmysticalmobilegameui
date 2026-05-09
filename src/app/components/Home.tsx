import { useNavigate } from "react-router";
import { motion } from "motion/react";

export function Home() {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-start p-6 pb-28 overflow-y-auto"
      style={{
        background: "linear-gradient(to bottom, #0a0705, #0f0c08)",
      }}
    >
      {/* Radial gold glow at top center */}
      <div
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[340px] h-[240px]"
        style={{
          background:
            "radial-gradient(ellipse at center top, rgba(212,175,55,0.12) 0%, transparent 70%)",
        }}
      />

      <div className="w-full max-w-md space-y-7 pt-10 relative z-10">

        {/* Header Symbol — שׁ in a circle */}
        <div className="flex flex-col items-center space-y-5">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex items-center justify-center w-24 h-24 rounded-full border border-[#d4af37]/30"
            style={{
              background:
                "linear-gradient(135deg, rgba(212,175,55,0.20) 0%, transparent 100%)",
              boxShadow:
                "0 0 64px rgba(212,175,55,0.40), 0 0 24px rgba(212,175,55,0.28), 0 25px 50px rgba(212,175,55,0.40)",
            }}
          >
            <span
              className="text-[#d4af37] select-none"
              style={{ fontSize: "4.5rem", fontFamily: "serif", lineHeight: 1 }}
            >
              שׁ
            </span>
          </motion.div>

          {/* Title */}
          <motion.div
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.55, delay: 0.15, ease: "easeOut" }}
            className="text-center space-y-1"
          >
            <div
              className="text-5xl text-[#d4af37] tracking-widest"
              style={{ fontFamily: "serif", letterSpacing: "0.12em" }}
            >
              שׁוּב
            </div>
            <div className="text-sm text-[#8b7355] tracking-wide">
              El retorno ha comenzado.
            </div>
          </motion.div>
        </div>

        {/* Companion Card */}
        <motion.div
          initial={{ y: 16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.55, delay: 0.28, ease: "easeOut" }}
          className="rounded-xl border border-[#d4af37]/20 p-4 space-y-3"
          style={{ background: "rgba(15,12,8,0.85)" }}
        >
          {/* Glyph */}
          <div className="flex flex-col items-center space-y-2">
            <div className="relative flex items-center justify-center">
              <div
                className="absolute w-16 h-16 rounded-full"
                style={{
                  background:
                    "radial-gradient(circle, rgba(212,175,55,0.18) 0%, transparent 70%)",
                }}
              />
              <span className="relative text-4xl select-none">🜂</span>
            </div>

            {/* Name & Role */}
            <div className="text-center">
              <div
                className="text-base text-[#d4af37]"
                style={{ fontWeight: 700 }}
              >
                Sariel
              </div>
              <div className="text-xs text-[#8b7355] tracking-wide">
                Guardián del discernimiento
              </div>
            </div>
          </div>

          {/* Stats pills */}
          <div className="flex items-center justify-center gap-2 flex-wrap">
            {["Luz +18", "Escudo +12", "Ruaj +9"].map((pill) => (
              <span
                key={pill}
                className="px-3 py-1 rounded-full border border-[#d4af37]/20 text-xs text-[#8b7355]"
                style={{ background: "rgba(212,175,55,0.04)" }}
              >
                {pill}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Buttons */}
        <motion.div
          initial={{ y: 16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
          className="space-y-3"
        >
          {/* Primary */}
          <button
            onClick={() => navigate("/map")}
            className="w-full py-4 rounded-lg tracking-wider transition-all active:scale-95"
            style={{
              background: "linear-gradient(90deg, #d4af37 0%, #c5a028 100%)",
              color: "#0a0a0f",
              fontFamily: "serif",
              fontSize: "1rem",
              boxShadow: "0 4px 24px rgba(212,175,55,0.28)",
            }}
          >
            ✦ Comenzar el camino
          </button>

          {/* Secondary */}
          <button
            onClick={() => navigate("/profile")}
            className="w-full py-4 rounded-lg border border-[#d4af37]/50 text-[#d4af37] tracking-wider transition-all active:scale-95 hover:border-[#d4af37]/80"
            style={{
              background: "transparent",
              fontFamily: "serif",
              fontSize: "1rem",
            }}
          >
            Mi perfil
          </button>
        </motion.div>

        {/* Stats Strip */}
        <motion.div
          initial={{ y: 16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.52, ease: "easeOut" }}
          className="grid grid-cols-3 gap-3"
        >
          {[
            { symbol: "א", label: "Etapa", value: "Alef" },
            { symbol: "✦", label: "Luz", value: "850" },
            { symbol: "ג", label: "Fragmentos", value: "36" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-lg border border-[#d4af37]/20 p-3 text-center space-y-1"
              style={{ background: "rgba(15,12,8,0.85)" }}
            >
              <div
                className="text-[#d4af37]"
                style={{ fontSize: "1.4rem", fontFamily: "serif" }}
              >
                {stat.symbol}
              </div>
              <div className="text-xs text-[#8b7355] tracking-wide">
                {stat.label}
              </div>
              <div
                className="text-sm text-[#d4af37]"
                style={{ fontFamily: "serif" }}
              >
                {stat.value}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}