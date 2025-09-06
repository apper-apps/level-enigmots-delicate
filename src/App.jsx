import { Routes, Route, Navigate } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import { useAuth } from "@/contexts/AuthContext"
import GamePage from "@/components/pages/GamePage"
import LoginPage from "@/components/pages/LoginPage"
import Loading from "@/components/ui/Loading"

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth()
  
  if (isLoading) {
    return <Loading />
  }
  
  return isAuthenticated ? children : <Navigate to="/login" replace />
}
function App() {
return (
<div className="min-h-screen bg-gradient-to-br from-cream via-paper to-cream">
<Routes>
<Route path="/login" element={<LoginPage />} />
<Route path="/" element={
  <ProtectedRoute>
    <GamePage />
  </ProtectedRoute>
} />
<Route path="*" element={<Navigate to="/" replace />} />
</Routes>
      
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  )
}

export default App