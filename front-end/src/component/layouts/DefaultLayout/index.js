import React from 'react';
import { Outlet } from 'react-router-dom';
import HeaderDefault from './HeaderDefault';

function DefaultLayout() {
    return (
        <div className="w-2/3">
            <HeaderDefault />
            <section>
                <Outlet />
            </section>
        </div>
    );
}

export default DefaultLayout;
