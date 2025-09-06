import mockUsers from '@/services/mockData/users.json'

class UserService {
  constructor() {
    this.users = [...mockUsers]
    this.currentUser = this.getCurrentUserFromStorage()
  }

  // Get current user from localStorage
  getCurrentUserFromStorage() {
    try {
      const stored = localStorage.getItem('enigmots_current_user')
      return stored ? JSON.parse(stored) : null
    } catch (error) {
      console.error('Error loading user from storage:', error)
      localStorage.removeItem('enigmots_current_user')
      return null
    }
  }

  // Save current user to localStorage
  saveCurrentUserToStorage(user) {
    try {
      if (user) {
        localStorage.setItem('enigmots_current_user', JSON.stringify(user))
      } else {
        localStorage.removeItem('enigmots_current_user')
      }
    } catch (error) {
      console.error('Error saving user to storage:', error)
    }
  }

  // Authenticate user
  async authenticate(email, password) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = this.users.find(u => 
          u.email === email && u.password === password
        )

        if (user) {
          const authenticatedUser = {
            Id: user.Id,
            name: user.name,
            email: user.email,
            role: user.role,
            avatar: user.avatar,
            lastLogin: new Date().toISOString()
          }
          
          this.currentUser = authenticatedUser
          this.saveCurrentUserToStorage(authenticatedUser)
          resolve(authenticatedUser)
        } else {
          reject(new Error('Email ou mot de passe incorrect'))
        }
      }, 800) // Simulate network delay
    })
  }

  // Get current authenticated user
  getCurrentUser() {
    return this.currentUser
  }

  // Check if user is authenticated
  isAuthenticated() {
    return this.currentUser !== null
  }

  // Logout user
  logout() {
    this.currentUser = null
    this.saveCurrentUserToStorage(null)
  }

  // Get all users (admin only)
  getAll() {
    if (!this.currentUser || this.currentUser.role !== 'admin') {
      throw new Error('Accès non autorisé')
    }
    
    return this.users.map(user => ({
      Id: user.Id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
      createdAt: user.createdAt
    }))
  }

  // Get user by ID
  getById(id) {
    const numId = parseInt(id)
    if (isNaN(numId)) {
      throw new Error('ID utilisateur invalide')
    }

    const user = this.users.find(u => u.Id === numId)
    if (!user) {
      throw new Error('Utilisateur non trouvé')
    }

    return {
      Id: user.Id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
      createdAt: user.createdAt
    }
  }
}

// Create and export singleton instance
const userService = new UserService()
export default userService