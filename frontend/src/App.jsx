import { BrowserRouter, Route, Routes } from "react-router-dom"
import './App.css'
import Home from './Components/Home/Home'
import Login from './Components/Login'
import Navbar from './Components/Navbar'
import Signup from './Components/Signup'
import AfterLogin from "./Components/Home/AfterLogin"
import ProtectedRoute from "./Components/ProtectedRoute"
import Map from "./Components/Map"
import Reviews from "./Components/Reviews"

function App() {
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
              element={<AfterLogin/>}
              /* {
                <ProtectedRoute>
                  <AfterLogin />
                </ProtectedRoute>
              } */
            />
            <Route path="/map" element={<Map/>}  /* {
              <ProtectedRoute>
                <Map />
              </ProtectedRoute>
            } */ />
            <Route path="/reviews" element={<Reviews/>}  /* {
              <ProtectedRoute>
                <Reviews />
              </ProtectedRoute>
            } */ />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App