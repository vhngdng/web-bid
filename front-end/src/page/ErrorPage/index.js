import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

function ErrorPage404() {
    const navigate = useNavigate();
    useEffect(() => {
        toast.success('You will be redirect to home page', {
            position: 'bottom-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: 'dark',
        });
        setTimeout(() => {
            navigate('/');
        }, 4000);
    }, []);
    return (
        <>
            <div>ErrorPage404</div>
            <ToastContainer />
        </>
    );
}

export default ErrorPage404;
