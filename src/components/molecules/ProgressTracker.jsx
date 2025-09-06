import { motion } from "framer-motion"
import Badge from "@/components/atoms/Badge"
import ApperIcon from "@/components/ApperIcon"

const ProgressTracker = ({ 
  currentRiddleNumber, 
  totalRiddles, 
  score, 
  totalHintsUsed,
  streak = 0 
}) => {
  const progressPercentage = (currentRiddleNumber / totalRiddles) * 100

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full bg-paper/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-warmBrown/20"
    >
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
        <div className="flex items-center space-x-3">
          <Badge variant="default">
            <ApperIcon name="Trophy" size={16} className="mr-1" />
            Score: {score}
          </Badge>
          
          {streak > 1 && (
            <Badge variant="success">
              <ApperIcon name="Zap" size={16} className="mr-1" />
              Série: {streak}
            </Badge>
          )}
        </div>
        
        <div className="flex items-center space-x-3">
          <Badge variant="outline">
            <ApperIcon name="Lightbulb" size={16} className="mr-1" />
            Indices: {totalHintsUsed}
          </Badge>
          
          <Badge variant="default">
            {currentRiddleNumber}/{totalRiddles}
          </Badge>
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm font-crimson text-warmBrown">Progression</span>
          <span className="text-sm font-kalam text-midnight font-bold">
            {Math.round(progressPercentage)}%
          </span>
        </div>
        
        <div className="w-full bg-warmBrown/20 rounded-full h-3 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-coral to-red-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        </div>
      </div>
    </motion.div>
  )
}

export default ProgressTracker