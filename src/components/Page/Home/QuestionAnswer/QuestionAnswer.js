import React from 'react';
import './QuestionAnswer.css';
import faq from '../../../../resource/faq.png'
import { Bounce } from 'react-reveal';

const QuestionAnswer = () => {
    return (
        <div className='bg-semiBlack py-5'>
            <div className='container'>
                <h1 className='titleOffer text-capitalize'>frequently asked questions? </h1>

                <div className="row justify-content-center align-items-center mt-5">
                    <Bounce left>
                        <div className="col-12 col-lg-6 order-2 order-lg-1 ">
                            <div className="container">
                                <div className="accordion" id="accordionExample">
                                    <div className="item">
                                        <div className="item-header" id="headingOne">
                                            <h2 className="mb-0">
                                                <button className="btn btn-link text-break" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                                    <span className='text-break pe-4 pe-md-1'> What kind of  products we  supply?</span>
                                                    <i className="fa fa-angle-down"></i>
                                                </button>
                                            </h2>
                                        </div>
                                        <div id="collapseOne" className="collapse show" aria-labelledby="headingOne"
                                            data-parent="#accordionExample">
                                            <div className="t-p">
                                                We mainly supply core computer parts like motherboard, gpu , cpu, ram, psu and more. Almost  every Manufacturing company's product goes through us. We distribute in the retailer sop and maintain the market so that there is no shortage and no retailer shop won't  be able to stock any product. As the top  Manufacturing company can't maintain the product and the market on their own  that's where we comes in and maintain the market and premium  experience  of the each customer.
                                            </div>
                                        </div>
                                    </div>
                                    <div className="item">
                                        <div className="item-header" id="headingTwo">
                                            <h2 className="mb-0">
                                                <button className="btn btn-link collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo" >
                                                    <span className='text-break pe-3 pe-md-1'> Why not sell to the customer directly?</span>
                                                    <i className="fa fa-angle-down"></i>
                                                </button>
                                            </h2>
                                        </div>
                                        <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo"
                                            data-parent="#accordionExample">
                                            <div className="t-p">
                                                To ensure the quality of our service and maintain the market flow we don't directly provide any customer our product.They have  to took it from our authorized retailer shop to get the quality support we provide.
                                            </div>
                                        </div>
                                    </div>
                                    <div className="item">
                                        <div className="item-header" id="headingThree">
                                            <h2 className="mb-0">
                                                <button className="btn btn-link collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                                    Are we authorized with the top brands?
                                                    <i className="fa fa-angle-down"></i>
                                                </button>
                                            </h2>
                                        </div>
                                        <div id="collapseThree" className="collapse" aria-labelledby="headingThree"
                                            data-parent="#accordionExample">
                                            <div className="t-p">
                                                Almost every top Manufacturing company's product goes through  us. We maintain their product distribution so that the market can stay stable and every customer's gets their product. Maintaining  the market is almost is important as  production of parts.
                                            </div>
                                        </div>
                                    </div>
                                    <div className="item">
                                        <div className="item-header" id="headingFour">
                                            <h2 className="mb-0">
                                                <button className="btn btn-link collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                                                    Do we offer after sell service?
                                                    <i className="fa fa-angle-down"></i>
                                                </button>
                                            </h2>
                                        </div>
                                        <div id="collapseFour" className="collapse" aria-labelledby="headingFour"
                                            data-parent="#accordionExample">
                                            <div className="t-p">
                                                This is whats makes us best. No company can keep up with our premium and fast after sell support. It's  true for the market stability we dont sell the product to the customer but if they face any issue our customer care team will handle  it directly and fast.
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Bounce>
                    <Bounce right>
                        <div className="col-12 col-lg-6 order-1 order-lg-2 ">
                            <img src={faq} className='w-100' alt="" />
                        </div>
                    </Bounce>
                </div>

            </div>

        </div>
    );
};

export default QuestionAnswer;