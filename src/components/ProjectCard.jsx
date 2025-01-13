import React from 'react'
import Card from 'react-bootstrap/Card';
import p1Img from '../assets/p1.png'


import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import serverUrl from './../../Services/serverUrl';


function ProjectCard({displayData}) {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  return (
    <>
      <Card className="me- mb-5 card" onClick={handleShow} style={{ width: '18rem',backgroundColor:'' }}>
      <Card.Img variant="top" src={`${serverUrl}/uploads/${displayData?.proImg}`} />
      <Card.Body style={{backgroundColor:'whitesmoke'}}>
        <Card.Title  className='text-center'>{displayData?.title}</Card.Title>
      
      </Card.Body>
    </Card>

    <Modal size='lg' show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title c >Project Details</Modal.Title>
        </Modal.Header>
        
        <Modal.Body style={{backgroundColor:'#D9EAFD'}} className='p-5' >
          <div className="row mdl">
            <div className="col-lg-6">
              <img style={{height:'200px',width:'350px'}} src={`${serverUrl}/uploads/${displayData?.proImg}`} alt="" />
            </div>

            <div className="col-lg-6">

              <h3>Project-Name : <span>{displayData?.title}</span> </h3>
              <h3>Languages Used: <span>{displayData?.languages}</span> </h3>
              <h3>Project Overview: <span>{displayData?.description}</span></h3>
              
                  <div className="mt-3">
                    <a href={displayData?.github}><button style={{width:'70px'}} className="btn btn-primary me-2" type="submit"><i class="fa-brands fa-github"></i></button></a>
                    <a href={displayData?.website}><button style={{width:'70px'}} className="btn btn-primary" type="submit"> <i class="fa-solid fa-link"></i></button></a>
                  </div>
            </div>
          </div>

         
          </Modal.Body>
    </Modal>

    </>
  )
}

export default ProjectCard 