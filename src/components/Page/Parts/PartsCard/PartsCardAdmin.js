import React from 'react';
import './PartsCard.css';
import Bounce from 'react-reveal/Bounce';


const PackageCardAdmin = ({ part, handleSeeMore }) => {

    const { _id, partsName, img, description, brand, price } = part;
    let shortDes;
    if (description.length > 90) {
        shortDes = <span>{description.slice(0, 90)}...<button onClick={handleSeeMore} id={_id} type="button" data-bs-toggle="modal" data-bs-target="#staticBackdrop" className='descriptionSeeMore'>see more</button> </span>;
    } else {
        shortDes = description;
    }

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
                </div>
            </div>
        </Bounce>
    );
};

export default PackageCardAdmin;