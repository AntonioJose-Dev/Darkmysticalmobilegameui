import { useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";

type GamePhase = "combat" | "victory" | "defeat";
type ShakeTarget = "player" | "enemy" | null;

interface Answer {
  id: number;
  text: string;
  correct: boolean;
}

interface Encounter {
  id: number;
  enemyName: string;
  enemySymbol: string;
  enemySubtitle: string;
  verse: string;
  question: string;
  answers: Answer[];
}

const encounters: Encounter[] = [
  {
    id: 0,
    enemyName: "Miedo",
    enemySymbol: "פ",
    enemySubtitle: "El espíritu que paraliza",
    verse: "Josué 1:9",
    question: "¿Qué ordenó Dios a Josué al enfrentar la tierra prometida?",
    answers: [
      { id: 1, text: "Ser fuerte y valiente", correct: true },
      { id: 2, text: "Orar cuarenta días", correct: false },
      { id: 3, text: "Construir un altar primero", correct: false },
      { id: 4, text: "Ayunar en silencio", correct: false },
    ],
  },
  {
    id: 1,
    enemyName: "Duda",
    enemySymbol: "ד",
    enemySubtitle: "El espíritu que divide la mente",
    verse: "Mateo 14:31",
    question: "¿Por qué comenzó a hundirse Pedro al caminar sobre el agua?",
    answers: [
      { id: 1, text: "Por el peso de sus ropas", correct: false },
      { id: 2, text: "Porque Jesús lo soltó", correct: false },
      { id: 3, text: "Por su poca fe y duda", correct: true },
      { id: 4, text: "Por el viento fuerte", correct: false },
    ],
  },
  {
    id: 2,
    enemyName: "Mentira",
    enemySymbol: "ש",
    enemySubtitle: "El padre de la falsedad",
    verse: "Juan 8:44",
    question: "¿Cómo llama Jesús al adversario en Juan 8:44?",
    answers: [
      { id: 1, text: "Ángel de oscuridad", correct: false },
      { id: 2, text: "Padre de la mentira", correct: true },
      { id: 3, text: "Príncipe de la muerte", correct: false },
      { id: 4, text: "Espíritu de confusión", correct: false },
    ],
  },
];

export function Combat() {
  const { stageId } = useParams();
  const navigate = useNavigate();

  const [encounterIndex, setEncounterIndex] = useState(0);
  const [playerHp, setPlayerHp] = useState(100);
  const [enemyHp, setEnemyHp] = useState(100);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [gamePhase, setGamePhase] = useState<GamePhase>("combat");
  const [shakeTarget, setShakeTarget] = useState<ShakeTarget>(null);
  const [flashGold, setFlashGold] = useState(false);
  const [flashRed, setFlashRed] = useState(false);
  const [resultMsg, setResultMsg] = useState<string | null>(null);

  const encounter = encounters[encounterIndex];

  const handleAnswer = useCallback(
    (answerId: number) => {
      if (hasAnswered || gamePhase !== "combat") return;

      const answer = encounter.answers.find((a) => a.id === answerId)!;
      setSelectedId(answerId);
      setHasAnswered(true);

      if (answer.correct) {
        setFlashGold(true);
        setShakeTarget("enemy");
        setResultMsg("¡La Palabra derriba la fortaleza!");

        setTimeout(() => setFlashGold(false), 800);
        setTimeout(() => setShakeTarget(null), 600);
        setTimeout(() => setEnemyHp(0), 180);

        setTimeout(() => {
          setResultMsg(null);
          if (encounterIndex < encounters.length - 1) {
            setEncounterIndex((i) => i + 1);
            setEnemyHp(100);
            setSelectedId(null);
            setHasAnswered(false);
          } else {
            setGamePhase("victory");
          }
        }, 1500);
      } else {
        setFlashRed(true);
        setShakeTarget("player");
        setResultMsg("La fortaleza resiste…");

        const newHp = Math.max(0, playerHp - 25);
        setPlayerHp(newHp);

        setTimeout(() => setFlashRed(false), 800);
        setTimeout(() => setShakeTarget(null), 600);

        if (newHp <= 0) {
          setTimeout(() => {
            setResultMsg(null);
            setGamePhase("defeat");
          }, 1100);
        } else {
          setTimeout(() => {
            setResultMsg(null);
            setSelectedId(null);
            setHasAnswered(false);
          }, 1300);
        }
      }
    },
    [hasAnswered, gamePhase, encounter, encounterIndex, playerHp]
  );

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-start overflow-y-auto pb-28"
      style={{ background: "linear-gradient(to bottom, #0a0705, #0f0c08)" }}
    >
      {/* Top radial gold glow */}
      <div
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[360px] h-[220px]"
        style={{
          background:
            "radial-gradient(ellipse at center top, rgba(212,175,55,0.10) 0%, transparent 70%)",
        }}
      />

      <div className="w-full max-w-md px-4 pt-8 relative z-10 space-y-5">

        {/* Header — encounter tracker */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2">
            {encounters.map((_, i) => {
              const isDone = i < encounterIndex || gamePhase === "victory";
              const isActive = i === encounterIndex && gamePhase === "combat";
              return (
                <motion.div
                  key={i}
                  animate={{ width: isActive ? 24 : 8 }}
                  transition={{ duration: 0.3 }}
                  className="rounded-full"
                  style={{
                    height: "8px",
                    background: isDone
                      ? "#d4af37"
                      : isActive
                      ? "rgba(212,175,55,0.65)"
                      : "rgba(212,175,55,0.15)",
                    boxShadow: isActive
                      ? "0 0 10px rgba(212,175,55,0.50)"
                      : "none",
                  }}
                />
              );
            })}
          </div>
          <p className="text-xs text-[#8b7355] tracking-widest">
            Etapa {stageId} · Combate {encounterIndex + 1} de 3
          </p>
        </div>

        {/* ── VICTORIA ── */}
        <AnimatePresence>
          {gamePhase === "victory" && (
            <motion.div
              key="victory"
              initial={{ scale: 0.88, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="rounded-xl border p-8 text-center space-y-4"
              style={{
                background: "rgba(212,175,55,0.06)",
                borderColor: "rgba(212,175,55,0.35)",
                boxShadow: "0 0 48px rgba(212,175,55,0.14)",
              }}
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.15, 1] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                className="text-5xl select-none"
              >
                ✦
              </motion.div>
              <h2
                className="text-3xl text-[#d4af37]"
                style={{ fontFamily: "serif" }}
              >
                ¡Victoria!
              </h2>
              <p className="text-sm text-[#8b7355] leading-relaxed">
                La fortaleza ha caído ante la Palabra.
                <br />
                El camino continúa.
              </p>
              <button
                onClick={() => navigate("/map")}
                className="w-full py-3 rounded-lg transition-all active:scale-95"
                style={{
                  background: "linear-gradient(90deg, #d4af37 0%, #c5a028 100%)",
                  color: "#0a0a0f",
                  fontFamily: "serif",
                  fontSize: "1rem",
                  boxShadow: "0 4px 20px rgba(212,175,55,0.28)",
                }}
              >
                Continuar el camino
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── DERROTA ── */}
        <AnimatePresence>
          {gamePhase === "defeat" && (
            <motion.div
              key="defeat"
              initial={{ scale: 0.88, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="rounded-xl border p-8 text-center space-y-4"
              style={{
                background: "rgba(139,0,0,0.08)",
                borderColor: "rgba(139,0,0,0.35)",
              }}
            >
              <div className="text-5xl select-none">☽</div>
              <h2
                className="text-3xl text-[#d4af37]"
                style={{ fontFamily: "serif" }}
              >
                Caído
              </h2>
              <p className="text-sm text-[#8b7355] leading-relaxed">
                Tu fe fue quebrantada por las tinieblas.
                <br />
                Vuelve a intentarlo.
              </p>
              <button
                onClick={() => navigate("/map")}
                className="w-full py-3 rounded-lg border transition-all active:scale-95"
                style={{
                  background: "transparent",
                  borderColor: "rgba(212,175,55,0.30)",
                  color: "#d4af37",
                  fontFamily: "serif",
                  fontSize: "1rem",
                }}
              >
                Volver al mapa
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── COMBATE ── */}
        {gamePhase === "combat" && (
          <>
            {/* Battlefield */}
            <div className="grid grid-cols-2 gap-3">

              {/* Tarjeta del jugador */}
              <motion.div
                animate={
                  shakeTarget === "player"
                    ? { x: [-7, 7, -5, 5, -3, 3, 0] }
                    : {}
                }
                transition={{ duration: 0.45 }}
                className="rounded-xl border p-3 flex flex-col items-center gap-2 overflow-hidden"
                style={{
                  background: flashRed
                    ? "rgba(139,0,0,0.18)"
                    : "rgba(15,12,8,0.92)",
                  borderColor: flashRed
                    ? "rgba(220,38,38,0.45)"
                    : "rgba(212,175,55,0.14)",
                  boxShadow: flashRed
                    ? "0 0 22px rgba(139,0,0,0.25)"
                    : "none",
                  transition: "background 0.3s, border-color 0.3s, box-shadow 0.3s",
                }}
              >
                {/* Símbolo del jugador */}
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center border"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(212,175,55,0.20) 0%, transparent 100%)",
                    borderColor: "rgba(212,175,55,0.28)",
                    boxShadow: "0 0 12px rgba(212,175,55,0.12)",
                  }}
                >
                  <span style={{ fontSize: "1.55rem", lineHeight: 1 }}>🜂</span>
                </div>

                <div className="text-center">
                  <div
                    className="text-xs text-[#d4af37]"
                    style={{ fontFamily: "serif", fontWeight: 700 }}
                  >
                    Sariel
                  </div>
                  <div className="text-xs text-[#8b7355]">Guerrero</div>
                </div>

                {/* Barra de Fe */}
                <div className="w-full space-y-1">
                  <div className="flex justify-between">
                    <span className="text-xs text-[#8b7355]">Fe</span>
                    <span className="text-xs text-[#d4af37]">{playerHp}</span>
                  </div>
                  <div
                    className="w-full rounded-full overflow-hidden"
                    style={{
                      height: "4px",
                      background: "rgba(74,222,128,0.10)",
                    }}
                  >
                    <motion.div
                      className="h-full rounded-full"
                      style={{
                        background: "linear-gradient(90deg, #4ade80, #22c55e)",
                        boxShadow: "0 0 6px rgba(74,222,128,0.40)",
                      }}
                      animate={{ width: `${playerHp}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>
              </motion.div>

              {/* Tarjeta del enemigo */}
              <motion.div
                animate={
                  shakeTarget === "enemy"
                    ? { x: [-7, 7, -5, 5, -3, 3, 0] }
                    : {}
                }
                transition={{ duration: 0.45 }}
                className="rounded-xl border p-3 flex flex-col items-center gap-2 overflow-hidden"
                style={{
                  background: flashGold
                    ? "rgba(212,175,55,0.10)"
                    : "rgba(15,12,8,0.92)",
                  borderColor: flashGold
                    ? "rgba(212,175,55,0.45)"
                    : "rgba(139,0,0,0.28)",
                  boxShadow: flashGold
                    ? "0 0 26px rgba(212,175,55,0.22)"
                    : "0 0 14px rgba(139,0,0,0.12)",
                  transition: "background 0.3s, border-color 0.3s, box-shadow 0.3s",
                }}
              >
                {/* Símbolo del enemigo */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={encounter.id}
                    initial={{ scale: 0.7, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.7, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="w-12 h-12 rounded-full flex items-center justify-center border"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(139,0,0,0.30) 0%, transparent 100%)",
                      borderColor: "rgba(139,0,0,0.40)",
                    }}
                  >
                    <span
                      className="text-[#d4af37] select-none"
                      style={{
                        fontFamily: "serif",
                        fontSize: "1.5rem",
                        lineHeight: 1,
                      }}
                    >
                      {encounter.enemySymbol}
                    </span>
                  </motion.div>
                </AnimatePresence>

                <div className="text-center">
                  <div
                    className="text-xs text-[#d4af37]"
                    style={{ fontFamily: "serif", fontWeight: 700 }}
                  >
                    {encounter.enemyName}
                  </div>
                  <div className="text-xs text-[#8b7355] leading-tight text-center">
                    {encounter.enemySubtitle}
                  </div>
                </div>

                {/* Barra de Fortaleza */}
                <div className="w-full space-y-1">
                  <div className="flex justify-between">
                    <span className="text-xs text-[#8b7355]">Fortaleza</span>
                    <span className="text-xs text-[#d4af37]">{enemyHp}</span>
                  </div>
                  <div
                    className="w-full rounded-full overflow-hidden"
                    style={{
                      height: "4px",
                      background: "rgba(139,0,0,0.15)",
                    }}
                  >
                    <motion.div
                      className="h-full rounded-full"
                      style={{
                        background: "linear-gradient(90deg, #8b0000, #dc2626)",
                        boxShadow: "0 0 6px rgba(220,38,38,0.40)",
                      }}
                      animate={{ width: `${enemyHp}%` }}
                      transition={{ duration: 0.6 }}
                    />
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Mensaje de resultado */}
            <AnimatePresence>
              {resultMsg && (
                <motion.p
                  key={resultMsg}
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.3 }}
                  className="text-center text-sm tracking-wide"
                  style={{
                    color: flashGold ? "#d4af37" : "#f87171",
                    fontFamily: "serif",
                    textShadow: flashGold
                      ? "0 0 12px rgba(212,175,55,0.50)"
                      : "none",
                  }}
                >
                  {resultMsg}
                </motion.p>
              )}
            </AnimatePresence>

            {/* Tarjeta del versículo */}
            <AnimatePresence mode="wait">
              <motion.div
                key={encounter.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="rounded-xl border p-4 space-y-2"
                style={{
                  background: "rgba(15,12,8,0.92)",
                  borderColor: "rgba(212,175,55,0.14)",
                }}
              >
                <span
                  className="inline-block px-3 py-0.5 rounded-full text-xs text-[#8b7355] border"
                  style={{
                    background: "rgba(212,175,55,0.05)",
                    borderColor: "rgba(212,175,55,0.14)",
                  }}
                >
                  {encounter.verse}
                </span>
                <p
                  className="text-base text-[#d4af37] leading-snug"
                  style={{ fontFamily: "serif" }}
                >
                  {encounter.question}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Opciones de respuesta */}
            <div className="grid grid-cols-1 gap-2 pb-2">
              {encounter.answers.map((answer) => {
                const isSelected = selectedId === answer.id;
                const showResult = hasAnswered && isSelected;

                return (
                  <motion.button
                    key={`${encounter.id}-${answer.id}`}
                    onClick={() => handleAnswer(answer.id)}
                    disabled={hasAnswered}
                    whileTap={!hasAnswered ? { scale: 0.97 } : {}}
                    animate={
                      showResult
                        ? answer.correct
                          ? { scale: [1, 1.03, 1] }
                          : { x: [-5, 5, -4, 4, -2, 2, 0] }
                        : {}
                    }
                    transition={{ duration: 0.35 }}
                    className="py-3 px-4 rounded-lg text-left border transition-colors"
                    style={{
                      background: showResult
                        ? answer.correct
                          ? "rgba(74,222,128,0.10)"
                          : "rgba(220,38,38,0.10)"
                        : "rgba(15,12,8,0.88)",
                      borderColor: showResult
                        ? answer.correct
                          ? "rgba(74,222,128,0.45)"
                          : "rgba(220,38,38,0.45)"
                        : "rgba(212,175,55,0.18)",
                      color: showResult
                        ? answer.correct
                          ? "#4ade80"
                          : "#f87171"
                        : "#d4af37",
                      cursor: hasAnswered ? "not-allowed" : "pointer",
                      fontFamily: "serif",
                      fontSize: "0.95rem",
                      boxShadow:
                        showResult && answer.correct
                          ? "0 0 14px rgba(74,222,128,0.18)"
                          : showResult && !answer.correct
                          ? "0 0 14px rgba(220,38,38,0.18)"
                          : "none",
                    }}
                  >
                    {answer.text}
                  </motion.button>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
