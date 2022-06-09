import { signOut } from 'firebase/auth';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import Swal from 'sweetalert2';
import auth from '../../firebase.init';
import useAdmin from '../../hooks/useAdmin';
import Loading from '../Shared/Loading/Loading';

const RequireUser = ({ children }) => {
    const [user, loading, error] = useAuthState(auth);
    const [admin, adminLoading] = useAdmin(user);

    if (loading || adminLoading) {
        return <Loading />
    }

    if (admin) {
        Swal.fire({
            icon: 'error',
            title: '401',
            text: 'Unauthorized Access!'
        })
        signOut(auth);
        localStorage.removeItem('accessToken');

    }
    return children;
};

export default RequireUser;