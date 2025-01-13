import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import './bootstrap.min.css'
import ContextAPI from './contexts/ContextAPI.jsx'
import AuthContext from './contexts/AuthContext.jsx'



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContext>
      <ContextAPI>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ContextAPI>
    </AuthContext>
  </StrictMode>
)
