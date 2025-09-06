import { motion } from "framer-motion"
import ApperIcon from "@/components/ApperIcon"

const Loading = () => {
  return (
    <div className="min-h-[400px] flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="text-center space-y-6"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 mx-auto bg-gradient-to-r from-coral to-red-500 rounded-full flex items-center justify-center shadow-lg"
        >
          <ApperIcon name="Brain" size={32} className="text-white" />
        </motion.div>
        
        <div className="space-y-4">
          <div className="bg-paper/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-warmBrown/20 max-w-md mx-auto">
            <div className="space-y-3">
              <div className="h-4 bg-gradient-to-r from-warmBrown/30 to-transparent rounded animate-pulse" />
              <div className="h-6 bg-gradient-to-r from-midnight/20 to-transparent rounded animate-pulse" />
              <div className="h-4 bg-gradient-to-r from-coral/30 to-transparent rounded animate-pulse w-3/4" />
            </div>
          </div>
          
          <motion.p
            className="text-lg font-kalam text-warmBrown"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            Préparation des énigmes...
          </motion.p>
        </div>
      </motion.div>
    </div>
  )
}

export default Loading