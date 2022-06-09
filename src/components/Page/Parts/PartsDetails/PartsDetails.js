import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../../firebase.init';
import { emailValidation, nameValidation, phoneValidation } from '../../../../hooks/validation';
import './PartsDetails.css';
import { useParams } from 'react-router-dom';
import useSpecificParts from '../../../../hooks/useSpecificParts';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';





const PartsDetails = () => {

    const { id } = useParams();
    const part = useSpecificParts(id);
    const [quantity, setQuantity] = useState(0);
    const [netPrice, setNetPrice] = useState(0);
    const [customError, setCustomError] = useState('');
    const { partsName, img, description, brand, minOrderQuantity, availableQuantity, price } = part;
    const { register, formState: { errors }, handleSubmit, reset } = useForm();


    const [user] = useAuthState(auth);

    const calculation = (event) => {
        if (event.target.value === '') {
            setQuantity(0);
            setNetPrice(0);
            setCustomError('');
            try {
                document.getElementById('add').disabled = true;

            } catch (error) {

            }
        } else if (parseFloat(event.target.value) < parseFloat(minOrderQuantity)) {
            setQuantity(0);
            setNetPrice(0);
            setCustomError(`Must Order minimum ${minOrderQuantity} quantity`);
            try {
                document.getElementById('add').disabled = true;

            } catch (error) {

            }
        } else if (parseFloat(event.target.value) > parseFloat(availableQuantity)) {
            setQuantity(0);
            setNetPrice(0);
            setCustomError(`Can't Order more than ${availableQuantity} quantity`);
            try {
                document.getElementById('add').disabled = true;

            } catch (error) {

            }
        } else {
            setQuantity(parseFloat(event.target.value));
            setCustomError('');
            setNetPrice(parseFloat(event.target.value) * parseFloat(price));
            try {
                document.getElementById('add').disabled = false;

            } catch (error) {

            }
        }
    }


    const onSubmit = async data => {
        const order = data;

        order.product = partsName;
        order.productBrand = brand;
        order.img = img;
        order.quantity = quantity;
        order.price = netPrice;
        order.paid = 'unpaid';
        //sending database
        fetch(`${process.env.REACT_APP_serverLocation}/orders`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(order)
        })
            .then(res => res.json())
            .then(inserted => {
                if (inserted.insertedId) {

                    reset();
                    delete part.availableQuantity;
                    part.availableQuantity = availableQuantity - quantity

                    const updatedpart = {
                        partsName: partsName,
                        img: img,
                        description: description,
                        brand: brand,
                        minOrderQuantity: minOrderQuantity,
                        availableQuantity: availableQuantity - quantity,
                        price: price
                    }
                    fetch(`${process.env.REACT_APP_serverLocation}/parts/${id}`, {
                        method: 'PUT',
                        headers: {
                            'content-type': 'application/json',
                            authorization: `Bearer ${localStorage.getItem('accessToken')}`
                        },
                        body: JSON.stringify(updatedpart)
                    })
                        .then(res => res.json())
                        .then(dta => {
                            toast.success(`Order added successfully`, {
                                position: "top-right",
                                autoClose: 5000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                theme: 'dark'
                            });
                        })
                } else {
                    toast.error(`Failed to add the Order`, {
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
    // console.js




    return (
        <div className='container my-5'>
            <div className="row align-items-center">
                <div className="col-12 col-lg-6 order-2 px-1  px-md-5 my-5">
                    <div className='d-flex justify-content-center p-3'>
                        <div className="customCard  align-items-center justify-content-center">
                            <div className="card-body  p-4">
                                <form onSubmit={handleSubmit(onSubmit)}>

                                    <div className="row">
                                        {/* Name*/}
                                        <div className="mb-3">
                                            <label className="fromTitle">Name</label>
                                            <input defaultValue={user.displayName} readOnly type="text" className="form-control" {...register("name", {
                                                required: {
                                                    value: true,
                                                    message: 'Name is Required'
                                                },
                                                minLength: {
                                                    value: 4,
                                                    message: 'minimum 4 characters'
                                                }
                                            })} />
                                            <div className="form-text">
                                                {errors.name?.type === 'required' && <span className='text-danger fw-bold'>{errors.name.message}</span>}
                                                {errors.name?.type === 'minLength' && <span className='text-danger fw-bold'>{errors.name.message}</span>}
                                            </div>
                                        </div>

                                        {/*Email */}
                                        <div className="mb-3">
                                            <label className="fromTitle">email</label>
                                            <input defaultValue={user.email} readOnly type="email" className="form-control" {...register("email", {
                                                required: {
                                                    value: true,
                                                    message: 'Email is Required'
                                                },


                                            })} />
                                            <div className="form-text">
                                                {errors.email?.type === 'required' && <span className='text-danger fw-bold'>{errors.email.message}</span>}
                                            </div>
                                        </div>

                                        {/* Address*/}
                                        <div className="mb-3">
                                            <label className="fromTitle">Address</label>
                                            <input type="text" className="form-control" {...register("address", {
                                                required: {
                                                    value: true,
                                                    message: 'Address is Required'
                                                },
                                                minLength: {
                                                    value: 6,
                                                    message: 'minimum 4 characters'
                                                }
                                            })} />
                                            <div className="form-text">
                                                {errors.address?.type === 'required' && <span className='text-danger fw-bold'>{errors.address.message}</span>}
                                                {errors.address?.type === 'minLength' && <span className='text-danger fw-bold'>{errors.address.message}</span>}
                                            </div>
                                        </div>

                                        {/* Phone*/}
                                        <div className="mb-3">
                                            <label className="fromTitle">Phone Number</label>
                                            <input type="text" className="form-control" {...register("phone", {
                                                required: {
                                                    value: true,
                                                    message: 'Phone Number is Required'
                                                },
                                                minLength: {
                                                    value: 4,
                                                    message: 'minimum 4 characters'
                                                }
                                            })} />
                                            <div className="form-text">
                                                {errors.phone?.type === 'required' && <span className='text-danger fw-bold'>{errors.phone.message}</span>}
                                                {errors.phone?.type === 'minLength' && <span className='text-danger fw-bold'>{errors.phone.message}</span>}
                                            </div>
                                        </div>

                                        {/* Order  Quantity*/}
                                        <div className="mb-3">
                                            <label className="fromTitle">Quantity</label>
                                            <input onChange={calculation} placeholder={'minimum order quantity  ' + minOrderQuantity} type="number" className="form-control " required />
                                            <div className="form-text">
                                                <span className='text-danger fw-bold'>{customError}</span>
                                            </div>
                                        </div>

                                        {/*Net Price */}
                                        <div className="mb-3">
                                            <label className="fromTitle">Net Price</label>
                                            <label defaultValue={netPrice} required type="number" className="form-control">{netPrice}</label>
                                        </div>

                                        <div className="mt-2 d-flex align-items-center justify-content-center">
                                            <button id='add' type="submit" className="btn btn-outline-light fw-bold px-5" disabled>ADD PARTS</button>
                                        </div>

                                    </div>
                                </form>

                            </div>
                        </div>

                    </div>


                </div>

                <div className="col-12 col-lg-6 order-1 my-0">

                    <div className="card align-items-center cardRadious ">
                        <img src={img} className="card-img-top imageRadious" alt="..." />
                        <div className="card-body ">
                            <h5 className="card-title cardTitle ">{partsName}</h5>
                            <p className="card-text pt-0 mt-0 cardDetails">{description}</p>
                        </div>
                        <div className="w-100 ps-4 mb-2">
                            <h5 className='cardPrice '>Minimum Order quantity: {minOrderQuantity}</h5>
                            <h5 className='cardPrice'>Available Quantity: {availableQuantity}</h5>
                        </div>
                        <div className="w-100 ps-4 mb-2">
                            <h5 className='cardPrice '>Brand: {brand}</h5>
                            <h5 className='cardPrice '>Price: ${price}</h5>
                        </div>


                    </div>

                </div>

            </div>


        </div>
    );
};

export default PartsDetails;