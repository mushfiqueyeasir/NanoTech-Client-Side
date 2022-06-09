import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import auth from '../../../../firebase.init';
import { useAuthState } from 'react-firebase-hooks/auth';
import Loading from '../../../Shared/Loading/Loading';
import ReactStars from "react-rating-stars-component";
import { render } from "react-dom";


const AddReview = () => {
    const [user, loading] = useAuthState(auth);
    const [rating, setRating] = useState(0);
    const { register, formState: { errors }, handleSubmit, reset } = useForm();
    if (loading) {
        return <Loading />
    }

    const ratingChanged = (newRating) => {
        setRating(newRating);
    };


    const onSubmit = async data => {

        const url = user.photoURL || 'https://cdn-icons-png.flaticon.com/512/147/147140.png';
        const review = {
            name: user.displayName,
            img: url,
            rating: rating,
            occupation: data.occupation,
            message: data.message
        }



        //sending database
        fetch(`${process.env.REACT_APP_serverLocation}/reviews`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(review)
        })
            .then(res => res.json())
            .then(inserted => {
                if (inserted.insertedId) {
                    toast.success(`Review added successfully`, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: 'dark'
                    });
                    reset();
                } else {
                    toast.error(`Failed to add review!`, {
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
            })

    };
    return (
        <div>
            <h2 className="p-5 text-white text-center fw-bold">ADD REVIEW</h2>

            <div className=" d-flex flex-column align-items-center justify-content-center px-4">
                <form onSubmit={handleSubmit(onSubmit)} className='p-5 customCard wide' >


                    {/* Message */}
                    <div className="mb-3">
                        <label className="fromTitle">Review</label>
                        <textarea type="text" rows='5' className="form-control" {...register("message", {
                            required: {
                                value: true,
                                message: 'Message is Required'
                            },
                            minLength: {
                                value: 10,
                                message: 'minimum 10 characters'
                            }
                        })} />
                        <div className="form-text">
                            {errors.message?.type === 'required' && <span className='text-danger fw-bold'>{errors.message.message}</span>}
                            {errors.message?.type === 'minLength' && <span className='text-danger fw-bold'>{errors.message.message}</span>}
                        </div>
                    </div>

                    {/*Occupation */}
                    <div className="mb-3">
                        <label className="fromTitle">Occupation</label>
                        <input type="text" className="form-control" {...register("occupation", {
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

                    {/*Rating*/}
                    <div className="mb-3">
                        <label className="fromTitle mb-0 pb-0">Rating</label>
                        <ReactStars
                            count={5}
                            onChange={ratingChanged}
                            size={35}
                            isHalf={true}
                            emptyIcon={<i className="far fa-star "></i>}
                            halfIcon={<i className="fa fa-star-half-alt"></i>}
                            fullIcon={<i className="fa fa-star"></i>}
                            activeColor="#ffd700" />
                    </div>


                    <div className=" mt-2 d-flex align-items-center justify-content-center">
                        <button type="submit" className="btn btn-outline-light fw-bold px-5">ADD REVIEW</button>
                    </div>





                </form>
            </div >
        </div >
    );
};

export default AddReview;