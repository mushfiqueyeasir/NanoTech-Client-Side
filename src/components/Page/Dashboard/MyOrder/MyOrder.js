import { signOut } from 'firebase/auth';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import auth from '../../../../firebase.init';
import Loading from '../../../Shared/Loading/Loading';

const MyOrder = () => {
    const [user] = useAuthState(auth);

    const { data: orders, isLoading, refetch } = useQuery('users', () => fetch(`${process.env.REACT_APP_serverLocation}/orders/${user.email}`, {
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
                            toast.error(`ORder is Deleted!`, {
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
                    'Your Order has been deleted.',
                    'success'
                )
            }
        })


    }


    return (
        <div>
            <h2 className='p-5 text-white text-center fw-bold'>MY ORDER</h2>

            <div className='p-3 px-lg-5'>
                <table className="table table-dark table-striped ">
                    <thead >
                        <tr >
                            <th scope="col" className='leftCell p-3 p-md-4'>Orders</th>
                            <th scope="col" className='d-none d-md-table-cell py-4'> Quantity</th>
                            <th scope="col" className='p-3 p-md-4'>price</th>
                            <th scope="col" className='p-3 p-md-4'>Order Status</th>
                            <th scope="col" className='rightCell'></th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => <tr key={order._id}>

                            <td className='text-break align-middle d-md-flex align-items-center  p-2 px-md-3'>
                                <div className=''>
                                    <img src={order.img} className="rounded-circle productThumb" alt="" />
                                </div>
                                <div>
                                    <p className='text-white ps-2 d-none d-md-block'>{order.product}</p>
                                    <p className='text-white ps-2 d-none d-md-block'>Brand: {order.productBrand}</p>
                                </div>
                            </td>

                            <td className='align-middle d-none d-md-table-cell p-0 px-md-3'>
                                <p>{order.quantity}</p>
                            </td>

                            <td className='align-middle p-0 px-md-3'>
                                <p>{order.price}</p>
                            </td>

                            <td className='align-middle p-0 px-md-3'>
                                {
                                    order.paid === 'paid' &&
                                    <span className='btn  btn-sm btn-success'>Paid</span>

                                }
                                {
                                    order.paid === 'pending' &&
                                    <span className='btn  btn-sm btn-info'>Pending</span>

                                }
                                {
                                    order.paid === 'unpaid' &&
                                    <Link to={`/dashboard/order/payment/${order._id}`} className='btn btn-sm btn-warning text-decoration-none'>Pay Now</Link>
                                }
                            </td>

                            <td className='align-middle p-0 px-md-3'>
                                {
                                    order.paid === 'unpaid' && <> <button onClick={deleteOrder} className='btn btn-danger btn-sm d-none d-md-block ' id={order._id}>Delete Order</button>

                                        <button onClick={deleteOrder} className='btn btn-danger btn-sm d-block d-md-none' id={order._id}>
                                            <span className="material-icons" id={order._id}>
                                                delete
                                            </span>
                                        </button></>

                                }
                            </td>
                        </tr>)}

                    </tbody>
                </table>

            </div>
        </div>
    );
};

export default MyOrder;