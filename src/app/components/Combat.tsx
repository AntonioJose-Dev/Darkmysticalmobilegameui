import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { Shield, Zap, Heart, Flame } from "lucide-react";
import { motion } from "motion/react";

export function Combat() {
  const { stageId } = useParams();
  const navigate = useNavigate();
  const [playerHealth, setPlayerHealth] = useState(100);
  const [fortressHealth, setFortressHealth] = useState(100);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [attackAnimation, setAttackAnimation] = useState(false);

  const question = {
    text: "Who led the Israelites out of Egypt?",
    verse: "Exodus 3:10",
    answers: [
      { id: 1, text: "Moses", correct: true },
      { id: 2, text: "Aaron", correct: false },
      { id: 3, text: "Joshua", correct: false },
      { id: 4, text: "David", correct: false },
    ],
  };

  const handleAnswer = (answerId: number) => {
    if (hasAnswered) return;

    setSelectedAnswer(answerId);
    setHasAnswered(true);

    const answer = question.answers.find(a => a.id === answerId);

    if (answer?.correct) {
      setAttackAnimation(true);
      setTimeout(() => {
        setFortressHealth(prev => Math.max(0, prev - 25));
        setAttackAnimation(false);
      }, 500);
    } else {
      setTimeout(() => {
        setPlayerHealth(prev => Math.max(0, prev - 15));
      }, 300);
    }

    setTimeout(() => {
      setHasAnswered(false);
      setSelectedAnswer(null);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a0a2e] via-background to-background p-4">
      <div className="max-w-md mx-auto pt-6 space-y-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl text-[#d4af37] mb-1">Stage {stageId}</h2>
          <p className="text-sm text-[#8b7355]">Spiritual Warfare</p>
        </div>

        <div className="space-y-4">
          <div className="bg-card/50 border border-[#d4af37]/30 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-[#d4af37]" />
                <span className="text-sm text-[#d4af37]">Your Faith</span>
              </div>
              <span className="text-sm text-[#d4af37]">{playerHealth}%</span>
            </div>
            <div className="w-full bg-[#1a1a24] rounded-full h-3 overflow-hidden">
              <motion.div
                className="bg-gradient-to-r from-[#4ade80] to-[#22c55e] h-full rounded-full shadow-lg shadow-green-500/50"
                initial={{ width: "100%" }}
                animate={{ width: `${playerHealth}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>

          <motion.div
            className="relative bg-gradient-to-br from-[#4a1a5c]/40 to-[#1a2a4a]/40 border-2 border-[#8b0000]/50 rounded-lg p-6 min-h-[200px] flex flex-col items-center justify-center"
            animate={attackAnimation ? { scale: [1, 0.95, 1], opacity: [1, 0.7, 1] } : {}}
            transition={{ duration: 0.5 }}
          >
            <div className="absolute top-3 left-3">
              <Flame className="w-6 h-6 text-[#8b0000]" />
            </div>
            <div className="text-center mb-4">
              <h3 className="text-xl text-[#d4af37] mb-2">Fortress of Darkness</h3>
              <div className="flex items-center justify-center gap-2">
                <Heart className="w-4 h-4 text-[#8b0000]" />
                <span className="text-[#d4af37]">{fortressHealth}%</span>
              </div>
            </div>
            <div className="w-full max-w-xs bg-[#1a1a24] rounded-full h-3 overflow-hidden">
              <motion.div
                className="bg-gradient-to-r from-[#8b0000] to-[#dc2626] h-full rounded-full shadow-lg shadow-red-900/50"
                initial={{ width: "100%" }}
                animate={{ width: `${fortressHealth}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            {attackAnimation && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: [0, 1.5, 0], opacity: [0, 1, 0] }}
                transition={{ duration: 0.5 }}
              >
                <Zap className="w-20 h-20 text-[#d4af37]" />
              </motion.div>
            )}
          </motion.div>
        </div>

        <div className="bg-card border border-[#d4af37]/30 rounded-lg p-4 space-y-4">
          <div className="text-center">
            <div className="text-xs text-[#8b7355] mb-2">{question.verse}</div>
            <h3 className="text-[#d4af37]">{question.text}</h3>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {question.answers.map((answer) => {
              const isSelected = selectedAnswer === answer.id;
              const showResult = hasAnswered && isSelected;
              const isCorrect = answer.correct;

              return (
                <button
                  key={answer.id}
                  onClick={() => handleAnswer(answer.id)}
                  disabled={hasAnswered}
                  className={`py-3 px-4 rounded-lg transition-all text-left border-2 ${
                    showResult
                      ? isCorrect
                        ? "bg-green-900/30 border-green-500 text-green-400"
                        : "bg-red-900/30 border-red-500 text-red-400"
                      : "bg-card/50 border-[#d4af37]/40 text-[#d4af37] hover:border-[#d4af37]/70 active:scale-95"
                  } ${hasAnswered ? "cursor-not-allowed opacity-70" : ""}`}
                >
                  {answer.text}
                </button>
              );
            })}
          </div>
        </div>

        {fortressHealth === 0 && (
          <div className="bg-gradient-to-r from-[#d4af37]/20 to-[#c5a028]/20 border border-[#d4af37] rounded-lg p-4 text-center">
            <h3 className="text-xl text-[#d4af37] mb-2">Victory!</h3>
            <p className="text-[#8b7355] mb-4">The fortress has fallen before your faith</p>
            <button
              onClick={() => navigate("/map")}
              className="bg-gradient-to-r from-[#d4af37] to-[#c5a028] text-[#0a0a0f] py-2 px-6 rounded-lg"
            >
              Continue
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
