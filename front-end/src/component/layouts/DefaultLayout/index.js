import React from 'react';
import { Outlet } from 'react-router-dom';
import HeaderDefault from './HeaderDefault';

function DefaultLayout() {
    return (
        <div>
            <HeaderDefault />
            DefaultLayout
            <Outlet />
        </div>
    );
}

export default DefaultLayout;
