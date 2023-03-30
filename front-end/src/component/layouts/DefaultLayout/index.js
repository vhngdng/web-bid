import React from 'react';
import { Outlet } from 'react-router-dom';
import HeaderDefault from './HeaderDefault';

function DefaultLayout() {
    return (
        <div className="">
            <HeaderDefault />
            <section className="min-w-4/5 max-w-screen">
                <Outlet />
            </section>
        </div>
    );
}

export default DefaultLayout;
