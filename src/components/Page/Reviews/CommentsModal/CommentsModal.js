import React from 'react';
import useSpecificReview from '../../../../hooks/useSpecificReview';
import './CommentsModal.css';

const CommentsModal = ({ commentsModalID }) => {
    const part = useSpecificReview(commentsModalID);
    const { _id, name, img, rating, occupation, message } = part;

    const starArray = [1, 2, 3, 4, 5];
    let full = 0, half = 0, blank = 0;
    full = 5 - rating;
    if (full === 0) {
        full = 5;
    } else {
        full = rating;
        half = rating % 1;
        if (half !== 0) {
            half = 1
        }
        blank = parseInt(5 - rating);
    }


    return (
        <div className="modal modalCenter fade " id="reviewModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">

                <div className="modal-content bg-black ">
                    <div className="modal-body">

                        <div className="card  px-2 cardRadious">
                            <div className='ps-3 pt-3 pb-0 mb-0'>
                                <i className="fa-solid fa-quote-left fs-1 quotes"></i>
                            </div>

                            <div className="card-body pt-0">
                                <p className="card-text mt-0 ps-2 pt-0 cardDetails ">{message}</p>
                                {
                                    starArray.slice(0, full).map(star => <i key={star} className="fa-solid fa-star quotes"></i>)
                                }
                                {
                                    starArray.slice(0, half).map(star => <i key={star} className="fa-solid fa-star-half-stroke  quotes fw-normal"></i>)
                                }
                                {
                                    starArray.slice(0, blank).map(star => <i key={star} className="fa-solid fa-star blankStar"></i>)
                                }
                                <div className='d-flex align-items-center mt-3'>
                                    <div className='w-25'>
                                        <img src={img} className="img-fluid reviewImage" alt="..." />
                                    </div>
                                    <div className='ps-2'>
                                        <h5 className='name'>{name}</h5>
                                        <h5 className='occupation'>{occupation}</h5>
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex justify-content-center pt-0 mb-3 ">
                                <button type="button" data-bs-dismiss="modal" className='startNow'>Close</button>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
};

export default CommentsModal;