import React, { useContext, useEffect, useState } from 'react'

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Projects from '../pages/Projects';
import { useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'sonner'
import { AuthenticationContext } from '../contexts/AuthContext';







  function Header({ insideProject, searchKey, setSearchKey }) {

    const {isAuthorized,setIsAuthorized}=useContext(AuthenticationContext)


    const navigate = useNavigate();

  const handleLogOut=()=>{
    sessionStorage.clear()
    // SetIsAuthorized(false)
    navigate('/')
    setIsAuthorized(false)
    toast.info(" LOGOUT SUCCESSFUL ")

    
   
  }

  // ---------------------

  

  //---------------------
  return (
    <>  
      <Toaster richColors position="top-center" />

      <Navbar style={{ zIndex: '100' }} bg="dark position-fixed top-0 w-100" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/"><i class="fa-solid fa-diagram-project"></i> Project Fair</Navbar.Brand>
          <div className="d-flex ">
            <Nav className="me-auto ">
              {insideProject &&
                <Nav.Link className='ms-5' >
                  <input onChange={(e)=>setSearchKey(e.target.value)}  type="text" style={{ width: '400px',color:'white' }} className='rounded p-1 border border-white ms-5 me-1' placeholder='Search Project [Language] ' />
                </Nav.Link>}
              <Nav.Link onClick={handleLogOut} className='d-flex align-items-center'>Logout</Nav.Link>
            </Nav>
          </div>
        </Container>
      </Navbar>

      



    </>
  )
}

export default Header