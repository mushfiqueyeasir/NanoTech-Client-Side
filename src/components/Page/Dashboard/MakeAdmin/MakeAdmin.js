import React from 'react';
import { useQuery } from 'react-query'
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import Loading from '../../../Shared/Loading/Loading';

const MakeAdmin = () => {
    const { data: users, isLoading, refetch } = useQuery('users', () => fetch(`${process.env.REACT_APP_serverLocation}/users`, {
        method: 'GET',
        headers: {
            authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }

    }).then(res => res.json()))

    if (isLoading) {
        return <Loading />
    }


    const makeAdmin = (event) => {
        const email = event.target.id;
        fetch(`${process.env.REACT_APP_serverLocation}/users/admin/${email}`, {
            method: 'PUT',
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        }).then(res => {
            if (res.status === 403) {
                toast.error(`You are not an Admin`, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'colored'
                });

            } else {
                toast.success(`${email} is now an Admin!`, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'dark'
                });

            }
            return res.json()
        })
            .then(data => {

                refetch();
            })
    }

    const removeUser = (event) => {
        const id = event.target.id;
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`${process.env.REACT_APP_serverLocation}/users/admin/${id}`, {
                    method: 'DELETE',
                    headers: {
                        authorization: `Bearer ${localStorage.getItem('accessToken')}`
                    }
                })
                    .then(res => {
                        if (res.status === 403) {
                            toast.error(`You are not an Admin`, {
                                position: "top-right",
                                autoClose: 5000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                theme: 'colored'
                            });
                        }
                        return res.json()
                    })
                    .then(data => {

                        if (data.deletedCount > 0) {
                            toast.error(`User removed!`, {
                                position: "top-right",
                                autoClose: 5000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                icon: <i className="fa-solid fa-circle-check dashboardIcon"></i>,
                                theme: 'colored'
                            });
                            refetch()
                        }
                    })
                Swal.fire(
                    'Deleted!',
                    'User Removed',
                    'success'
                )
            }
        })



    }


    return (
        <div>
            <h2 className="p-5 text-white text-center">Manage Users</h2>
            <div className='p-3 px-lg-5'>
                <table className="table table-dark table-striped ">
                    <thead >
                        <tr >
                            <th scope="col" className='p-4 leftCell'>Email</th>
                            <th scope="col" className='p-4'>Role</th>
                            <th scope="col" className='p-4 rightCell'></th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => <tr key={user._id}>

                            <td className='text-break align-middle p-3'>{user.email}</td>
                            <td className='align-middle p-3 fw-bold text-info '>
                                {
                                    user.role !== 'admin' ?
                                        <>
                                            <button onClick={makeAdmin} className='btn btn-info btn-sm d-none d-md-block' id={user.email}>Make Admin</button>
                                            <button onClick={makeAdmin} className='btn btn-info btn-sm d-block d-md-none' id={user.email}>
                                                <span id={user.email} className="material-icons  fs-1">
                                                    admin_panel_settings
                                                </span>
                                            </button>
                                        </>
                                        :
                                        < >
                                            <label className=''>Admin</label>
                                        </>
                                }

                            </td>
                            <td className='align-middle'>
                                {
                                    user.role !== 'admin' ?
                                        <>
                                            <button onClick={removeUser} className='btn btn-danger btn-sm d-none d-md-block' id={user._id}>Remove User</button>
                                            <button onClick={removeUser} className='btn btn-danger btn-sm d-block d-md-none' id={user._id}>
                                                <span className="material-icons fs-1" id={user._id}>
                                                    person_remove
                                                </span>
                                            </button>
                                        </>
                                        :
                                        <></>
                                }
                            </td>
                        </tr>)}

                    </tbody>
                </table>

            </div>

        </div>
    );
};

export default MakeAdmin;