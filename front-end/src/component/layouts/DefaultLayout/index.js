/* eslint-disable no-unused-vars */
/* eslint-disable no-extra-boolean-cast */
import React, { createContext, useState } from 'react';
import { Outlet } from 'react-router-dom';
import FooterDefault from './FooterDefault';
import BackgroundImage from './BackgroundImage';
import HeaderNotAuthenticate from './HeaderNotAuthenticate';
import NotificationProvider from '~/context/NotificationProvider';

function DefaultLayout() {
    // const { isAuthenticated } = useSelector((state) => state.auth);
    const [isOpenNotification, setIsOpenNotification] = useState(false);
    const [notiContext, setNotiContext] = useState(new Map());
    return (
        <BackgroundImage>
            <div className="w-full min-h-screen flex-block flex-col justify-between">
                <NotificationProvider>
                    <HeaderNotAuthenticate
                        isOpenNotification={isOpenNotification}
                        setIsOpenNotification={setIsOpenNotification}
                    />
                    <section
                        className={`min-h-full flex justify-center items-center ${
                            isOpenNotification ? 'pointer-events-none' : ''
                        }`}
                    >
                        <Outlet className="py-6" />
                    </section>
                </NotificationProvider>
                <FooterDefault />
            </div>
        </BackgroundImage>
    );
}

export default DefaultLayout;
