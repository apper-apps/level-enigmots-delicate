import { motion } from "framer-motion"
import GameHeader from "@/components/organisms/GameHeader"
import GameEngine from "@/components/organisms/GameEngine"

const GamePage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-gradient-to-br from-cream via-paper to-cream bg-paper-texture"
    >
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <GameHeader />
        <GameEngine />
      </div>
      
      {/* Decorative elements */}
      <div className="fixed top-10 left-10 w-20 h-20 bg-gradient-to-br from-coral/20 to-red-500/20 rounded-full blur-xl animate-pulse" />
      <div className="fixed bottom-10 right-10 w-16 h-16 bg-gradient-to-br from-warning/20 to-orange-500/20 rounded-full blur-lg animate-pulse" />
      <div className="fixed top-1/2 right-20 w-12 h-12 bg-gradient-to-br from-info/20 to-blue-500/20 rounded-full blur-lg animate-pulse" />
    </motion.div>
  )
}

export default GamePage