import React from 'react';
import { Outlet } from 'react-router-dom';
import HeaderDefault from './HeaderDefault';

function DefaultLayout() {
    return (
        <div className="">
            <HeaderDefault />
            <section className="flex justify-center items-center">
                <Outlet />
            </section>
        </div>
    );
}

export default DefaultLayout;
