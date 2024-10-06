import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { GoogleOAuthProvider } from '@react-oauth/google'
import App from './App.jsx'
import './index.css'
import SmoothScrolling from './Components/SmoothScrolling.jsx'
import { Config } from '../API/Config.js'
import UserContextProvider from './Context/UserContextProvider.jsx'

// Get Google Client ID from environment variables
const GOOGLE_CLIENT_ID = Config.GoogleClientId;

// Create root and render app
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <SmoothScrolling>
        <UserContextProvider>
        <App />
        </UserContextProvider>        
      </SmoothScrolling>
    </GoogleOAuthProvider>
  </StrictMode>,
)