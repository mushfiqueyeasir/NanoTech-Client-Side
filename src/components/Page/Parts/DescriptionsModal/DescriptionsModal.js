import React from 'react';
import useSpecificParts from '../../../../hooks/useSpecificParts';
import './DescriptionsModal.css';

const DescriptionsModal = ({ modalID }) => {
    const part = useSpecificParts(modalID);
    const { _id, partsName, img, description, brand, price } = part;
    const path = '/parts/' + _id;


    return (
        <div className="modal modalCenter fade " id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">

                <div className="modal-content bg-black ">

                    <div className="modal-body">
                        <div className="card align-items-center cardRadious">
                            <img src={img} className="card-img-top img-fluid imageRadious" alt="..." />
                            <div className="card-body cardBodyHeight">
                                <h5 className="card-title cardTitle ">{partsName}</h5>
                                <p className="card-text cardDetails">{description}</p>
                            </div>
                            <div className="w-100 ps-4 mb-2">
                                <h5 className='cardPrice '>Brand: {brand}</h5>
                                <h5 className='cardPrice '>Price: ${price}</h5>
                            </div>

                            <div className="card-footer cardFooter pt-0 mb-3 ">
                                <button type="button" data-bs-dismiss="modal" className='startNow'>Close</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default DescriptionsModal;