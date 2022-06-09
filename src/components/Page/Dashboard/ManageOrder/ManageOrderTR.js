import React, { useEffect } from 'react';
import { toast } from 'react-toastify';

const ManageOrderTR = ({ order, deleteOrder, updateOrder }) => {




    return (

        <tr key={order._id}>

            <td className='text-break align-middle d-md-flex align-items-center  p-2 p-md-3'>
                <div className=''>
                    <img src={order.img} className="rounded-circle productThumb" alt="" />
                </div>
                <div>
                    <p className='text-white ps-2 d-none d-md-block'>{order.product}</p>
                    <p className='text-white ps-2 d-none d-md-block'>Brand: {order.productBrand}</p>
                </div>
            </td>
            <td className='align-middle p-1 p-md-3 text-break'>
                <p>{order.email}</p>
            </td>

            <td className='align-middle d-none d-md-table-cell p-0 p-md-3'>
                <p>{order.quantity}</p>
            </td>

            <td className='align-middle p-0 p-md-3'>
                <p>{order.price}</p>
            </td>

            <td className='align-middle p-0 p-md-3'>
                {
                    order.paid === 'pending' &&
                    <label className='btn  btn-sm btn-info'>Pending</label>
                }
                {
                    order.paid === 'paid' && <label className='btn  btn-sm btn-success'>Paid</label>
                }

                {
                    order.paid === 'unpaid' && <label className='btn  btn-sm btn-warning'>Unpaid</label>
                }
            </td>

            <td className='align-middle p-0 p-1 p-md-3'>
                {
                    order.paid === 'unpaid' && <> <button onClick={deleteOrder} className='btn btn-danger btn-sm d-none d-lg-block text-break ' id={order._id}>Delete Order</button>

                        <button onClick={deleteOrder} className='btn btn-danger btn-sm d-block d-lg-none' id={order._id}>
                            <span className="material-icons" id={order._id}>
                                delete
                            </span>
                        </button>
                    </>

                }
                {
                    order.paid === 'pending' && <> <button onClick={updateOrder} className='btn btn-info btn-sm d-none d-lg-block text-break ' id={order._id}>Ship Now</button>

                        <button onClick={updateOrder} className='btn btn-info btn-sm d-block d-lg-none' id={order._id}>
                            <span className="material-icons" id={order._id}>
                                delete
                            </span>
                        </button>
                    </>

                }
                {
                    order.paid === 'paid' && <>
                    </>

                }
            </td>
        </tr>


    );
};

export default ManageOrderTR;