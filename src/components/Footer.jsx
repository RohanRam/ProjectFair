import React from 'react'
import { Link } from 'react-router-dom'


function Footer() {
  return (
    <>

<div className=" w-100 p-5 text-white" style={{ height: '400px',backgroundColor:'#9AA6B2' }}>
            <div className="row p-5">

                <div className="col-lg-4">
                    <h5 style={{fontSize:'30px'}}>
                    <i class="fa-solid fa-diagram-project"></i>&nbsp;

                        Project Fair
                    </h5>
                    <p style={{opacity:'70%'}}>
                    "Explore and discover your next favorite project!Read with ease at Project Fair <br /> - your ultimate digital library hub!".
            
                    </p>
                    <p style={{opacity:'90%'}}>Code is liscensed by Rohan</p>
                    <p style={{opacity:'90%'}}>v5.3.2</p>
                </div>

                <div className="ms-5 col-lg-2 text-ceter ">
                    <h5 style={{fontSize:'25px'}}>Links</h5>
                    <div><Link to={'/'} style={{ textDecoration: 'none', color: 'white',opacity:'70%' }}>Home</Link></div>
                    <div><Link to={'/dashboard'} style={{ textDecoration: 'none', color: 'white',opacity:'70%' }}>Dashboard</Link></div>
                    <div><Link to={'/projects'} style={{ textDecoration: 'none', color: 'white' ,opacity:'70%'}}>All projects</Link></div>




                </div>
                <div className="col-lg-2 text-ceter">
                    <h5 style={{fontSize:'25px'}}>Guide</h5>
                    <div><Link to={'/'} style={{ textDecoration: 'none', color: 'white',opacity:'70%' }}>React</Link></div>
                    <div><Link to={'/'} style={{ textDecoration: 'none', color: 'white',opacity:'70%'}}>React Bootstrap</Link></div>
                    <div><Link to={'/'} style={{ textDecoration: 'none', color: 'white' ,opacity:'70%'}}>React Router</Link></div>




                </div>
                <div className="col-lg-3">
                    <h5 style={{fontSize:'25px'}}>Contact us</h5>
                    <div className="d-flex justify-content-center align-items-center mt-4">
                        <input type="text" className="form-control" placeholder="Enter Email" />
                        <button className="btn btn-dark ms-2"><i className="fa-solid fa-arrow-right"></i></button>
                    </div>

                    <div className="d-flex justify-content-between align-items-center mt-4 p-3">

                        <a href=""><i class="fa-brands fa-facebook" style={{ color: 'white', fontSize: '20px' }} ></i></a>
                        <a href=""><i class="fa-brands fa-twitter" style={{ color: 'white', fontSize: '20px' }}></i></a>
                        <a href=""><i class="fa-brands fa-instagram" style={{ color: 'white', fontSize: '20px' }}></i></a>
                        <a href=""><i class="fa-brands fa-linkedin" style={{ color: 'white', fontSize: '20px' }}></i></a>
                        <a href=""><i class="fa-brands fa-github" style={{ color: 'white', fontSize: '20px' }}></i></a>
                        <a href=""><i class="fa-brands fa-pinterest" style={{ color: 'white', fontSize: '20px' }}></i></a>
                       

                    </div>

                </div>
            </div>

            <p className="text-center mt-1">Copyright 2024. All rights reserved.</p>

        </div>

    </>
  )
}

export default Footer