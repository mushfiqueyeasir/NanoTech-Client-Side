import { useEffect, useState } from 'react';

const useReviews = () => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_serverLocation}/reviews`)
            .then(result => result.json())
            .then(data => setReviews(data))
    }, [reviews]);


    return reviews;
};

export default useReviews;