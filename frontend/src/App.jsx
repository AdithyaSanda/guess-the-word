import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import PlayerDashboard from "./pages/PlayerDashboard"
import Game from "./pages/Game"
import AdminDashboard from "./pages/AdminDashboard"

function App() {

  
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/register" element={<Register />}/>
        <Route path="/player" element={<PlayerDashboard />}/>
        <Route path="/admin" element={<AdminDashboard />}/>
        <Route path="/game/:gameId" element={<Game />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
