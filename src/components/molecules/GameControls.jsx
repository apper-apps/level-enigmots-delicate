import { motion } from "framer-motion"
import Button from "@/components/atoms/Button"
import ApperIcon from "@/components/ApperIcon"

const GameControls = ({ 
  onNextRiddle, 
  onSkipRiddle,
  onRestart,
  canProceed = false,
  isGameComplete = false,
  showSkip = true 
}) => {
  if (isGameComplete) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex justify-center"
      >
        <Button onClick={onRestart} size="lg">
          <ApperIcon name="RotateCcw" size={20} className="mr-2" />
          Recommencer
        </Button>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col sm:flex-row items-center justify-center gap-4"
    >
      {showSkip && (
        <Button
          onClick={onSkipRiddle}
          variant="ghost"
          size="default"
          className="order-2 sm:order-1"
        >
          <ApperIcon name="Skip" size={18} className="mr-2" />
          Passer
        </Button>
      )}
      
      {canProceed && (
        <Button
          onClick={onNextRiddle}
          size="lg"
          className="order-1 sm:order-2 min-w-[160px]"
        >
          <ApperIcon name="ArrowRight" size={20} className="mr-2" />
          Suivant
        </Button>
      )}
    </motion.div>
  )
}

export default GameControls