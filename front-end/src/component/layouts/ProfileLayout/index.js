import React from 'react';
import { Outlet } from 'react-router-dom';
// import ProfilePage from '~/page/ProfilePage';
// import SideBarDefault from './SideBarDefault';

function ProfileLayout() {
    return (
        <>
            {/* <ProfilePage /> */}
            <section>
                <Outlet />
            </section>
        </>
    );
}

export default ProfileLayout;
