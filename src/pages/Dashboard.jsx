import React, { useEffect, useState } from 'react'
import View from './../components/View';
import Header from '../components/Header';
import Projects from './Projects';
import Profile from '../components/Profile';





function Dashboard() {

  const [userName,setUserName]=useState("")
  console.log(userName);
  
  useEffect(() => {
    
    if (sessionStorage.getItem("user"))
    {
      setUserName(JSON.parse(sessionStorage.getItem("user")).username)

    }
    else
    {
      setUserName("")
    }
  }, [])


  return (
    <>
    <Header/>
    <div style={{marginTop:'100px'}} className='container-fluid '>
        <div className='row p-5'>
          <h1>Welcome <span style={{color:'#D9EAFD'}}> {userName.split(" ")[0]} </span></h1>
          <div className='col-lg-8'>
          
            <View/>

          
          </div>

          <div className='col-lg-4'>

            <Profile/>
          
          </div>
        </div>
    </div>

    </>
  )
}

export default Dashboard