import { useEffect, useState } from 'react';

const useSpecificReview = (id) => {
    const [part, setPart] = useState({});

    useEffect(() => {
        fetch(`${process.env.REACT_APP_serverLocation}/reviews/${id}`)
            .then(result => result.json())
            .then(data => setPart(data))
    }, [id]);

    return part;

};

export default useSpecificReview;
