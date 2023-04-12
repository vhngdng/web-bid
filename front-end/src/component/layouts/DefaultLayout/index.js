import React from 'react';
import { Outlet } from 'react-router-dom';
import HeaderDefault from './HeaderDefault';
import FooterDefault from './FooterDefault';

function DefaultLayout() {
    return (
        <div className="">
            <HeaderDefault />
            <section className="flex justify-center items-center">
                <Outlet />
            </section>
            <FooterDefault />
        </div>
    );
}

export default DefaultLayout;
