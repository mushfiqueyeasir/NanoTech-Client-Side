import React, { useEffect, useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'


const CheckoutForm = ({ order }) => {
    const { _id, name, email, address, phone, product, productBrand, img, quantity, price, paid } = order
    const stripe = useStripe();
    const elements = useElements();
    const [cardError, setCardError] = useState('');
    const [success, setSuccess] = useState('');
    const [transId, setTransId] = useState('');
    const [clientSecret, setClientSecret] = useState("");

    useEffect(() => {
        fetch(`${process.env.REACT_APP_serverLocation}/create-payment-intent`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
            body: JSON.stringify({ price })
        })
            .then(res => res.json())
            .then(data => {
                if (data?.clientSecret) {
                    setClientSecret(data.clientSecret);
                }
            })

    }, [price])



    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }


        // Use your card Element with other Stripe.js APIs
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {

            setCardError(error.message)
        } else {

            setCardError('')
        }
        setSuccess('');

        // Confirm Card Payment
        const { paymentIntent, error: intentError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: name,
                        email: email,
                    },
                },
            },
        );
        if (intentError) {
            setCardError(intentError.message);
            setSuccess('')
        } else {
            setCardError('');

            setTransId(paymentIntent.id)
            setSuccess('Congrats! Your payment is completed');

            const updatedOrder = {
                name: order.name,
                email: order.email,
                product: order.product,
                productBrand: order.productBrand,
                img: order.img,
                quantity: order.quantity,
                price: order.price,
                paid: 'pending'
            }

            fetch(`${process.env.REACT_APP_serverLocation}/orders/${_id}`, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json',
                    authorization: `Bearer ${localStorage.getItem('accessToken')}`
                },
                body: JSON.stringify(updatedOrder)
            })
                .then(res => res.json())
                .then(data => {

                })


        }

    }



    return (
        <form onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <button className='btn btn-info  mt-3' type="submit" disabled={!stripe || !clientSecret}>
                Pay
            </button>
            {
                cardError && <p className='text-danger fw-bold'>{cardError}</p>
            }
            {
                success && <div>
                    <p className='text-success fw-bold'>{success}</p>
                    <p className='fw-bold'>Your Transaction Id: <span className='text-info'>{transId} </span></p>

                </div>
            }
        </form>

    );
};

export default CheckoutForm;