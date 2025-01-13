import React, { useContext, useEffect } from 'react'

import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
// import addImg from '../assets/add-file.png'
import serverUrl from '../../Services/serverUrl';
import { Toaster, toast } from 'sonner'
import { editProjectAPI } from '../../Services/allApi';
import { editResponseContext } from '../contexts/ContextAPI';



function Edit({project}) {

  const {editResponse,setEditResponse}=useContext(editResponseContext)
  const [projectDetails,setProjectDetails]=useState({id:project?._id,title:project?.title,languages:project?.languages,github:project?.github,website:project?.website,description:project?.description,proImg:""})
  const [isValidFile,setIsValidFile]=useState(false)


  
  // img preview
  const [preview,setPreview]=useState("")
  useEffect(() => 
  { 
    if(projectDetails.proImg.type=="image/png" || projectDetails.proImg.type=="image/jpeg" || projectDetails.proImg.type=="image/jpg")
    {
      setIsValidFile(true)
      setPreview(URL.createObjectURL(projectDetails.proImg))

    }
    else
    {
      setIsValidFile(false)
      setPreview("")
      setProjectDetails({...projectDetails,proImg:""})
    }
  }, [projectDetails.proImg])


  const [show, setShow] = useState(false);

  const handleClose = () => {
    setProjectDetails({id:project?._id,title:project?.title,languages:project?.languages,github:project?.github,website:project?.website,description:project?.description,proImg:""})
    setShow(false);}
  const handleShow = () => {
    setProjectDetails({id:project?._id,title:project?.title,languages:project?.languages,github:project?.github,website:project?.website,description:project?.description,proImg:""})

    setShow(true);
  }

  const handleUpdate=async()=>{

    const {id,title,languages,github,website,description,proImg}=projectDetails
    if(title && languages && github && website && description)
    {



      //REQ BODY
      const reqBody = new FormData();
      reqBody.append("title",title)
          reqBody.append("languages",languages)
          reqBody.append("github",github)
          reqBody.append("website",website)
          reqBody.append("description",description)
          preview? reqBody.append("proImg",proImg) : reqBody.append("proImg",project.proImg) 

      //REQ HEADER

      const token=sessionStorage.getItem("token")

          if(token)
          {
            const reqHeader={
              "Content-Type":preview? "multipart/form-data":"application/json",
              "Authorization":`Bearer ${token}`
            }
            
            try 
            {
              const result= await editProjectAPI(id,reqBody,reqHeader)
              console.log(result);

                  if(result.status==200)
                  {
                    handleClose()
                    setEditResponse(result.data)
                  }
              
            } catch (err) 
            {
              console.log(err);
              
            }
          }
      // ----------- API CALL ------------------

    }
    else
    {
      toast.warning("Enter all the fields")
    }

  }

  return (
    <>
  <Toaster richColors position="top-center" />
    <button onClick={handleShow} className='btn p-2'><i style={{color:'#A888B5'}} class="fa-solid fa-edit"></i></button>

    <Modal size='lg' show={show} onHide={handleClose} backdrop="static" keyboard={false}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Project Details</Modal.Title>
          </Modal.Header>
              <Modal.Body>
              <div className="row  p-5">
                <div className="col-lg-4 ">
                    <label >
                        <input onChange={(e)=>{
                          console.log(e.target);
                          setProjectDetails({...projectDetails,proImg:e.target.files[0]})
                          
                        }} type="file" style={{display:'none'}}/>
                        <img className='img-fluid' src={preview?preview:`${serverUrl}/uploads/${project?.proImg}`} alt="" />    
                    </label>
                      { !isValidFile &&
                      
                            <div style={{fontSize:"13px",}} className="text-center text-danger fw-bold">
                              *Upload Only Image Files [jpg/jpeg/png]
                            </div>
                      }
                </div>
                <div className="col-lg-8">

                  <div className='mb-3'>
                      <input onChange={(e)=>{setProjectDetails({...projectDetails,title:e.target.value})}} value={projectDetails?.title} className='form-control' type="text" placeholder='Project Title' />
                  </div>

                  <div className='mb-3'>
                      <input onChange={(e)=>{setProjectDetails({...projectDetails,languages:e.target.value})}} value={projectDetails?.languages} className='form-control' type="text" placeholder='Language Used' />
                  </div>

                  <div className='mb-3'>
                      <input onChange={(e)=>{setProjectDetails({...projectDetails,github:e.target.value})}} value={projectDetails?.github} className='form-control' type="text" placeholder='Project Github Link' />
                  </div>

                  <div className='mb-3'>
                      <input onChange={(e)=>{setProjectDetails({...projectDetails,website:e.target.value})}} value={projectDetails?.website} className='form-control' type="text" placeholder='Project Website Link' />
                  </div>
                    
                </div>
              </div>
              <div className='ps-5 pe-5 pb-5'>
              <input onChange={(e)=>{setProjectDetails({...projectDetails,description:e.target.value})}} value={projectDetails?.description} className='form-control' type="text" placeholder='Project Description' />

              </div>
              </Modal.Body>
              
          
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button onClick={handleUpdate} variant="primary">Update</Button>
          </Modal.Footer>
      </Modal>


    </>
  )
}

export default Edit