import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, NavLink } from 'react-router-dom';
import auth from '../../../../firebase.init';
import Loading from '../../../Shared/Loading/Loading';
import './DashBoardNavbar.css';

const DashBoardNavbar = () => {
    const [navBar, serNavBar] = useState(false);


    const handleDrawer = () => {
        if (!navBar) {
            try {
                document.getElementById('dashboardBody').classList.add('d-none');
                document.getElementById('dashboardNav').classList.remove('d-none');
                serNavBar(true);

            } catch (error) {


            }
        } else {
            try {
                document.getElementById('dashboardBody').classList.remove('d-none');
                document.getElementById('dashboardNav').classList.add('d-none');
                serNavBar(false)


            } catch (error) {

            }
        }
    }
    const [user, loading] = useAuthState(auth);


    if (loading) {
        return <Loading />
    }

    let url;
    if (user) {
        url = user.photoURL;
        if (!url) {
            url = 'https://i.ibb.co/hdR3wJJ/businessman-character-avatar-isolated-24877-60111.jpg';
        }
    }
    return (
        <nav className="navbar navbar-expand-lg dashboardNav">
            <div className="container">
                <div>

                    <Link to='/home' className="navbar-brand d-flex align-items-center   justify-content-center  text-info fw-bolder p-3">
                        <span className="material-icons">
                            home
                        </span>
                        Home
                    </Link>

                </div>


                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav align-items-center gap-4 ms-auto mb-2 mb-lg-0">
                        <li className='nav-item '>
                            <label className='text-white fw-bold fs-6'>{user.displayName}</label>
                        </li>
                        <li className='nav-item profileDP'>
                            <img src={url} className="img-fluid rounded-circle " alt="" />
                        </li>

                    </ul>
                </div>

                {
                    !navBar ?
                        <button onClick={handleDrawer} className=" d-block  d-lg-none btnToggol" type="button">
                            <i className="fa-solid fa-bars fs-1 text-white toggleer "></i>

                        </button>
                        :
                        <button onClick={handleDrawer} className=" d-block d-lg-none  btnToggol" type="button">
                            <i className="fa-solid fa-xmark fs-1 toggleer"></i>

                        </button>

                }





            </div>
        </nav>
    );
};

export default DashBoardNavbar;