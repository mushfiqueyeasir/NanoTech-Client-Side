
import { useEffect, useState } from 'react';

const useParts = () => {
    const [parts, setParts] = useState([]);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_serverLocation}/parts`)
            .then(result => result.json())
            .then(data => setParts(data))
    }, [parts]);


    return parts;
};

export default useParts;
