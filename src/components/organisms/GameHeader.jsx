import { motion } from "framer-motion"
import { useAuth } from "@/contexts/AuthContext"
import { toast } from "react-toastify"
import ApperIcon from "@/components/ApperIcon"
import Button from "@/components/atoms/Button"
const GameHeader = () => {
const { user, logout } = useAuth()

const handleLogout = () => {
logout()
toast.success('Déconnexion réussie!')
}

return (
    <motion.header
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
className="text-center mb-8"
>
{/* User info bar */}
<div className="flex items-center justify-between mb-6 bg-paper/50 backdrop-blur-sm rounded-xl px-4 py-3 border border-warmBrown/20">
<div className="flex items-center space-x-3">
{user?.avatar && (
<img 
src={user.avatar} 
alt={user.name}
className="w-10 h-10 rounded-full border-2 border-warmBrown/30"
/>
)}
<div className="text-left">
<p className="font-crimson text-midnight font-semibold text-sm">
Bienvenue, {user?.name}!
</p>
<p className="font-crimson text-midnight/60 text-xs">
{user?.role === 'admin' ? 'Administrateur' : 'Joueur'}
</p>
</div>
</div>
<Button
variant="ghost"
size="sm"
onClick={handleLogout}
className="text-midnight hover:text-coral"
>
<ApperIcon name="LogOut" size={16} className="mr-1" />
Déconnexion
</Button>
</div>

<div className="flex items-center justify-center space-x-3 mb-4">
<motion.div
animate={{ rotate: [0, 10, -10, 0] }}
transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
className="w-12 h-12 bg-gradient-to-r from-coral to-red-500 rounded-full flex items-center justify-center shadow-lg"
>
<ApperIcon name="Brain" size={28} className="text-white" />
</motion.div>

<motion.h1
className="text-5xl md:text-6xl font-kalam text-transparent bg-clip-text bg-gradient-to-r from-midnight via-warmBrown to-coral"
initial={{ scale: 0.9 }}
animate={{ scale: 1 }}
transition={{ duration: 0.4, delay: 0.2 }}
>
Enigmots
</motion.h1>

<motion.div
animate={{ scale: [1, 1.1, 1] }}
transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
className="w-12 h-12 bg-gradient-to-r from-warning to-orange-500 rounded-full flex items-center justify-center shadow-lg"
>
<ApperIcon name="Lightbulb" size={28} className="text-white" />
</motion.div>
</div>
      
      <motion.p
        className="text-lg md:text-xl font-crimson text-warmBrown max-w-md mx-auto leading-relaxed"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        Déchiffrez les énigmes, découvrez les mots mystères et exercez votre esprit !
      </motion.p>
      
      <motion.div
        className="mt-6 flex justify-center space-x-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        {["🧩", "💭", "✨"].map((emoji, index) => (
          <motion.span
            key={emoji}
            className="text-2xl"
            animate={{ y: [0, -5, 0] }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity, 
              delay: index * 0.2 
            }}
          >
            {emoji}
          </motion.span>
        ))}
      </motion.div>
    </motion.header>
  )
}

export default GameHeader