import React from 'react';
import './AddProduct.css';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';


const AddProduct = () => {
    const { register, formState: { errors }, handleSubmit, reset } = useForm();

    const imageStoraeKey = `6ccef2ad6c2e7383ec6802b48a311821`

    const onSubmit = async data => {
        const image = data.image[0];
        const formData = new FormData();
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=${imageStoraeKey}`;
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(result => {
                if (result.success) {
                    const parts = {
                        partsName: data.name,
                        img: result.data.url,
                        description: data.description,
                        brand: data.brand,
                        minOrderQuantity: data.minOrderQuantity,
                        availableQuantity: data.availableQuantity,
                        price: data.price
                    }

                    //sending database
                    fetch(`${process.env.REACT_APP_serverLocation}/parts`, {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json',
                            authorization: `Bearer ${localStorage.getItem('accessToken')}`
                        },
                        body: JSON.stringify(parts)
                    })
                        .then(res => res.json())
                        .then(inserted => {
                            if (inserted.insertedId) {
                                toast.success(`Parts added successfully`, {
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
                                toast.error(`Failed to add the Parts`, {
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
                }
            })


    };

    return (
        <div>
            <h2 className='p-5 text-white text-center fw-bold'>ADD PARTS</h2>
            <div className='d-flex justify-content-center p-3'>
                <div className="customCard  align-items-center justify-content-center">
                    <div className="card-body  p-4">
                        <form onSubmit={handleSubmit(onSubmit)}>

                            <div className="row">

                                <div className="col-12 col-lg-6 order-1">
                                    {/* Parts Name */}
                                    <div className="mb-3">
                                        <label className="fromTitle">Parts  Name</label>
                                        <input type="text" className="form-control" {...register("name", {
                                            required: {
                                                value: true,
                                                message: 'Parts  Name is Required'
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

                                    {/* Brand Name */}
                                    <div className="mb-3">
                                        <label className="fromTitle">Brand  Name</label>
                                        <input type="text" className="form-control" {...register("brand", {
                                            required: {
                                                value: true,
                                                message: 'Brand name is Required'
                                            },

                                        })} />
                                        <div className="form-text">
                                            {errors.brand?.type === 'required' && <span className='text-danger fw-bold'>{errors.brand.message}</span>}
                                        </div>
                                    </div>

                                    {/* Parts Description*/}
                                    <div className="mb-3">
                                        <label className="fromTitle">Parts Description</label>
                                        <textarea type="text" rows='5' className="form-control" {...register("description", {
                                            required: {
                                                value: true,
                                                message: 'Description is Required'
                                            },
                                            minLength: {
                                                value: 10,
                                                message: 'minimum 10 characters'
                                            }
                                        })} />
                                        <div className="form-text">
                                            {errors.description?.type === 'required' && <span className='text-danger fw-bold'>{errors.description.message}</span>}
                                            {errors.description?.type === 'minLength' && <span className='text-danger fw-bold'>{errors.description.message}</span>}
                                        </div>
                                    </div>



                                </div>

                                <div className="col-12 col-lg-6 order-2">
                                    {/* Photo */}
                                    <div className="mb-3">
                                        <label className="fromTitle">Parts Image</label>
                                        <input type='file' className="form-control" {...register("image", {
                                            required: {
                                                value: true,
                                                message: 'Image is Required'
                                            },

                                        })} />
                                        <div className="form-text">
                                            {errors.image?.type === 'required' && <span className='text-danger fw-bold'>{errors.image.message}</span>}

                                        </div>
                                    </div>

                                    {/* Minimum Order Quantity*/}
                                    <div className="mb-3">
                                        <label className="fromTitle">Minimum Order Quantity</label>
                                        <input type="number" className="form-control" {...register("minOrderQuantity", {
                                            required: {
                                                value: true,
                                                message: 'Minimum Order Quantity is Required'
                                            },
                                            min: {
                                                value: 0,
                                                message: "Can't be less than 0"
                                            }

                                        })} />
                                        <div className="form-text">
                                            {errors.minOrderQuantity?.type === 'required' && <span className='text-danger fw-bold'>{errors.minOrderQuantity.message}</span>}
                                            {errors.minOrderQuantity?.type === 'min' && <span className='text-danger fw-bold'>{errors.minOrderQuantity.message}</span>}


                                        </div>
                                    </div>

                                    {/* Available  Quantity*/}
                                    <div className="mb-3">
                                        <label className="fromTitle">Available Quantity</label>
                                        <input type="number" className="form-control" {...register("availableQuantity", {
                                            required: {
                                                value: true,
                                                message: 'Available Quantity is Required'
                                            },
                                            min: {
                                                value: 0,
                                                message: "Can't be less than 0"
                                            }

                                        })} />
                                        <div className="form-text">
                                            {errors.availableQuantity?.type === 'required' && <span className='text-danger  fw-bold'>{errors.availableQuantity.message}</span>}
                                            {errors.availableQuantity?.type === 'min' && <span className='text-danger fw-bold'>{errors.availableQuantity.message}</span>}

                                        </div>
                                    </div>


                                    {/* Price Per  Unite*/}
                                    <div className="mb-3">
                                        <label className="fromTitle">Price Per Unite</label>
                                        <input type="number" className="form-control" {...register("price", {
                                            required: {
                                                value: true,
                                                message: 'Available Quantity is Required'
                                            },

                                        })} />
                                        <div className="form-text">
                                            {errors.price?.type === 'required' && <span className='text-danger fw-bold'>{errors.price.message}</span>}

                                        </div>
                                    </div>
                                </div>

                                <div className="col-12 order-3 mt-2 d-flex align-items-center justify-content-center">
                                    <button type="submit" className="btn btn-outline-light fw-bold px-5">ADD PARTS</button>
                                </div>

                            </div>
                        </form>

                    </div>
                </div>

            </div>
        </div>
    );
};

export default AddProduct;