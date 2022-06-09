import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import Loading from '../Shared/Loading/Loading';
import auth from '../../firebase.init'
import { Navigate, useLocation } from 'react-router-dom';

const UserAuth = ({ children }) => {
    const [user, loading] = useAuthState(auth);
    const [token, setToken] = useState('');
    const location = useLocation();

    if (loading) {
        return <Loading />
    }

    if (user) {
        const email = user.email;
        const currnentUser = { name: user.displayName, email: email };

        fetch(`${process.env.REACT_APP_serverLocation}/users/${email}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(currnentUser)
        })
            .then(res => res.json())
            .then(data => {
                const token = data.token;
                localStorage.setItem('accessToken', token);
                setToken(token);
            })

        if (token) {
            return children;
        }
        return <Navigate to='/home' state={{ from: location }} replace></Navigate>

    }

    return children;
};

export default UserAuth;