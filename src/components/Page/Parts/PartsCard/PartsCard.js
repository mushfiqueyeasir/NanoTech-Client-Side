import React from 'react';
import { Link } from 'react-router-dom';
import DescriptionsModal from '../DescriptionsModal/DescriptionsModal';
import './PartsCard.css';
import Bounce from 'react-reveal/Bounce';
import auth from '../../../../firebase.init';
import { useAuthState } from 'react-firebase-hooks/auth';
import Loading from '../../../Shared/Loading/Loading';
import useAdmin from '../../../../hooks/useAdmin';


const PackageCard = ({ part, handleSeeMore }) => {
    // const [user] = useAuthState(auth);
    // const [admin, adminLoading] = useAdmin(user);
    // console.log(admin);

    // if (adminLoading && admin) {
    //     return <Loading />
    // }
    const { _id, partsName, img, description, brand, price } = part;
    let shortDes;
    if (description.length > 90) {
        shortDes = <span>{description.slice(0, 90)}...<button onClick={handleSeeMore} id={_id} type="button" data-bs-toggle="modal" data-bs-target="#staticBackdrop" className='descriptionSeeMore'>see more</button> </span>;
    } else {
        shortDes = description;
    }
    const path = '/parts/' + _id;

    return (
        <Bounce >
            <div className="col">
                <div className="card align-items-center cardRadious ">
                    <img src={img} className="card-img-top img-fluid imageRadious" alt="..." />
                    <div className="card-body cardBodyHeight">
                        <h5 className="card-title cardTitle ">{partsName}</h5>
                        <p className="card-text pt-0 mt-0 cardDetails">{shortDes}</p>
                    </div>
                    <div className="w-100 ps-4 mb-2">
                        <h5 className='cardPrice '>Brand: {brand}</h5>
                        <h5 className='cardPrice '>Price: ${price}</h5>
                    </div>
                    <div className="card-footer cardFooter pt-0 mb-3 ">
                        <Link to={path} className='startNow  '>Order Now</Link>
                    </div>
                </div>
            </div>
        </Bounce>
    );
};

export default PackageCard;