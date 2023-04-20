/* eslint-disable no-extra-boolean-cast */
import React from 'react';
import { useSelector } from 'react-redux';

function ProfileUserSidebar() {
    const { auth, avatar } = useSelector((state) => state.auth);
    console.log('data', auth);
    return (
        <div>
            <div className="flex items-center justify-center mx-auto mt-10">
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
        </div>
    );
}

export default ProfileUserSidebar;
