import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';

import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import auth from '../../../../firebase.init';
import Loading from '../../../Shared/Loading/Loading';
import ManageOrderTR from './ManageOrderTR';

const ManageOrder = () => {
    const [order, setOrder] = useState({});

    const { data: orders, isLoading, refetch } = useQuery('orders', () => fetch(`${process.env.REACT_APP_serverLocation}/orders`, {
        method: 'GET',
        headers: {
            authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }

    }).then(res => res.json()))

    if (isLoading) {
        return <Loading />
    }


    const updateOrder = (event) => {
        const id = event.target.id;


        const updatedOrder = {
            name: order.name,
            email: order.email,
            product: order.product,
            productBrand: order.productBrand,
            img: order.img,
            quantity: order.quantity,
            price: order.price,
            paid: 'paid'
        }

        fetch(`${process.env.REACT_APP_serverLocation}/orders/${id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(updatedOrder)
        })
            .then(res => res.json())
            .then(data => {

                toast.success(`Order Shipped!`, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'dark'
                });
                refetch();
            })

    }



    const deleteOrder = (event) => {
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
                fetch(`${process.env.REACT_APP_serverLocation}/orders/${id}`, {
                    method: 'DELETE',
                    headers: {
                        authorization: `Bearer ${localStorage.getItem('accessToken')}`
                    }
                }).then(res => res.json())
                    .then(data => {
                        if (data.deletedCount > 0) {
                            toast.error(`Order is Deleted!`, {
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
                    'Your file has been deleted.',
                    'success'
                )
            }
        })



    }

    return (
        <div>
            <h2 className='p-5 text-white text-center fw-bold'>Manage Order</h2>

            <div className='p-3 px-lg-5'>
                <table className="table table-dark table-striped ">
                    <thead >
                        <tr >
                            <th scope="col" className='leftCell py-4 p-md-4'>Orders</th>
                            <th scope="col" className='py-4 p-md-4'>Email</th>
                            <th scope="col" className='py-4'> Quantity</th>
                            <th scope="col" className='d-none d-md-table-cell p-3 p-md-4'>price</th>
                            <th scope="col" className='py-4 p-md-4'>Payment</th>
                            <th scope="col" className='rightCell'></th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => <ManageOrderTR key={order._id} order={order} deleteOrder={deleteOrder} updateOrder={updateOrder} />)}

                    </tbody>
                </table>

            </div>

        </div>
    );
};

export default ManageOrder;