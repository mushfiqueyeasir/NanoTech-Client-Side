import React from 'react';
import './HomeBanner.css';
import banner1 from '../../../../resource/banner2.jpg'
import banner2 from '../../../../resource/banner.jpg'
import banner3 from '../../../../resource/banner3.jpg'
import { Link } from 'react-router-dom';
import Bounce from 'react-reveal/Bounce';


const HomeBanner = () => {


    return (
        <div id="carouselExampleCaptions" className="carousel slide carousel-fade top" data-bs-ride="carousel">
            <div className="carousel-indicators mb-5">
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active"
                    aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1"
                    aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2"
                    aria-label="Slide 3"></button>
            </div>

            <div className="carousel-inner">

                <div className="carousel-item  homeBannerCarosel active" data-bs-interval="5000" >
                    <img src={banner1} className="img-fluid d-block w-100 cover image-overlay" alt='Banner 1' />
                    <div
                        className="carousel-caption container w-100  d-flex flex-column align-items-center align-items-md-center justify-content-end  justify-content-md-end mb-5">

                        <Bounce top>
                            <h5 className="text-center text-md-start title1 fw-bolder">Build Your Dream</h5>
                        </Bounce>
                        <Bounce button>
                            <h5 className="text-center text-md-start title1 text-white">We Provide The Tools</h5>
                            <Link to='/parts' className=' btn my-5 startHere' >Lets Start</Link>
                        </Bounce>

                    </div>
                </div>

                <div className="carousel-item homeBannerCarosel" data-bs-interval="5000">
                    <img src={banner2} className="img-fluid d-block w-100 cover image-overlay" alt='Banner2' />
                    <div
                        className="carousel-caption container w-100  d-flex flex-column align-items-center align-items-md-center justify-content-end  justify-content-md-end mb-5">

                        <Bounce top>
                            <h5 className="text-center text-md-start title1 fw-bolder">Build Your Dream</h5>
                        </Bounce>
                        <Bounce button>
                            <h5 className="text-center text-md-start title1 text-white">We Provide The Tools</h5>
                            <Link to='/parts' className=' btn my-5 startHere' >Lets Start</Link>
                        </Bounce>

                    </div>
                </div>

                <div className="carousel-item  homeBannerCarosel" data-bs-interval="5000">
                    <img src={banner3} className="img-fluid d-block w-100 cover image-overlay" alt='Banner3' />
                    <div
                        className="carousel-caption container w-100  d-flex flex-column align-items-center align-items-md-center justify-content-end  justify-content-md-end mb-5">

                        <Bounce top>
                            <h5 className="text-center text-md-start title1 fw-bolder">Build Your Dream</h5>
                        </Bounce>
                        <Bounce button>
                            <h5 className="text-center text-md-start title1 text-white">We Provide The Tools</h5>
                            <Link to='/parts' className=' btn my-5 startHere' >Lets Start</Link>
                        </Bounce>

                    </div>
                </div>

            </div>


            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions"
                data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions"
                data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    );
};

export default HomeBanner;