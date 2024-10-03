
import './App.css'
import Home from './Components/Home/Home'
import Login from './Components/Login'
import Navbar from './Components/Navbar'
import Signup from './Components/Signup'

function App() {

  return (
    <div className='w-screen min-h-screen bg-white flex flex-col'>
      <Navbar />
      <Signup />
    </div>
  )
}

export default App
