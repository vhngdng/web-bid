/* eslint-disable no-unused-vars */
/* eslint-disable no-extra-boolean-cast */
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import HeaderDefault from './HeaderDefault';
import FooterDefault from './FooterDefault';
import BackgroundImage from './BackgroundImage';
import HeaderNotAuthenticate from './HeaderNotAuthenticate';
import NotificationProvider from '~/context/NotificationProvider';

function DefaultLayout() {
    // const { isAuthenticated } = useSelector((state) => state.auth);
    const [isOpenNotification, setIsOpenNotification] = useState(false);

    return (
        <div className="w-full min-h-screen flex-block flex-col justify-between">
            <BackgroundImage>
                <NotificationProvider>
                    <HeaderNotAuthenticate
                        isOpenNotification={isOpenNotification}
                        setIsOpenNotification={setIsOpenNotification}
                    />
                    <section
                        className={`min-h-85vh flex justify-center ${
                            isOpenNotification ? 'pointer-events-none' : ''
                        }`}
                    >
                        <Outlet className="py-6" />
                    </section>
                </NotificationProvider>
                <FooterDefault />
            </BackgroundImage>
        </div>
    );
}

export default DefaultLayout;
