import { motion } from "framer-motion"
import Button from "@/components/atoms/Button"
import ApperIcon from "@/components/ApperIcon"

const Empty = ({ 
  title = "Aucune énigme disponible",
  message = "Il semblerait que toutes les énigmes soient parties se cacher !",
  onAction,
  actionLabel = "Actualiser"
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-[400px] flex items-center justify-center p-6"
    >
      <div className="text-center space-y-6 max-w-md mx-auto">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-20 h-20 mx-auto bg-gradient-to-r from-warmBrown to-amber-700 rounded-full flex items-center justify-center shadow-lg"
        >
          <ApperIcon name="BookOpen" size={40} className="text-white" />
        </motion.div>
        
        <div className="bg-paper/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-warmBrown/20 ruled-lines relative">
          <div className="ml-6">
            <motion.div
              className="text-6xl mb-6"
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, 5, -5, 0] 
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            >
              🕵️‍♂️
            </motion.div>
            
            <h2 className="text-2xl font-kalam text-midnight mb-4">
              {title}
            </h2>
            
            <p className="text-warmBrown font-crimson mb-6 leading-relaxed">
              {message}
            </p>
            
            <motion.div
              className="text-4xl mb-6"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              💭
            </motion.div>
            
            {onAction && (
              <Button
                onClick={onAction}
                variant="default"
                size="lg"
                className="min-w-[160px]"
              >
                <ApperIcon name="RefreshCw" size={20} className="mr-2" />
                {actionLabel}
              </Button>
            )}
          </div>
        </div>
        
        <motion.p
          className="text-sm font-crimson text-warmBrown/70"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Les meilleures énigmes valent la peine d'attendre !
        </motion.p>
      </div>
    </motion.div>
  )
}

export default Empty