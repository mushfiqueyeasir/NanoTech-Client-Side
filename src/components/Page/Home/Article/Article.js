import React from 'react';
import './Article.css';

const Article = () => {
    return (

        <article className='py-5 m-0 bg-Black'>
            <div className="container d-flex flex-column  align-items-center">
                <h1 className='articleTitle2 text-center'>WHO ARE WE?</h1>
                <p className='articleParagraph my-3'>We provide all kinds of  computer  parts you need to build your dream pc. You wil find almost every top brands products like <strong>AMD, INTEL, ASUS, MSI</strong>  and more options to chose. We mainly provide to the retailer shops so that they can supply to our beloved customer the product they desire. We stock all kind of manufacture company's products  so that we can supply to the market. All of our  products is safely checked and authorized by main brands so even if any product has any issue we can replace it asap. We globally provide these product  withing short time and safe packaging is assured.</p>
            </div>
        </article>

    );
};

export default Article;