import { signOut } from 'firebase/auth';
import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import auth from '../../../../firebase.init';
import Loading from '../../../Shared/Loading/Loading';

const MyProfile = () => {
    const [user, loading] = useAuthState(auth);
    const { register, formState: { errors }, handleSubmit, reset } = useForm();



    const { data: loadedUser, isLoading, refetch } = useQuery('users', () => fetch(`${process.env.REACT_APP_serverLocation}/users/${user.email}`, {
        method: 'GET',
        headers: {
            authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(res => {
        if (res.status === 403) {
            Swal.fire({
                icon: 'error',
                title: '403',
                text: 'Forbidden Access!',
            })
            signOut(auth);
            localStorage.removeItem('accessToken');
        }
        if (res.status === 401) {
            Swal.fire({
                icon: 'error',
                title: '401',
                text: 'Unauthorized  Access!',
            })
            signOut(auth);
            localStorage.removeItem('accessToken');
        }
        return res.json()
    }))

    if (isLoading) {
        return <Loading />
    }

    const onSubmit = async data => {

        const updatedUser = {
            name: user.displayName,
            email: user.email,
            occupation: data.occupation,
            address: data.address,
            phone: data.phone,
            social: data.social
        }

        // sending database
        fetch(`${process.env.REACT_APP_serverLocation}/users/${user.email}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(updatedUser)
        })
            .then(res => {
                if (res.status === 403) {
                    toast.error(`Failed to Update!`, {
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
                    toast.success(`Updated Successfully!`, {
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


    };
    return (
        <div className='mb-5'>
            <h2 className='p-5 text-white text-center fw-bold'>My profile</h2>
            <div className=" d-flex flex-column align-items-center justify-content-center px-4">
                <form onSubmit={handleSubmit(onSubmit)} className='p-5 customCard wide' >


                    {/* Name */}
                    <div className="mb-3">
                        <label className="fromTitle">Name</label>
                        <input defaultValue={user.displayName} readOnly type="text" className="form-control" />
                    </div>

                    {/* Email */}
                    <div className="mb-3">
                        <label className="fromTitle">Email</label>
                        <input defaultValue={user.email} readOnly type="text" className="form-control" />
                    </div>

                    {/*Occupation */}
                    <div className="mb-3">
                        <label className="fromTitle">Occupation</label>
                        <input defaultValue={loadedUser[0]?.occupation || ""} type="text" className="form-control" {...register("occupation", {
                            required: {
                                value: true,
                                message: ' Occupation is Required'
                            },
                            minLength: {
                                value: 4,
                                message: 'minimum 4 characters'
                            }
                        })} />
                        <div className="form-text">
                            {errors.occupation?.type === 'required' && <span className='text-danger fw-bold'>{errors.occupation.message}</span>}
                            {errors.occupation?.type === 'minLength' && <span className='text-danger fw-bold'>{errors.occupation.message}</span>}
                        </div>
                    </div>

                    {/*Address */}
                    <div className="mb-3">
                        <label className="fromTitle">Address</label>
                        <input defaultValue={loadedUser[0]?.address} type="text" className="form-control" {...register("address", {
                            required: {
                                value: true,
                                message: ' Occupation is Required'
                            },
                            minLength: {
                                value: 4,
                                message: 'minimum 4 characters'
                            }
                        })} />
                        <div className="form-text">
                            {errors.address?.type === 'required' && <span className='text-danger fw-bold'>{errors.address.message}</span>}
                            {errors.address?.type === 'minLength' && <span className='text-danger fw-bold'>{errors.address.message}</span>}
                        </div>
                    </div>

                    {/*Phone */}
                    <div className="mb-3">
                        <label className="fromTitle">Phone</label>
                        <input defaultValue={loadedUser[0]?.phone} type="number" className="form-control" {...register("phone", {
                            required: {
                                value: true,
                                message: ' Occupation is Required'
                            },
                            minLength: {
                                value: 4,
                                message: 'minimum 6 characters'
                            }
                        })} />
                        <div className="form-text">
                            {errors.phone?.type === 'required' && <span className='text-danger fw-bold'>{errors.phone.message}</span>}
                            {errors.phone?.type === 'minLength' && <span className='text-danger fw-bold'>{errors.phone.message}</span>}
                        </div>
                    </div>

                    {/*Social Identity */}
                    <div className="mb-3">
                        <label className="fromTitle">Social Link</label>
                        <input defaultValue={loadedUser[0]?.social} type="text" className="form-control" {...register("social", {
                            required: {
                                value: true,
                                message: ' Social Link is Required'
                            },
                            minLength: {
                                value: 4,
                                message: 'minimum 6 characters'
                            }
                        })} />
                        <div className="form-text">
                            {errors.social?.type === 'required' && <span className='text-danger fw-bold'>{errors.social.message}</span>}
                            {errors.social?.type === 'minLength' && <span className='text-danger fw-bold'>{errors.social.message}</span>}
                        </div>
                    </div>




                    <div className=" mt-4 d-flex align-items-center justify-content-center">
                        <button type="submit" className="btn btn-outline-light fw-bold px-5">UPDATE</button>
                    </div>





                </form>
            </div >
        </div>
    );
};

export default MyProfile;