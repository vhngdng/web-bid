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
            <div className="w-full min-h-screen flex-block flex-col justify-between">
                {!!isAuthenticated ? (
                    <HeaderDefault />
                ) : (
                    <HeaderNotAuthenticate />
                )}
                <section className="my-6 min-h-full flex justify-center items-center">
                    <Outlet className="py-6" />
                </section>
                <FooterDefault />
            </div>
        </BackgroundImage>
    );
}

export default DefaultLayout;
