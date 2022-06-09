import React from 'react';
import './Error.css';
import error from '../../../resource/error.png'
import { Link } from 'react-router-dom';

const Error = () => {
    return (
        <div className='container d-flex flex-column justify-content-center align-items-center view'>
            <img src={error} alt="" className='img-fluid w-25' />
            <h1 className='error'>404</h1>
            <Link to='/home' className='doItButton d-flex justify-content-center align-items-center py-2 px-5  mt-5'>
                <span className="material-icons fs-1 pe-2">
                    home
                </span>
                <span >Go home</span>
            </Link>




        </div>
    );
};

export default Error;