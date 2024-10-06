import { BrowserRouter, Route, Routes } from "react-router-dom"
import './App.css'
import Home from './Components/Home/Home'
import Login from './Components/Login'
import Navbar from './Components/Navbar'
import Signup from './Components/Signup'
import AfterLogin from "./Components/Home/AfterLogin"
import ProtectedRoute from "./Components/ProtectedRoute"
import Map from "./Components/Map"


function App() {


  return (

    <div className='w-screen min-h-screen bg-white flex flex-col'>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Signup />} />
          <Route path='/HomePage' 
          element={
            <ProtectedRoute>
             <AfterLogin />
            </ProtectedRoute>

          }
          />
          <Route path="/map" element={<Map />} />
        </Routes>
      </BrowserRouter>
    </div>


  )
}

export default App
