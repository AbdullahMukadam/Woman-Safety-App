
import './App.css'
import Home from './Components/Home/Home'
import Navbar from './Components/Navbar'

function App() {

  return (
    <div className='w-screen min-h-screen bg-white flex flex-col'>
      <Navbar />
      <Home />
    </div>
  )
}

export default App
