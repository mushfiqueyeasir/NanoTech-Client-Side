import React, { useState } from 'react';
import './Parts.css';
import useParts from '../../../../hooks/useParts';
import PartsCard from '../PartsCard/PartsCard';
import PartsCardAdmin from '../PartsCard/PartsCardAdmin';
import { Link } from 'react-router-dom';
import DescriptionsModal from '../DescriptionsModal/DescriptionsModal';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../../firebase.init';
import useAdmin from '../../../../hooks/useAdmin';
import Loading from '../../../Shared/Loading/Loading';


const Parts = () => {
    const parts = [...useParts()].reverse();
    const [user] = useAuthState(auth);
    const [admin, adminLoading] = useAdmin(user);
    const [modalID, setModalID] = useState('');


    if (adminLoading && admin) {
        return <Loading />
    }


    let length = parts.length;
    const location = window.location.href.substring(window.location.href.lastIndexOf('/') + 1);
    if (!location || location === 'home') {
        length = 3;
    }

    const handleSeeMore = (event) => {
        setModalID(event.target.id);
    }

    return (

        <article className='py-5 bg-semiBlack '>
            <div className='container'>
                {
                    length === 3 ?
                        <>
                            <div className=''>
                                <h2 className='titleMini text-center'>OUR PRODUCTS</h2>
                                <h3 className='titleOffer text-center'>TO COMPLETE YOUR DREAM</h3>
                            </div>
                            <div className='d-flex justify-content-end mb-3 me-2'>
                                <Link to='/parts' className='seeAll'>See All <span className="fa-solid fa-circle-chevron-down seeAll"></span></Link>
                            </div>
                        </>
                        :
                        <></>
                }
                <DescriptionsModal modalID={modalID} />
                <div className="row row-cols-1 row-cols-md-2  row-cols-lg-3 g-4">
                    {
                        admin && parts.slice(0, length).map(part => <PartsCardAdmin key={part._id} part={part} handleSeeMore={handleSeeMore} />)
                    }
                    {
                        !admin && parts.slice(0, length).map(part => <PartsCard key={part._id} part={part} handleSeeMore={handleSeeMore} />)
                    }

                </div>
            </div>
        </article>

    );
};

export default Parts;