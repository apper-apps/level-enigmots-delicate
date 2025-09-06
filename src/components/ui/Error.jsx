import { motion } from "framer-motion"
import Button from "@/components/atoms/Button"
import ApperIcon from "@/components/ApperIcon"

const Error = ({ message = "Une erreur s'est produite", onRetry }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="min-h-[400px] flex items-center justify-center p-6"
    >
      <div className="text-center space-y-6 max-w-md mx-auto">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-20 h-20 mx-auto bg-gradient-to-r from-error to-red-600 rounded-full flex items-center justify-center shadow-lg"
        >
          <ApperIcon name="AlertCircle" size={40} className="text-white" />
        </motion.div>
        
        <div className="bg-paper/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-error/20">
          <h2 className="text-2xl font-kalam text-midnight mb-4">
            Oups ! Un problème est survenu
          </h2>
          
          <p className="text-warmBrown font-crimson mb-6 leading-relaxed">
            {message}
          </p>
          
          <motion.div
            className="text-6xl mb-6"
            animate={{ rotate: [0, -10, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 2 }}
          >
            🤔
          </motion.div>
          
          {onRetry && (
            <Button
              onClick={onRetry}
              variant="default"
              size="lg"
              className="min-w-[160px]"
            >
              <ApperIcon name="RefreshCw" size={20} className="mr-2" />
              Réessayer
            </Button>
          )}
        </div>
        
        <motion.p
          className="text-sm font-crimson text-warmBrown/70"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Vérifiez votre connexion et réessayez
        </motion.p>
      </div>
    </motion.div>
  )
}

export default Error