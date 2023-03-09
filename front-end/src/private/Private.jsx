import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

function Private() {
    const { isAuthenticated, auth } = useSelector((state) => state.auth);
    if (!isAuthenticated || !auth) {
        return <Navigate to={'login'} />;
    }

    // Kiểm tra thêm quyền

    return <Outlet />;
}

export default Private;
