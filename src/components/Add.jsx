import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import addImg from '../assets/add-file.png'
import { Toaster, toast } from 'sonner'
import { addProjectAPI } from '../../Services/allApi';
import { addResponseContext } from './../contexts/ContextAPI';




function Add() {

  const {addResponse,setAddResponse}=useContext(addResponseContext)

  const [projectDetails,setProjectDetails]=useState({title:"",languages:"",github:"",website:"",description:"",proImg:""})

  const [isValidFile,setIsValidFile]=useState(false)
  const [preview,setPreview]=useState(addImg)

  const [show, setShow] = useState(false);

  const handleClose = () =>{ 
    setShow(false);
    setProjectDetails({title:"",languages:"",github:"",website:"",description:"",proImg:""})
  }
  const handleShow = () => setShow(true);

  console.log(projectDetails);

  useEffect(() => {
   
    if(projectDetails.proImg.type=="image/png" || projectDetails.proImg.type=="image/jpeg" || projectDetails.proImg.type=="image/jpg")
    {
      setIsValidFile(true)
      setPreview(URL.createObjectURL(projectDetails.proImg))

    }
    else
    {
      setIsValidFile(false)
      setPreview(addImg)
      setProjectDetails({...projectDetails,proImg:""})
    }
  }, [projectDetails.proImg])

  const handleAdd=async()=>{
    const {title,languages,github,website,description,proImg}=projectDetails

    if(title && languages && github && website && description && proImg )
    {

      // request body

        const reqBody = new FormData();
          reqBody.append("title",title)
          reqBody.append("languages",languages)
          reqBody.append("github",github)
          reqBody.append("website",website)
          reqBody.append("description",description)
          reqBody.append("proImg",proImg)

      // request header

      const token=sessionStorage.getItem("token")

      if(token)
      {
        const reqHeaders={
          "Content-Type":"multipart/form-data",
          "Authorization":`Bearer ${token}`
        }
        try 
        {     
  
          const result=await addProjectAPI(reqBody,reqHeaders)
          console.log(result);

          if(result.status==200)
          {
            handleClose()
            toast.success("Project added Successfully!")
            setAddResponse(result.data)
          }
          else
          {
            toast.error(result.response.data)
          }
          
        } catch (err) 
        {
         
          console.log(err);
          
        }
      }


    }
    else
    {
      toast.warning("Enter all the Fields")
    }
  }
  
  

  return (
    <>

      <Toaster richColors position="top-center" />

    <button onClick={handleShow} style={{backgroundColor:'#D9EAFD'}} className='btn'><i class="fa-solid fa-plus"></i> New Project</button>

        <Modal size='lg' show={show} onHide={handleClose} backdrop="static" keyboard={false}>
          <Modal.Header closeButton>
            <Modal.Title>New Project Details</Modal.Title>
          </Modal.Header>
              <Modal.Body>
              <div className="row  p-5">
                <div className="col-lg-4 ">
                    <label >
                        <input onChange={(e)=>{
                          console.log(e.target);
                          setProjectDetails({...projectDetails,proImg:e.target.files[0]})
                          
                        }} type="file" style={{display:'none'}}/>
                        <img className='img-fluid' src={preview} alt="" />    
                    </label>
                      { !isValidFile &&
                      
                            <div style={{fontSize:"13px",}} className="text-center text-danger fw-bold">
                              *Upload Only Image Files [jpg/jpeg/png]
                            </div>
                      }
                </div>
                <div className="col-lg-8">

                  <div className='mb-3'>
                      <input onChange={(e)=>{setProjectDetails({...projectDetails,title:e.target.value})}} className='form-control' type="text" placeholder='Project Title' />
                  </div>

                  <div className='mb-3'>
                      <input onChange={(e)=>{setProjectDetails({...projectDetails,languages:e.target.value})}} className='form-control' type="text" placeholder='Language Used' />
                  </div>

                  <div className='mb-3'>
                      <input onChange={(e)=>{setProjectDetails({...projectDetails,github:e.target.value})}} className='form-control' type="text" placeholder='Project Github Link' />
                  </div>

                  <div className='mb-3'>
                      <input onChange={(e)=>{setProjectDetails({...projectDetails,website:e.target.value})}} className='form-control' type="text" placeholder='Project Website Link' />
                  </div>
                    
                </div>
              </div>
              <div className='ps-5 pe-5 pb-5'>
              <input onChange={(e)=>{setProjectDetails({...projectDetails,description:e.target.value})}} className='form-control' type="text" placeholder='Project Description' />

              </div>
              </Modal.Body>
              
          
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>Close</Button>
            <Button onClick={handleAdd} variant="primary">Upload</Button>
          </Modal.Footer>
      </Modal>


    </>
  )
}

export default Add