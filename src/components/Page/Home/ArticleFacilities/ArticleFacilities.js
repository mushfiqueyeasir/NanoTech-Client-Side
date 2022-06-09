import React from 'react';
import './ArticleFacilities.css';
import Bounce from 'react-reveal/Bounce';
const ArticleFacilities = () => {
    return (

        <article className='py-5 m-0 bg-Black'>
            <div className="container d-flex flex-column  align-items-center">
                <h3 className='articleTitle text-center'>WHY CHOSE US?</h3>
                <Bounce left>
                    <div className='row row-cols-1 row-cols-md-2 row-cols-lg-4 mt-3  g-0 g-md-5'>

                        <div className="col">
                            <div className='d-flex justify-content-center'>
                                <h1 className='imageIcon p-3 rounded-circle'><i className="fa-solid fa-truck-fast articleIcon"></i></h1>
                            </div>
                            <h4 className='flexTitle text-center'>Free Shipping</h4>
                            <p className='text-center flexParagraph'>We provide free global shipping so that you don't have to worry about the shipping charge. </p>
                        </div>

                        <div className="col">
                            <div className='d-flex justify-content-center'>
                                <h1 className='imageIcon p-3 px-4 rounded-circle'><i className="fa-solid fa-file-invoice-dollar articleIcon"></i></h1>
                            </div>
                            <h4 className='flexTitle text-center'>Split Your Payment</h4>
                            <p className='text-center flexParagraph'>We support's the small startup company thats we have flexible 0% interest payment. </p>
                        </div>

                        <div className="col">
                            <div className='d-flex justify-content-center'>
                                <h1 className='imageIcon p-3 px-4 rounded-circle'><i className="fa-solid fa-screwdriver-wrench articleIcon"></i></h1>
                            </div>
                            <h5 className='flexTitle text-center'>International Warranty</h5>
                            <p className='text-center flexParagraph'>All the product we provide has international warranty so  that the consumer can stay risk free.</p>
                        </div>

                        <div className="col">
                            <div className='d-flex justify-content-center'>
                                <h1 className='imageIcon p-3 px-4 rounded-circle'><i className="fa-solid fa-headset articleIcon"></i></h1>
                            </div>
                            <h5 className='flexTitle text-center'>Global Support</h5>
                            <p className='text-center flexParagraph'>For our customer we are alway's available for our customer so  they can reach us anytime from anywhere. </p>
                        </div>
                    </div>
                </Bounce>
            </div>
        </article>

    );
};

export default ArticleFacilities;