
import './App.css'
import Home from './Components/Home/Home'
import Login from './Components/Login'
import Navbar from './Components/Navbar'
import Signup from './Components/Signup'
import UserContextProvider from './Context/UserContextProvider'

function App() {

  return (
    <UserContextProvider >
      <div className='w-screen min-h-screen bg-white flex flex-col'>
        <Navbar />
        <Signup />
      </div>
    </UserContextProvider>

  )
}

export default App
