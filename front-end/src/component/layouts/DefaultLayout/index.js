/* eslint-disable no-unused-vars */
/* eslint-disable no-extra-boolean-cast */
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import HeaderDefault from './HeaderDefault';
import FooterDefault from './FooterDefault';
import BackgroundImage from './BackgroundImage';
import HeaderNotAuthenticate from './HeaderNotAuthenticate';

function DefaultLayout() {
    // const { isAuthenticated } = useSelector((state) => state.auth);
    const [isOpenNotification, setIsOpenNotification] = useState(false);

    return (
        <BackgroundImage>
            <div className="w-full min-h-screen flex-block flex-col justify-between">
                <HeaderNotAuthenticate
                    isOpenNotification={isOpenNotification}
                    setIsOpenNotification={setIsOpenNotification}
                />
                <section
                    className={`min-h-80vh flex justify-center items-center ${
                        isOpenNotification ? 'pointer-events-none' : ''
                    }`}
                >
                    <Outlet className="py-6" />
                </section>
                <FooterDefault />
            </div>
        </BackgroundImage>
    );
}

export default DefaultLayout;
