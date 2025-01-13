import React, { useContext, useState } from 'react'
import logImg from '../assets/login.png'

import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom';

import { loginAPI, registerAPI } from '../../Services/allApi';
import { Toaster, toast } from 'sonner'
import Spinner from 'react-bootstrap/Spinner';
import { AuthenticationContext } from '../contexts/AuthContext';






function Auth({insideRegister}) {

  const {isAuthorized,setIsAuthorized}=useContext(AuthenticationContext)
  const [userDetails,setUserDetails]=useState({username:"",email:"",password:""})
  const [isLogin,setIsLogin]=useState(false)
  console.log(userDetails);
  const navigate=useNavigate()

  const handleRegister = async(e)=>{
    e.preventDefault()


    if(userDetails.username && userDetails.email && userDetails.password)
    {
      try
      {
        const result = await registerAPI(userDetails)
        console.log(result);
        if(result.status==200)
        {
          toast.success('Registration Successfull')
          setUserDetails({username:"",email:"",password:""})
          navigate('/login')

        }
        else
        {
          if(result.status==406)
          {
            toast.warning(result.response.data)
            setUserDetails({username:"",email:"",password:""})
          }
        }
        
        
      }
      catch(err)
      {
        console.log(err);
      }
    }
    else
    {
      toast.warning('Please Enter all the Fields')
    }
}
  
const handleLogin = async(e)=>{
  e.preventDefault()
  if(userDetails.email && userDetails.password)
  {
    try
    {
      
      const result = await loginAPI(userDetails)
      console.log(result.data);

      if(result.status==200)
      {
        
        setTimeout(() => {
          toast.success('Login Successful')
          
        }, 1500);

        sessionStorage.setItem("user",JSON.stringify(result.data.user))
        sessionStorage.setItem("token",result.data.token)
        setIsAuthorized(true)
        setIsLogin(true)
        


        setTimeout(() => {


          setIsLogin(false)
          setUserDetails({username:"",email:"",password:""})
          navigate('/')
         
          
        }, 2000);


      }
      else
      {
        if(result.status==404)
        {
          toast.error(result.response.data)
        }
      }
    } catch (err) 
    {
      console.log(err);
        
    }

  }
  else
  {
    toast.warning('Please Enter all the Fields')
 
  }
}
  return (
    <>
      <Toaster richColors position="top-center" />
      <div style={{ height: '100vh' }} className="d-flex justify-content-center align-items-center">
        <div style={{ backgroundColor: '#F2F9FF' }} className="row p-5 box">
          <h2 className='text-center'>Welcome to Project Fair </h2>
          <div className="col-lg-6 p-5 ">
            {
              insideRegister &&

            <FloatingLabel controlId="floatingInput1" label="Username" className="mb-3">
              <Form.Control type="text" placeholder="User Name" onChange={e=>setUserDetails({...userDetails,username:e.target.value})} value={userDetails.username} />
            </FloatingLabel>
            }

            <FloatingLabel controlId="floatingInput" label="Email address" className="mb-3">
              <Form.Control type="email" placeholder="name@example.com"  onChange={e=>setUserDetails({...userDetails,email:e.target.value})} value={userDetails.email} />
            </FloatingLabel>

            <FloatingLabel controlId="floatingPassword" label="Password">
              <Form.Control type="password" placeholder="Password"  onChange={e=>setUserDetails({...userDetails,password:e.target.value})} value={userDetails.password} />
            </FloatingLabel>

          {  insideRegister ?
            <div className="mb-2 mt-3">
              <button onClick={handleRegister} className="btn btn-primary" type="submit">Sign Up</button>
              <p style={{fontSize:'14px'}} className='mt-3'>Already have an account? <Link to={'/login'}>Login</Link></p>

            </div>

            :

            <div className="mb-2 mt-3">
              <button onClick={handleLogin} className="btn btn-primary" type="submit">Sign In</button>
                {
                  isLogin &&
                  
                  <Spinner animation="border" />
                
                }              <p style={{fontSize:'14px'}} className='mt-3'>Dosen't have an account? <Link to={'/register'}>Register</Link></p>

            </div>
            
            }



          </div>
          <div className="col-lg-6 ">

            <img className='ms-3' height={300} src={logImg} alt="" />

          </div>
        </div>

      </div>


    </>
  )
}

export default Auth