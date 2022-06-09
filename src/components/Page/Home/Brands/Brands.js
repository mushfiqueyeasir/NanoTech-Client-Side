import React from 'react';
import './Brands.css';
import Bounce from 'react-reveal/Bounce';
import intel from '../../../../resource/brands/intel.png';
import amd from '../../../../resource/brands/amd.png';
import asus from '../../../../resource/brands/asus.png';
import msi from '../../../../resource/brands/msi.png';
import gigabyte from '../../../../resource/brands/gigabyte.png';
import nvidia from '../../../../resource/brands/nvidia.png';
import transcend from '../../../../resource/brands/transcend.png';
import zotac from '../../../../resource/brands/zotac.png';

const Brands = () => {
    return (

        <article className='py-5 m-0 bg-Black'>
            <div className="container d-flex flex-column  align-items-center">
                <h3 className='articleTitle text-center'>Our Brands</h3>

                <Bounce left>
                    <div className='row row-cols-1 row-cols-md-2 row-cols-lg-4 mt-3 justify-content-center g-4'>

                        <div className="col d-flex justify-content-center align-items-center">
                            <a target="_blank" href="https://www.intel.co.uk/content/www/uk/en/homepage.html"> <img src={intel} className="brandImage" alt="Intel" /></a>
                        </div>
                        <div className="col d-flex justify-content-center align-items-center">
                            <a target="_blank" href="https://www.amd.com"> <img src={amd} className="brandImage" alt="Intel" /></a>
                        </div>
                        <div className="col d-flex justify-content-center align-items-center">
                            <a target="_blank" href="https://www.asus.com"> <img src={asus} className="brandImage" alt="Intel" /></a>
                        </div>
                        <div className="col d-flex justify-content-center align-items-center">
                            <a target="_blank" href="https://www.msi.com"> <img src={msi} className="brandImage" alt="Intel" /></a>
                        </div>
                        <div className="col d-flex justify-content-center align-items-center">
                            <a target="_blank" href="https://nvidia.com"> <img src={nvidia} className="brandImage" alt="Intel" /></a>
                        </div>
                        <div className="col d-flex justify-content-center align-items-center">
                            <a target="_blank" href="https://gigabyte.com"> <img src={gigabyte} className="brandImage" alt="Intel" /></a>
                        </div>
                        <div className="col d-flex justify-content-center align-items-center">
                            <a target="_blank" href="https://www.zotac.com/bd/"> <img src={zotac} className="brandImage" alt="Intel" /></a>
                        </div>
                        <div className="col d-flex justify-content-center align-items-center">
                            <a target="_blank" href="https://us.transcend-info.com/"> <img src={transcend} className="brandImage" alt="Intel" /></a>
                        </div>
                    </div>
                </Bounce>

            </div>
        </article>

    );
};

export default Brands;