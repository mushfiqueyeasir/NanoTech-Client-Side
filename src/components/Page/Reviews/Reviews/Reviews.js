import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useReviews from '../../../../hooks/useReviews';
import CommentsModal from '../CommentsModal/CommentsModal';
import ReviewCard from '../ReviewCard/ReviewCard';
import './Reviews.css';


const Reviews = () => {
    const reviews = [...useReviews()].reverse();
    const [commentsModalID, setCommentsModalID] = useState('');
    let length = reviews.length;
    const location = window.location.href.substring(window.location.href.lastIndexOf('/') + 1);

    if (!location || location === 'home') {
        length = 6;
    }
    const handleSeeMore = (event) => {
        setCommentsModalID(event.target.id);
    }
    return (

        <article className='py-5 bg-semiBlack py-lg-5'>
            <div className='container my-0 '>
                {
                    length === 6 ?
                        <>
                            <h1 className='titleOffer'>What's Our Customer Says</h1>
                            <div className='d-flex justify-content-end mb-3 me-2'>
                                <Link to='/review' className='seeAll'>See All <span className="fa-solid fa-circle-chevron-down seeAll"></span></Link>
                            </div>
                        </>
                        :
                        <></>
                }
                <CommentsModal commentsModalID={commentsModalID} />
                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                    {
                        reviews.slice(0, length).map(review => <ReviewCard key={review._id} review={review} handleSeeMore={handleSeeMore} />)
                    }
                </div>
            </div >
        </article >

    );
};

export default Reviews;