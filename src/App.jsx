import { Routes, Route } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import GamePage from "@/components/pages/GamePage"

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cream via-paper to-cream">
      <Routes>
        <Route path="/" element={<GamePage />} />
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