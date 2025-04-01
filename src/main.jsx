import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { GoogleOAuthProvider } from '@react-oauth/google';
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
 <GoogleOAuthProvider clientId='151193059285-r9d8q97is7qo0cgutufq2ndhld5mt78d.apps.googleusercontent.com'>
  <StrictMode>
    <App />
  </StrictMode>
  </GoogleOAuthProvider>
)
