import { motion } from "framer-motion"
import Button from "@/components/atoms/Button"
import ApperIcon from "@/components/ApperIcon"

const HintButton = ({ 
  onHintRequest, 
  currentHintLevel, 
  maxHints = 3, 
  disabled = false 
}) => {
  const hasMoreHints = currentHintLevel < maxHints

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center space-y-2"
    >
      <Button
        onClick={onHintRequest}
        disabled={!hasMoreHints || disabled}
        variant="secondary"
        size="default"
        className="min-w-[140px]"
      >
        <ApperIcon name="Lightbulb" size={20} className="mr-2" />
        Indice
      </Button>
      
      <div className="flex items-center space-x-1">
        {Array.from({ length: maxHints }, (_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full transition-colors duration-300 ${
              i < currentHintLevel 
                ? "bg-gradient-to-r from-warning to-orange-500" 
                : "bg-warmBrown/30"
            }`}
          />
        ))}
      </div>
      
      <p className="text-xs text-warmBrown font-crimson">
        {currentHintLevel}/{maxHints} indices utilisés
      </p>
    </motion.div>
  )
}

export default HintButton