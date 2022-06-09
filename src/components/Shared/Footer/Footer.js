import React from 'react';
import './Footer.css';
import logo from '../../../resource/logo.png'
import { Link, NavLink } from 'react-router-dom';
import Bounce from 'react-reveal/Bounce';
const Footer = () => {

    return (

        <footer className='bg-Black'>
            <Bounce bottom>
                <div className="container py-3">
                    <div className="row">
                        <div className="col-12 col-lg-4">
                            <img src={logo} className="img-fluid w-25" alt="" />
                            <p className='text-white'>We are here to fullfil your dream.  We provide all the parts need to the retailer shop so that each and every customer gets the desired product  they want.  </p>
                        </div>

                        <div className="col-6 col-lg-2  d-flex justify-content-center mt-4">
                            <ul className='text-white '>
                                <h4>Useful Links</h4>
                                <li><Link to='/home' className='Links'>Home</Link></li>
                                <li><Link to='/review' className='Links'>Reviews</Link></li>
                                <li><Link to='/parts' className='Links'>Parts</Link></li>
                            </ul>
                        </div>

                        <div className="col-6 col-lg-2 mt-4 ">
                            <ul className='text-white'>
                                <h4 >Support</h4>
                                <li><Link to='/join' className='Links'>Join</Link></li>
                                <li><Link to='/portfolio' className='Links'>About</Link></li>

                            </ul>
                        </div>
                        <div className="col-12 col-lg-4  mt-4 text-white">
                            <div>
                                <h4 className='fw-bolder '>Tips & Guides</h4>
                                <p className='my-3'>Chose the parts wisely before you build your  machine</p>
                                <hr />
                                <p className='mt-2'>Not every parts is compatible to your requirement</p>
                            </div>

                        </div>
                    </div>
                    <hr className='' />
                    <h5 className='text-white text-center my-3 fs-6'>Copyright ©2022 All rights reserved | This template is made with 💙 by <a target="__blank" className='owner' href='https://github.com/mushfiqueyeasir'>Mushfique Yeasir</a></h5>
                </div>
            </Bounce>

        </footer>
    );
};

export default Footer;