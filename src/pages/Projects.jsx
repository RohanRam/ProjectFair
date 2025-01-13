import React, { useEffect, useState } from 'react'
import ProjectCard from '../components/ProjectCard'
import { getAllProjectAPI } from '../../Services/allApi'
import Header from './../components/Header';
import { Toaster, toast } from 'sonner'


function Projects() {

  const [searchKey, setSearchKey] = useState('');
  console.log(searchKey);
  
  const [allProjects, setAllProjects] = useState([])

  useEffect(() => {

    getAllProjects()
  }, [searchKey])


  const getAllProjects = async () => {

    const token = sessionStorage.getItem("token")

    if (token) {
      const reqHeaders = {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${token}`
      }
      try {
        const result = await getAllProjectAPI(searchKey,reqHeaders)

        if (result.status == 200) {
          setAllProjects(result.data)
          if (result.data.length === 0) {
            toast.error("No projects available to display.");
          }
        }
        else {
          toast.error(result.response.data)
        }
      } catch (err) {
        console.log(err);

      }
    }



  }

  // ---------------------------

  

  // ---------------------------

  return (
    <>
    <Toaster richColors position="top-center" />
    <Header  insideProject={true} searchKey={searchKey} setSearchKey={setSearchKey} />
      <div style={{marginTop:'70px',padding:'100px'}} className=''>
        <div className='mb-5'>
          <h1 className='text-center  '>All Projects</h1>
        </div>
        <div className="mt-5 row">

          {
            allProjects?.length > 0 ? (
            allProjects.map((project) => (

              <div className="col-lg-4 col-md-6 col-sm-12 d-flex justify-content-center ">
                <ProjectCard displayData={project} />
              </div>
              
            ))
          )
          :
          (
            <div className="col-12 text-center">
                <h4  className='text-danger border border-black p-5'>No projects to show</h4>
              </div>
          )

          }


        </div>
      </div>
    </>
  )
}

export default Projects