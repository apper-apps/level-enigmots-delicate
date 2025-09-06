import { motion, AnimatePresence } from "framer-motion"
import Card from "@/components/atoms/Card"
import ApperIcon from "@/components/ApperIcon"

const HintDisplay = ({ hints, currentHintLevel }) => {
  const visibleHints = hints.slice(0, currentHintLevel)

  return (
    <AnimatePresence>
      {visibleHints.length > 0 && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="w-full"
        >
          <Card className="p-6 bg-gradient-to-br from-info/10 to-blue-50/50 border-info/30">
            <div className="flex items-center mb-4">
              <ApperIcon name="Lightbulb" size={20} className="text-info mr-2" />
              <h3 className="font-kalam text-lg text-midnight">
                {visibleHints.length === 1 ? "Indice" : "Indices"}
              </h3>
            </div>
            
            <div className="space-y-3">
              {visibleHints.map((hint, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex items-start space-x-3 p-3 bg-white/50 rounded-lg border border-info/20"
                >
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-info to-blue-600 flex items-center justify-center flex-shrink-0 text-white text-sm font-bold">
                    {index + 1}
                  </div>
                  <p className="font-crimson text-midnight leading-relaxed">
                    {hint}
                  </p>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default HintDisplay