import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

function AdminProtectedPage({ isAllowed, children }) {
    if (!isAllowed) {
        console.log('admin');
        return <Navigate to={'/error'} />;
    }
    return children ? children : <Outlet />;
}

export default AdminProtectedPage;
