import { signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, Outlet } from 'react-router-dom';
import auth from '../../../../firebase.init';
import useAdmin from '../../../../hooks/useAdmin';
import Loading from '../../../Shared/Loading/Loading';
import './Dashboard.css';

const Dashboard = () => {
    const [user, loading, error] = useAuthState(auth);
    const [admin, adminLoading] = useAdmin(user);

    if (adminLoading) {
        return <Loading />
    }

    const handleSignOut = () => {
        signOut(auth);
    }
    window.onresize = resize;

    function resize(event) {

        if (event.target.innerWidth >= 992) {

            try {
                document.getElementById('dashboardBody').classList.remove('d-none');
                document.getElementById('dashboardNav').classList.remove('d-none');

            } catch (error) {

            }
        }
        if (event.target.innerWidth <= 991) {
            try {
                document.getElementById('dashboardBody').classList.remove('d-none');
                document.getElementById('dashboardNav').classList.add('d-none');

            } catch (error) {

            }

        }
    }

    return (
        <div>
            <div className="row g-0">

                <div className="col-8 col-lg-3 col-xxl-2 dashboard  m-0 p-0 order-1 d-lg-block" id='dashboardNav'>

                    <div className='d-flex flex-column  align-items-start  gap-3 p-3 mt-5'>

                        {/* open to all route */}

                        <Link to='/dashboard' type="button" className="dashboardBtn py-2 px-3 px-xl-5 d-flex align-items-center">
                            <span className="material-icons fs-1">
                                manage_accounts
                            </span>
                            <span className='px-2'>My Profile</span>
                        </Link>

                        {/* open to user only route */}
                        {!admin && <>

                            <Link to='/dashboard/order' type="button" className=" dashboardBtn py-2 px-3 px-xl-5 d-flex align-items-center">
                                <span className="material-icons fs-1">
                                    shopping_cart
                                </span>
                                <span className='px-2'>My Order</span>
                            </Link>

                            <Link to='/dashboard/addReview' type="button" className=" dashboardBtn py-2 px-3 px-xl-5 d-flex align-items-center">
                                <span className="material-icons fs-1">
                                    rate_review
                                </span>
                                <span className='px-2'>Add A Review</span>
                            </Link>
                        </>}
                        {/* open to user only route */}


                        {/* open to Admin only Route */}
                        {admin && <>
                            <Link to='/dashboard/manageOrder' type="button" className="dashboardBtn py-2 px-3 px-xl-5 d-flex align-items-center">
                                <span className="material-icons fs-1">
                                    inventory
                                </span>
                                <span className='px-2'>Manage Orders</span>
                            </Link>

                            <Link to='/dashboard/addProduct' type="button" className="dashboardBtn py-2 px-3 px-xl-5 d-flex align-items-center">
                                <span className="material-icons fs-1  ">
                                    add_circle_outline
                                </span>
                                <span className='px-2'>Add A Product</span>
                            </Link>

                            <Link to='/dashboard/makeAdmin' type="button" className="dashboardBtn py-2 px-3 px-xl-5 d-flex align-items-center">
                                <span className="material-icons  fs-1">
                                    admin_panel_settings
                                </span>
                                <span className='px-2'>Mange Users</span>
                            </Link>

                            <Link to='/dashboard/manageProduct' type="button" className="dashboardBtn py-2 px-3 px-xl-5 d-flex align-items-center">
                                <span className="material-icons fs-1">
                                    inventory_2
                                </span>
                                <span className='px-2'>Manage Products</span>
                            </Link>
                        </>}
                        {/* open to Admin only Route */}

                        {/* Open to all */}
                        <button onClick={handleSignOut} type="button" className="dashboardBtn py-2 px-3 px-xl-5 d-flex align-items-center  logoutBtn">
                            <span className="material-icons fs-1">
                                logout
                            </span>
                            <span className='px-2'>Log Out</span>
                        </button>
                    </div>

                </div>
                <div className="col-12 col-lg-9 col-xxl-10  p-0 m-0 b order-2" id='dashboardBody'>
                    <Outlet />
                </div>
            </div>

        </div >
    );
};

export default Dashboard;