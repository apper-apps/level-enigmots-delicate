import { motion } from "framer-motion"
import Card from "@/components/atoms/Card"

const RiddleCard = ({ riddle, isAnswered, showAnimation }) => {
  if (!riddle) return null

  return (
    <motion.div
      key={riddle.Id}
      initial={{ opacity: 0, rotateY: -90 }}
      animate={{ opacity: 1, rotateY: 0 }}
      exit={{ opacity: 0, rotateY: 90 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="w-full"
    >
      <Card className="p-8 bg-paper/95 backdrop-blur-sm ruled-lines binding-holes relative">
        <div className="ml-12">
          <div className="mb-6">
            <div className="text-warmBrown text-sm font-crimson mb-2">
              Énigme #{riddle.Id}
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-2xl md:text-3xl font-kalam text-midnight leading-relaxed mb-8">
              {riddle.text}
            </p>
            
            {isAnswered && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="bg-gradient-to-r from-success to-green-600 text-white px-6 py-3 rounded-xl font-kalam text-xl shadow-lg"
              >
                Réponse: {riddle.answer}
              </motion.div>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  )
}

export default RiddleCard