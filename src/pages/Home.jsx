import React, { useEffect, useRef, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import homeImg from '../assets/home.png'
import ProjectCard from './../components/ProjectCard';
import Card from 'react-bootstrap/Card';
import av1 from '../assets/av1.png';
import av2 from '../assets/av2.png';
import av3 from '../assets/av3.png';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { getHomeProjectAPI } from '../../Services/allApi';
import { Toaster, toast } from 'sonner'
import Header from '../components/Header';

import AOS from 'aos';
import 'aos/dist/aos.css';




function Home() {

  const navigate=useNavigate()
  const exploreButtonRef = useRef(null);

  

  const [homeProject, setHomeProject] = useState([])
  useEffect(() => {
    getHomeProject();
    AOS.init();
  }, [homeProject])



  const handleProject = () => {
    if (sessionStorage.getItem("token")) {
      navigate('/projects')
    }
    else {
      toast.warning("Login to View More Projects");
      exploreButtonRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });

    }

  }


  const getHomeProject = async () => {

    try {

      const result = await getHomeProjectAPI()
      if (result.status == 200) {
        setHomeProject(result.data)
      }

    }
    catch (err) {
      console.log(err);

    }



  }


  return (
    <>
     {
             sessionStorage.getItem("token") &&

             <Header/>


     }

      <Toaster richColors position="top-center" />
      {/* --Home--*/}

      <div style={{ backgroundColor: '#F8FAFC' }} className="p-5 d-flex justify-content-center">

        <Row className='p-5' style={{ marginTop: '100px' }}>

          <Col className='p-5 ' lg={7} md={12} sm={12}>
            <h1 style={{ fontSize: '50px' }}><i class="fa-solid fa-diagram-project"></i> Project Fair</h1>
            <p>“Discover a platform dedicated to showcasing innovative projects from diverse fields.
              We connect creators, inspire collaboration, and celebrate creativity through a curated
              collection of impactful ideas and success stories.”</p>
            {
              sessionStorage.getItem("token") ?

                <Link  to={'/dashboard'}><button style={{ backgroundColor: '#D9EAFD' }} className='dsh btn mt-3'>DASHBOARD </button></Link>

                :

                <Link ref={exploreButtonRef} to={'/login'}><button style={{ backgroundColor: '#D9EAFD' }} className='sgn btn mt-3'>SIGN IN </button></Link>

            }
          </Col>

          <Col className='p-5 ' lg={5} md={12} sm={12}>
            {/* <img style={{ height: "300px" }} src={homeImg} alt="" /> */}
            <img style={{ height: "300px" }} src="https://i.gifer.com/3IsP.gif" alt="" />

            
            {/* <img style={{ height: "300px" }} src="https://i.gifer.com/74pZ.gif" alt="" /> */}
            {/* <img style={{ height: "300px" }} src="https://i.gifer.com/WS2c.gif" alt="" /> */}
           
            
          </Col>
         

        </Row>

      </div>

      {/* --Projects--*/}

      <div style={{ backgroundColor: '#D9EAFD' }} className="p-5 text-center">
        <h1 className='h1-head'>Sample Projects</h1>
        <h5 className='h5-head'>--- Explore these projects ---</h5>
        {/* <marquee scrollamount="15" behavior="" direction=""> */}

          <div className="mt-5 mt-3 d-flex justify-content-evenly">

            {
              homeProject?.length > 0 &&
              homeProject.map(project => (

                <div data-aos="fade-up" className="me-2">
                  <ProjectCard displayData={project} />
                </div>

              ))

            }


          </div>
        {/* </marquee> */}

        <button className='btn btn-link' style={{ backgroundColor: 'transparent', border: 'transparent' }} onClick={handleProject}>
          {/* <Link to={'/projects'} style={{ fontSize: '15px' }} className='mt-4'>More Projects</Link> */}
          More Projects

        </button>
      </div>

      {/*-- Testimonials-- */}
      <div style={{ backgroundColor: '#BCCCDC' }} className="d-flex flex-column p-5 ">
        <h1 className='mt-5 h1-head text-center'>Our Testimonial</h1>
        <h5 className='h5-head text-center'>--- Voices of Satisfaction ---</h5>
        <div className="row mt-5 p-5">

          <div className="col-lg-4 d-flex justify-content-center">

            <Card style={{ width: '18rem' }}>
              <Card.Img variant="top" src={av1} />
              {/* <Card.Img variant="top" src="https://pin.it/6w8YNKsaA" /> */}

              <Card.Body>
                <Card.Title className='text-center'>Darwin Nunez</Card.Title>
                <Card.Text>
                  <div className='text-center'>
                    <i class="fa-solid fa-star m-1 star"></i>
                    <i class="fa-solid fa-star m-1 star"></i>
                    <i class="fa-solid fa-star m-1 star"></i>
                    <i class="fa-solid fa-star m-1 star"></i>
                    <i class="fa-solid fa-star-half-stroke  m-1 star"></i>
                  </div>
                  <p>
                    Some quick example text to build on the card title and make up the
                    bulk of the card's content.
                  </p>
                </Card.Text>
              </Card.Body>
            </Card>

          </div>

          <div className="col-lg-4 d-flex justify-content-center">

            <Card style={{ width: '18rem' }}>
              <Card.Img variant="top" src={av2} />
              <Card.Body>
                <Card.Title className='text-center'>Rodrygo Paul</Card.Title>
                <Card.Text>
                  <div className='text-center'>
                    <i class="fa-solid fa-star m-1 star"></i>
                    <i class="fa-solid fa-star m-1 star"></i>
                    <i class="fa-solid fa-star m-1 star"></i>
                    <i class="fa-solid fa-star m-1 star"></i>
                    <i class="fa-solid fa-star m-1 star"></i>

                  </div>
                  <p>
                    Some quick example text to build on the card title and make up the
                    bulk of the card's content.
                  </p>
                </Card.Text>
              </Card.Body>
            </Card>

          </div>

          <div className="col-lg-4 d-flex justify-content-center">

            <Card className='' style={{ width: '18rem' }}>
              <Card.Img variant="top" src={av3} />
              <Card.Body>
                <Card.Title className='text-center'>Payel Sharma</Card.Title>
                <Card.Text  >
                  <div className='text-center'>
                    <i class="fa-solid fa-star m-1 star"></i>
                    <i class="fa-solid fa-star m-1 star"></i>
                    <i class="fa-solid fa-star m-1 star"></i>
                    <i class="fa-solid fa-star m-1 star"></i>
                    <i class="fa-solid fa-star-half-stroke  m-1 star"></i>
                  </div>
                  <p>
                    Some quick example text to build on the card title and make up the
                    bulk of the card's content.
                  </p>
                </Card.Text>
              </Card.Body>
            </Card>

          </div>

        </div>

      </div>

    </>
  )
}

export default Home