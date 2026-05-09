import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { Lock } from "lucide-react";

type StageStatus = "completed" | "current" | "locked";

interface Stage {
  id: number;
  hebrew: string;
  name: string;
  subtitle: string;
  status: StageStatus;
}

const stages: Stage[] = [
  { id: 0, hebrew: "✦", name: "Entrada",       subtitle: "El despertar inicial.",          status: "completed" },
  { id: 1, hebrew: "א", name: "Alef",           subtitle: "Orden, voz y dirección.",        status: "current"   },
  { id: 2, hebrew: "ח", name: "Flecha",         subtitle: "Dirección y envío.",             status: "locked"    },
  { id: 3, hebrew: "מ", name: "Escudo",         subtitle: "Fe que apaga las flechas.",      status: "locked"    },
  { id: 4, hebrew: "ב", name: "Discernimiento", subtitle: "Separar verdad y sombra.",       status: "locked"    },
  { id: 5, hebrew: "רו", name: "Ruaj",          subtitle: "Respirar y moverse en el Ruaj.", status: "locked"    },
  { id: 6, hebrew: "ש", name: "Shuv",           subtitle: "El retorno al Padre.",           status: "locked"    },
];

export function StageMap() {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-start overflow-y-auto pb-28"
      style={{ background: "linear-gradient(to bottom, #0a0705, #0f0c08)" }}
    >
      {/* Top radial gold glow */}
      <div
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[340px] h-[220px]"
        style={{
          background:
            "radial-gradient(ellipse at center top, rgba(212,175,55,0.10) 0%, transparent 70%)",
        }}
      />

      <div className="w-full max-w-md px-6 pt-10 relative z-10 space-y-8">

        {/* Header */}
        <motion.div
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center space-y-1"
        >
          <h1
            className="text-4xl text-[#d4af37] tracking-wide"
            style={{ fontFamily: "serif" }}
          >
            מַסָּע
          </h1>
          <p className="text-sm text-[#8b7355] tracking-wide">
            El camino del retorno
          </p>
        </motion.div>

        {/* Stage list */}
        <div className="flex flex-col">
          {stages.map((stage, index) => {
            const isClickable = stage.status !== "locked";

            return (
              <div key={stage.id} className="flex flex-col items-stretch">
                {/* Card */}
                <motion.div
                  initial={{ x: -16, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.45, delay: index * 0.07, ease: "easeOut" }}
                  onClick={() => isClickable && navigate(`/combat/${stage.id}`)}
                  className="rounded-xl border transition-all"
                  style={{
                    background:
                      stage.status === "current"
                        ? "rgba(212,175,55,0.05)"
                        : "#0f0c08",
                    borderColor:
                      stage.status === "current"
                        ? "rgba(212,175,55,0.30)"
                        : "rgba(212,175,55,0.10)",
                    cursor: isClickable ? "pointer" : "default",
                    opacity: stage.status === "locked" ? 0.65 : 1,
                  }}
                >
                  <div className="flex items-center gap-4 p-4">

                    {/* Hebrew node */}
                    <div
                      className="flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center border"
                      style={{
                        background:
                          stage.status === "completed"
                            ? "linear-gradient(135deg, #d4af37 0%, #c5a028 100%)"
                            : stage.status === "current"
                            ? "linear-gradient(135deg, rgba(212,175,55,0.22) 0%, transparent 100%)"
                            : "rgba(15,12,8,0.9)",
                        borderColor:
                          stage.status === "completed"
                            ? "#c5a028"
                            : stage.status === "current"
                            ? "rgba(212,175,55,0.45)"
                            : "rgba(212,175,55,0.12)",
                        boxShadow:
                          stage.status === "completed"
                            ? "0 0 16px rgba(212,175,55,0.30)"
                            : stage.status === "current"
                            ? "0 0 20px rgba(212,175,55,0.18)"
                            : "none",
                      }}
                    >
                      <span
                        className="text-[#d4af37] select-none"
                        style={{
                          fontFamily: "serif",
                          fontSize: "1.5rem",
                          lineHeight: 1,
                          color:
                            stage.status === "completed"
                              ? "#0a0a0f"
                              : "#d4af37",
                        }}
                      >
                        {stage.hebrew}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0 space-y-1">
                      <div
                        className="text-base text-[#d4af37] truncate"
                        style={{ fontFamily: "serif", fontWeight: 700 }}
                      >
                        {stage.name}
                      </div>
                      <div className="text-xs text-[#8b7355] leading-snug">
                        {stage.subtitle}
                      </div>

                      {/* Progress bar — active stage only */}
                      {stage.status === "current" && (
                        <div className="pt-2 space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-[#8b7355]">Progreso</span>
                            <span className="text-xs text-[#8b7355]">0/5 Combates</span>
                          </div>
                          <div
                            className="w-full rounded-full overflow-hidden"
                            style={{
                              height: "4px",
                              background: "rgba(212,175,55,0.12)",
                            }}
                          >
                            <div
                              className="h-full rounded-full"
                              style={{
                                width: "0%",
                                background:
                                  "linear-gradient(90deg, #d4af37, #c5a028)",
                              }}
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Status badge */}
                    <div className="flex-shrink-0">
                      {stage.status === "completed" && (
                        <span
                          className="px-2 py-1 rounded-full text-xs"
                          style={{
                            background: "rgba(34,197,94,0.12)",
                            color: "#4ade80",
                            border: "1px solid rgba(34,197,94,0.25)",
                          }}
                        >
                          Completado
                        </span>
                      )}
                      {stage.status === "current" && (
                        <motion.span
                          animate={{ opacity: [1, 0.5, 1] }}
                          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                          className="px-2 py-1 rounded-full text-xs"
                          style={{
                            background: "rgba(212,175,55,0.15)",
                            color: "#d4af37",
                            border: "1px solid rgba(212,175,55,0.35)",
                          }}
                        >
                          Activo
                        </motion.span>
                      )}
                      {stage.status === "locked" && (
                        <span
                          className="flex items-center gap-1 px-2 py-1 rounded-full text-xs"
                          style={{
                            background: "rgba(139,115,85,0.10)",
                            color: "#8b7355",
                            border: "1px solid rgba(139,115,85,0.20)",
                          }}
                        >
                          <Lock size={10} />
                          Sellado
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>

                {/* Connecting line — not after last card */}
                {index < stages.length - 1 && (
                  <div className="flex justify-center">
                    <div
                      className="w-px h-8"
                      style={{
                        background:
                          "linear-gradient(to bottom, rgba(212,175,55,0.30), transparent)",
                      }}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
