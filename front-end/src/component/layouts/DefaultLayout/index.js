import React from 'react';
import { Outlet } from 'react-router-dom';
import HeaderDefault from './HeaderDefault';
import FooterDefault from './FooterDefault';
import BackgroundImage from './BackgroundImage';

function DefaultLayout() {
    return (
        <BackgroundImage>
            <div className="h-full relative">
                <HeaderDefault />
                <section className="flex justify-center items-center">
                    <Outlet />
                </section>
                <FooterDefault />
            </div>
        </BackgroundImage>
    );
}

export default DefaultLayout;
