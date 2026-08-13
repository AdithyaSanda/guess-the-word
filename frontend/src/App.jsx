import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import PlayerDashboard from "./pages/PlayerDashboard"
import Game from "./pages/Game"
import AdminDashboard from "./pages/AdminDashboard"
import ProtectedRoute from "./components/ProtectedRoute"

function App() {

  
  
  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path="/" 
          element={<Login />}
        />
        <Route 
          path="/register" 
          element={<Register />}
        />
        <Route 
          path="/player" 
          element={
            <ProtectedRoute allowedRole={"PLAYER"}>
              <PlayerDashboard />
            </ProtectedRoute>
          }
        />
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute allowedRole={"ADMIN"}> 
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route 
          path="/game/:gameId" 
          element={
            <ProtectedRoute allowedRole={"PLAYER"}>
              <Game />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
