import React from 'react';
import './Payment.css';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import Loading from '../../../Shared/Loading/Loading';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';


const stripePromise = loadStripe('pk_test_51L20hcIOViA0uwrQXgdGPpkThTwK5uDjndGSPhEUTN0YKT67S6FcwLebC35qcDJSIadeL5FzwJ9W8uWSHOWXM46T00s98exUpJ');

const Payment = () => {
    const { id } = useParams();

    const { data: order, isLoading, refetch } = useQuery(['orders', id], () => fetch(`${process.env.REACT_APP_serverLocation}/orders/payment/${id}`, {
        method: 'GET',
        headers: {
            authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }

    }).then(res => res.json()))

    if (isLoading) {
        return <Loading />
    }

    return (
        <div className='container d-flex flex-column align-items-center mb-5 px-3'>
            <h2 className='text-white text-center fw-bold py-5'>Payment</h2>

            <div className="row widthContainer">
                <h3 className='text-white mb-3'>Hello! {order.name}</h3>
                <div className="col-12 col-lg-6 ">
                    <div className="card cardRadious ">
                        <img src={order.img} className="card-img-top img-fluid imageRadious" alt="..." />
                        <div className="card-body text-start">
                            <h5 className="cardTitle fs-5">{order.product}</h5>
                            <h5 className="cardTitle fs-6 ">Brand:{order.productBrand}</h5>
                            <h5 className='cardPrice fs-6'>Quantity: {order.quantity}</h5>
                            <h5 className='cardPrice fs-6'>Price: ${order.price}</h5>
                        </div>
                    </div>
                    <h3 className='text-white mb-3 mt-3'>Pay for this order</h3>
                </div>
                <div className="col-12 col-lg-6 d-flex flex-column justify-content-center">
                    <div className="card shadow-lg py-5 px-3">
                        <div className="card-body">
                            <Elements stripe={stripePromise}>
                                <CheckoutForm order={order} />
                            </Elements>

                        </div>
                    </div>

                </div>

            </div>


        </div>
    );
};

export default Payment;