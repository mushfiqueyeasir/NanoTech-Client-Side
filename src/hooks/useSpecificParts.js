import { useEffect, useState } from 'react';

const useSpecificParts = (id) => {
    const [part, setPart] = useState({});

    useEffect(() => {
        fetch(`${process.env.REACT_APP_serverLocation}/parts/${id}`)
            .then(result => result.json())
            .then(data => setPart(data))
    }, [id]);

    return part;

};

export default useSpecificParts;
