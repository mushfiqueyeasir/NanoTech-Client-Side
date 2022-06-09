import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import Loading from '../Shared/Loading/Loading';
import auth from '../../firebase.init'
import { Navigate, useLocation } from 'react-router-dom';


const RequireAuth = ({ children }) => {
    const [user, loading, error] = useAuthState(auth);
    const location = useLocation();
    const [token, setToken] = useState('');

    if (loading) {
        return <Loading />
    }

    if (!user) {
        return <Navigate to='/join' state={{ from: location }} replace></Navigate>
    }
    return children;

};

export default RequireAuth;