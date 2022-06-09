import React from 'react';
import './ManageProducts.css';
import { useQuery } from 'react-query';
import Loading from '../../../Shared/Loading/Loading';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

const ManageProduct = () => {
    const { data: parts, isLoading, refetch } = useQuery('parts', () => fetch(`${process.env.REACT_APP_serverLocation}/parts`, {
        method: 'GET'

    }).then(res => res.json()))

    if (isLoading) {
        return <Loading />
    }

    const deleteParts = (event) => {
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
                fetch(`${process.env.REACT_APP_serverLocation}/parts/admin/${id}`, {
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
                            toast.success(`Parts is removed!`, {
                                position: "top-right",
                                autoClose: 5000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                theme: 'dark'
                            });
                            refetch()
                        }
                    })
                Swal.fire(
                    'Deleted!',
                    'Your Product has been deleted.',
                    'success'
                )
            }
        })



    }

    return (
        <div>
            <h2 className="p-5 text-white text-center fw-bold">Manage Product</h2>

            <div className='p-3 px-lg-5'>
                <table className="table table-dark table-striped ">
                    <thead >
                        <tr >
                            <th scope="col" className='leftCell p-4'>Parts</th>
                            <th scope="col" className='d-none d-md-table-cell py-4'>Available Quantity</th>
                            <th scope="col" className='p-4'>Price</th>
                            <th scope="col" className='rightCell'></th>
                        </tr>
                    </thead>
                    <tbody>
                        {parts.map(part => <tr key={part._id}>

                            <td className='text-break d-flex align-items-center  align-middle p-3'>
                                <div>
                                    <img src={part.img} className="rounded-circle productThumb " alt="" />
                                </div>
                                <div className='d-none d-lg-table-cell'>
                                    <p className='text-white ps-2 '>{part.partsName}</p>
                                    <p className='text-white ps-2'>Brand: {part.brand}</p>
                                </div>
                            </td>

                            <td className='align-middle d-none d-md-table-cell p-0'>
                                <p>{part.availableQuantity}</p>
                            </td>

                            <td className='align-middle p-0'>
                                <p>{part.price}</p>
                            </td>
                            <td className='align-middle p-0'>
                                <button onClick={deleteParts} className='btn btn-danger btn-sm d-none d-md-block ' id={part._id}>Delete Parts</button>

                                <button onClick={deleteParts} className='btn btn-danger btn-sm d-block d-md-none' id={part._id}>
                                    <span className="material-icons" id={part._id}>
                                        delete
                                    </span>
                                </button>
                            </td>
                        </tr>)}

                    </tbody>
                </table>

            </div>
        </div>
    );
};

export default ManageProduct;