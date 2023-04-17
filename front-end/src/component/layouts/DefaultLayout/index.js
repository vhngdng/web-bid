/* eslint-disable no-extra-boolean-cast */
import React from 'react';
import { Outlet } from 'react-router-dom';
import HeaderDefault from './HeaderDefault';
import FooterDefault from './FooterDefault';
import BackgroundImage from './BackgroundImage';
import { useSelector } from 'react-redux';
import HeaderNotAuthenticate from './HeaderNotAuthenticate';

function DefaultLayout() {
    const { isAuthenticated } = useSelector((state) => state.auth);
    return (
        <BackgroundImage>
            <div className="h-full w-full relative">
                {!!isAuthenticated ? (
                    <HeaderDefault />
                ) : (
                    <HeaderNotAuthenticate />
                )}
                <section className="flex justify-center items-center">
                    <Outlet />
                </section>
                <FooterDefault />
            </div>
        </BackgroundImage>
    );
}

export default DefaultLayout;
