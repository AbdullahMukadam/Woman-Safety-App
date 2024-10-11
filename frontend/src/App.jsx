import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom"
import './App.css'
import Home from './Components/Home/Home'
import Login from './Components/Login'
import Navbar from './Components/Navbar'
import Signup from './Components/Signup'
import AfterLogin from "./Components/Home/AfterLogin"
import ProtectedRoute from "./Components/ProtectedRoute"
import Map from "./Components/Map"
import Reviews from "./Components/Reviews"
import Profile from "./Components/Profile"
import Settings from "./Components/Settings"
import { useContext, useEffect } from "react"
import { AuthContext } from "./Context/AuthContext"

function App() {
  const { auth } = useContext(AuthContext)


  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 pt-[7px]">
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Signup />} />
            <Route path='/HomePage'
              element=
              {
                <ProtectedRoute>
                  <AfterLogin />
                </ProtectedRoute>
              }
            />
            <Route path="/map" element={
              <ProtectedRoute>
                <Map />
              </ProtectedRoute>
            } />
            <Route path="/reviews" element={
              <ProtectedRoute>
                <Reviews />
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />
            <Route path="/settings" element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            } />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App