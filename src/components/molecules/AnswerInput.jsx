import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import Input from "@/components/atoms/Input"
import Button from "@/components/atoms/Button"
import ApperIcon from "@/components/ApperIcon"

const AnswerInput = ({ 
  onSubmit, 
  disabled = false, 
  showFeedback, 
  isCorrect, 
  placeholder = "Tapez votre réponse..."
}) => {
  const [answer, setAnswer] = useState("")
  const [isShaking, setIsShaking] = useState(false)
  const inputRef = useRef(null)

  useEffect(() => {
    if (showFeedback && !isCorrect) {
      setIsShaking(true)
      setTimeout(() => setIsShaking(false), 500)
    }
  }, [showFeedback, isCorrect])

  useEffect(() => {
    if (!disabled && inputRef.current) {
      inputRef.current.focus()
    }
  }, [disabled])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (answer.trim() && !disabled) {
      onSubmit(answer.trim())
      if (!showFeedback || isCorrect) {
        setAnswer("")
      }
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e)
    }
  }

  return (
    <motion.div
      className={`w-full ${isShaking ? "animate-shake" : ""}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative">
          <Input
            ref={inputRef}
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={placeholder}
            disabled={disabled}
            className="text-xl md:text-2xl py-4 px-2"
            autoComplete="off"
            autoCorrect="off"
            spellCheck="false"
          />
          
          {showFeedback && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -right-2 top-1/2 transform -translate-y-1/2"
            >
              {isCorrect ? (
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-success to-green-600 flex items-center justify-center">
                  <ApperIcon name="Check" size={20} className="text-white" />
                </div>
              ) : (
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-error to-red-600 flex items-center justify-center">
                  <ApperIcon name="X" size={20} className="text-white" />
                </div>
              )}
            </motion.div>
          )}
        </div>
        
        <div className="flex justify-center">
          <Button 
            type="submit" 
            disabled={!answer.trim() || disabled}
            size="lg"
            className="min-w-[150px]"
          >
            <ApperIcon name="Send" size={20} className="mr-2" />
            Valider
          </Button>
        </div>
      </form>
    </motion.div>
  )
}

export default AnswerInput