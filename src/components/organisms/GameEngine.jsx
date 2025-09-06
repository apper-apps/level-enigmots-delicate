import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { toast } from "react-toastify"
import { riddleService } from "@/services/api/riddleService"
import RiddleCard from "@/components/molecules/RiddleCard"
import AnswerInput from "@/components/molecules/AnswerInput"
import HintButton from "@/components/molecules/HintButton"
import HintDisplay from "@/components/molecules/HintDisplay"
import GameControls from "@/components/molecules/GameControls"
import ProgressTracker from "@/components/molecules/ProgressTracker"
import Loading from "@/components/ui/Loading"
import Error from "@/components/ui/Error"
import Empty from "@/components/ui/Empty"

const GameEngine = () => {
  const [riddles, setRiddles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  
  // Game state
  const [currentRiddleIndex, setCurrentRiddleIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [totalHintsUsed, setTotalHintsUsed] = useState(0)
  const [currentHintLevel, setCurrentHintLevel] = useState(0)
  const [isAnswered, setIsAnswered] = useState(false)
  const [showFeedback, setShowFeedback] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [streak, setStreak] = useState(0)

  const currentRiddle = riddles[currentRiddleIndex]
  const isGameComplete = currentRiddleIndex >= riddles.length

  const loadRiddles = useCallback(async () => {
    try {
      setLoading(true)
      setError("")
      const data = await riddleService.getAll()
      setRiddles(data)
    } catch (err) {
      setError("Erreur lors du chargement des énigmes")
      console.error("Error loading riddles:", err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadRiddles()
  }, [loadRiddles])

  const resetRiddleState = () => {
    setCurrentHintLevel(0)
    setIsAnswered(false)
    setShowFeedback(false)
    setIsCorrect(false)
  }

  const handleAnswerSubmit = (answer) => {
    if (!currentRiddle || isAnswered) return

    const normalizedAnswer = answer.toLowerCase().trim()
    const normalizedCorrectAnswer = currentRiddle.answer.toLowerCase().trim()
    const correct = normalizedAnswer === normalizedCorrectAnswer

    setIsCorrect(correct)
    setShowFeedback(true)

    if (correct) {
      setIsAnswered(true)
      const basePoints = 100
      const hintPenalty = currentHintLevel * 10
      const points = Math.max(basePoints - hintPenalty, 10)
      setScore(prev => prev + points)
      setStreak(prev => prev + 1)
      
      toast.success(`Bravo ! +${points} points`)
    } else {
      setStreak(0)
      toast.error("Ce n'est pas la bonne réponse...")
      
      // Clear feedback after a short delay
      setTimeout(() => {
        setShowFeedback(false)
      }, 1500)
    }
  }

  const handleHintRequest = () => {
    if (currentHintLevel < 3 && !isAnswered) {
      setCurrentHintLevel(prev => prev + 1)
      setTotalHintsUsed(prev => prev + 1)
      toast.info("Nouvel indice ajouté !")
    }
  }

  const handleNextRiddle = () => {
    if (currentRiddleIndex < riddles.length - 1) {
      setCurrentRiddleIndex(prev => prev + 1)
      resetRiddleState()
    }
  }

  const handleSkipRiddle = () => {
    if (currentRiddleIndex < riddles.length - 1) {
      setCurrentRiddleIndex(prev => prev + 1)
      resetRiddleState()
      setStreak(0)
      toast.info("Énigme suivante...")
    }
  }

  const handleRestart = () => {
    setCurrentRiddleIndex(0)
    setScore(0)
    setTotalHintsUsed(0)
    setStreak(0)
    resetRiddleState()
    toast.success("Nouveau jeu commencé !")
  }

  if (loading) return <Loading />
  if (error) return <Error message={error} onRetry={loadRiddles} />
  if (riddles.length === 0) return <Empty />

  if (isGameComplete) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto space-y-8"
      >
        <div className="text-center bg-gradient-to-br from-success/20 to-green-100/50 p-8 rounded-2xl border border-success/30">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-6xl mb-4"
          >
            🎉
          </motion.div>
          <h1 className="text-4xl font-kalam text-midnight mb-4">
            Félicitations !
          </h1>
          <p className="text-xl font-crimson text-warmBrown mb-6">
            Vous avez terminé toutes les énigmes !
          </p>
          
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-white/50 p-4 rounded-xl">
              <div className="text-3xl font-kalam text-coral">{score}</div>
              <div className="text-sm font-crimson text-warmBrown">Points</div>
            </div>
            <div className="bg-white/50 p-4 rounded-xl">
              <div className="text-3xl font-kalam text-info">{totalHintsUsed}</div>
              <div className="text-sm font-crimson text-warmBrown">Indices</div>
            </div>
          </div>
        </div>
        
        <GameControls
          onRestart={handleRestart}
          isGameComplete={true}
        />
      </motion.div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <ProgressTracker
        currentRiddleNumber={currentRiddleIndex + 1}
        totalRiddles={riddles.length}
        score={score}
        totalHintsUsed={totalHintsUsed}
        streak={streak}
      />

      <AnimatePresence mode="wait">
        <RiddleCard
          key={currentRiddleIndex}
          riddle={currentRiddle}
          isAnswered={isAnswered}
        />
      </AnimatePresence>

      <HintDisplay
        hints={currentRiddle?.hints || []}
        currentHintLevel={currentHintLevel}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
        <div className="order-2 sm:order-1 flex justify-center">
          <HintButton
            onHintRequest={handleHintRequest}
            currentHintLevel={currentHintLevel}
            maxHints={3}
            disabled={isAnswered}
          />
        </div>
        
        <div className="order-1 sm:order-2">
          <AnswerInput
            onSubmit={handleAnswerSubmit}
            disabled={isAnswered}
            showFeedback={showFeedback}
            isCorrect={isCorrect}
            placeholder="Votre réponse..."
          />
        </div>
      </div>

      <GameControls
        onNextRiddle={handleNextRiddle}
        onSkipRiddle={handleSkipRiddle}
        canProceed={isAnswered}
        showSkip={!isAnswered}
      />
    </div>
  )
}

export default GameEngine