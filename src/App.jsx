import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Auth from './pages/Auth'
import Dashboard from './pages/Dashboard'
import Projects from './pages/Projects'
import Footer from './components/Footer'

import { useContext } from 'react'
import { AuthenticationContext } from './contexts/AuthContext'




function App() {

  const {isAuthorized,setIsAuthorized}=useContext(AuthenticationContext)
 

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Auth />} />
        <Route path='/register' element={<Auth insideRegister={true}/>}/>
        <Route path="/dashboard" element={ isAuthorized? <Dashboard />:<Navigate to={'/login'} />} />
        <Route path="/projects" element={ isAuthorized? <Projects />:<Navigate to={'/login'} />} />


      </Routes>

      <Footer/>
    </>
  )
}

export default App
