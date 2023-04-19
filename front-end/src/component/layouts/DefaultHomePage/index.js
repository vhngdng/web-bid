import React from 'react';
import { ProSidebarProvider } from 'react-pro-sidebar';
import { Outlet } from 'react-router-dom';
import HomeSidebar from '~/page/HomePage/homesidebar';

function DefaultHomePage() {
    return (
        <>
            <ProSidebarProvider>
                <HomeSidebar />
            </ProSidebarProvider>
            <section>
                <Outlet />
            </section>
        </>
    );
}

export default DefaultHomePage;
