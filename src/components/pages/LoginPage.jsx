import { useState } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '@/contexts/AuthContext'
import { toast } from 'react-toastify'
import Input from '@/components/atoms/Input'
import Button from '@/components/atoms/Button'
import ApperIcon from '@/components/ApperIcon'

const LoginPage = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' })
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!credentials.email || !credentials.password) {
      toast.error('Veuillez remplir tous les champs')
      return
    }

    setIsLoading(true)
    try {
      await login(credentials.email, credentials.password)
      toast.success('Connexion réussie!')
    } catch (error) {
      toast.error(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field) => (e) => {
    setCredentials(prev => ({
      ...prev,
      [field]: e.target.value
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream via-paper to-cream flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            className="w-16 h-16 bg-gradient-to-r from-coral to-red-500 rounded-full flex items-center justify-center shadow-lg mx-auto mb-4"
          >
            <ApperIcon name="Brain" size={32} className="text-white" />
          </motion.div>
          
          <motion.h1
            className="text-4xl md:text-5xl font-kalam text-transparent bg-clip-text bg-gradient-to-r from-midnight via-warmBrown to-coral mb-2"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            Enigmots
          </motion.h1>
          
          <p className="text-midnight/70 font-crimson text-lg">
            Connectez-vous pour jouer
          </p>
        </div>

        {/* Login Form */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="bg-paper/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-warmBrown/20 relative overflow-hidden"
        >
          {/* Paper texture overlay */}
          <div className="absolute inset-0 bg-paper-texture opacity-30 pointer-events-none" />
          
          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            <div>
              <label className="block text-midnight font-crimson text-sm mb-2 ml-1">
                Email
              </label>
              <Input
                type="email"
                value={credentials.email}
                onChange={handleInputChange('email')}
                placeholder="votre@email.com"
                disabled={isLoading}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-midnight font-crimson text-sm mb-2 ml-1">
                Mot de passe
              </label>
              <Input
                type="password"
                value={credentials.password}
                onChange={handleInputChange('password')}
                placeholder="••••••••"
                disabled={isLoading}
                className="w-full"
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full"
              size="lg"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <ApperIcon name="Loader2" size={20} className="animate-spin" />
                  <span>Connexion...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-2">
                  <ApperIcon name="LogIn" size={20} />
                  <span>Se connecter</span>
                </div>
              )}
            </Button>
          </form>

        </motion.div>
      </motion.div>
    </div>
  )
}

export default LoginPage