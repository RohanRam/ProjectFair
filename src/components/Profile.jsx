import React, { useEffect } from 'react'

import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
import proImg from '../assets/profile.png'
import { Toaster, toast } from 'sonner'
import serverUrl from '../../Services/serverUrl';
import { editProfileAPI } from '../../Services/allApi';




function Profile() {

  const [userDetails, setUserDetails] = useState({ username: "", email: "", password: "", linkedin: "", github: "", profile: "" })
  const [existingImg, setExistingImg] = useState("")
  const  [preview,setPreview]=useState("")
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("user")) {
      const existingUser = JSON.parse(sessionStorage.getItem("user"))
      setUserDetails({ ...userDetails, username: existingUser?.username, email: existingUser?.email, password: existingUser?.password, linkedin: existingUser?.linkedin, github: existingUser?.github })
      setExistingImg(existingUser?.profile)
    }
  }, [open])

  useEffect(() => {
    if(userDetails.profile)
    {
      setPreview(URL.createObjectURL(userDetails.profile))
    }
    else
    {
      setPreview("")
    }
   
  }, [userDetails.profile])





  const handleUpdate=async()=>{
    const {username,email,password,linkedin,github,profile}=userDetails
    if(github && linkedin)
    {
      // -----------  API CALL  -------------

      const reqBody = new FormData()
      reqBody.append('username', username)
      reqBody.append('email', email)
      reqBody.append('password', password)
      reqBody.append('linkedin', linkedin)
      reqBody.append('github', github)
      preview?reqBody.append('profile', profile):reqBody.append('profile', existingImg)

      const token=sessionStorage.getItem("token")

          if(token)
          {
            const reqHeader={
              "Content-Type":preview? "multipart/form-data":"application/json",
              "Authorization":`Bearer ${token}`
            }

            try  
            {
              const result=await editProfileAPI(reqBody,reqHeader)
              console.log(result);
                if(result.status==200)
                {
                  setOpen(!open)
                  sessionStorage.setItem("user",JSON.stringify(result.data))
                }

              
            } catch (err) 
            {
              console.log(err);
              
            }
          }

    }
    else
    {
        toast.error("Please Fill all the fields")
    }
  }

  return (
    <>
      <Toaster richColors position="top-center" />

      {/* <div className="profile-container p-5 m-5"> */}
        <div className="d-flex justify-content-center">

          <h3>Profile</h3>

          <div>
            <button className='btn' onClick={() => setOpen(!open)} aria-controls="example-collapse-text" aria-expanded={open}>

              <i style={{ color: '#A888B5' }} class="fa-solid fa-caret-down"></i>

            </button>
          </div>


        </div>

        <Collapse in={open}>
          <div id="example-collapse-text">

            <div>
              <label className='d-flex justify-content-center mb-5' >
                <input  onChange={(e)=>setUserDetails({...userDetails,profile:e.target.files[0]})} type="file" style={{ display: 'none' }} />
                  {
                    existingImg==""? 
                          <img style={{ height: '200px', }} className='img-fluid' src={preview?preview:proImg} alt="" />
                          :
                          <img style={{ height: '200px', }} className='img-fluid' src={preview?preview:`${serverUrl}/uploads/${existingImg}`} alt="" />

                  }              
              </label>

              <div className='pe-5 ps-5'>

                <div className='d-flex justify-content-center mb-3 '>
                  <input onChange={(e)=>setUserDetails({...userDetails,github:e.target.value})} value={userDetails.github} className='form-control' type="text" placeholder='Github Profile URL' />
                </div>

                <div className='d-flex justify-content-center mb-3 '>
                  <input onChange={(e)=>setUserDetails({...userDetails,linkedin:e.target.value})} value={userDetails.linkedin} className='form-control' type="text" placeholder='Linkedin Profile URL' />
                </div>
              </div>

            </div>

            <div className='d-flex justify-content-center'>
            <Button onClick={handleUpdate} style={{fontSize:'12px'}} variant="primary">Update Profile</Button>
            </div>


          </div>

        </Collapse>

      {/* </div> */}
    </>
  )
}

export default Profile