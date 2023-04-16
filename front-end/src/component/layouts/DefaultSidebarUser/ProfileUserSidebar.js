/* eslint-disable no-extra-boolean-cast */
import React from 'react';
import { useSelector } from 'react-redux';

function ProfileUserSidebar() {
    const { auth, avatar } = useSelector((state) => state.auth);
    console.log('data', auth);
    return (
        <>
            <div className="flex justify-center shadow-md mb-10 border-content">
                <h1 className="text-center px-auto py-4 text-3xl uppercase text-indigo-500">
                    Auction for fun
                </h1>
            </div>
            <div className="flex items-center justify-center mx-auto ">
                <img
                    className="h-32 w-32 rounded-full"
                    src={
                        !!avatar
                            ? avatar
                            : 'https://sbcf.fr/wp-content/uploads/2018/03/sbcf-default-avatar.png'
                    }
                />
            </div>
            <div className="flex items-center justify-center mx-auto font-sans mb-6">
                {auth.email}
            </div>
        </>
    );
}

export default ProfileUserSidebar;
