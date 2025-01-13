import React, { useEffect,useContext, useState } from 'react'
import Add from './Add';
import Edit from './Edit';
import { deleteProjectAPI, getUserProjectAPI } from '../../Services/allApi';
import { addResponseContext, editResponseContext } from './../contexts/ContextAPI';
import { Toaster, toast } from 'sonner'




function View() {

  const {addResponse,setAddResponse}=useContext(addResponseContext)
  const {editResponse,setEditResponse}=useContext(editResponseContext)
  const [userProjects,setUserProjects]=useState([])

  useEffect(() => {
    getUserProjects()
  }, [addResponse,editResponse])
  


  const getUserProjects=async()=>{

     const token=sessionStorage.getItem("token")
    
          if(token)
          {
            const reqHeaders={
              "Content-Type":"multipart/form-data",
              "Authorization":`Bearer ${token}`
            }
            try 
            {
              const result= await getUserProjectAPI(reqHeaders)
              
              if(result.status==200)
              {
                setUserProjects(result.data)
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

  const handleDelete=async(pid)=>{

    const token=sessionStorage.getItem("token")

      if(token)
      {
        const reqHeader={
          "Content-Type":"application/json",
          "Authorization":`Bearer ${token}`
        }
        try 
        {
          const result = await deleteProjectAPI(pid,reqHeader)
          if(result.status==200)
          {
            toast.success("Project deleted successfully")
            getUserProjects()

          }

          
        } catch (err) 
        {
          console.log(err);
            
        }
      }

  }
  return (
    <>
<Toaster richColors position="top-center" />
    <div className="d-flex justify-content-between mt-2 mb-4">
      <h4>All Projects</h4>
      <Add/>
    </div>
    <div className="mt-1">

      {
        userProjects?.length>0 &&
        userProjects.map((project) => (
          <div className="border border-2 rounded p-3 d-flex justify-content-between align-items-center">

          <h5 style={{color:'#A888B5'}}>{project?.title}</h5>
  
          <div className="d-flex align-items-center ">
            <div className='pe-3'>
              <Edit project={project} />
            </div>
            <a href={project?.github}><i style={{color:'#A888B5'}} class="fa-brands fa-github pe-3"></i></a>
            <button onClick={()=>{handleDelete(project?._id)}} className='btn'><i style={{color:'#A888B5'}} class="fa-solid fa-trash"></i></button>
          </div>
  
        </div>
        ))
        
       
      }


    </div>

    </>
  )
} 

export default View