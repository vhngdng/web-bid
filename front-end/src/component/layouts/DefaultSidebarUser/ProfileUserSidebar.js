/* eslint-disable no-extra-boolean-cast */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

function ProfileUserSidebar() {
    const { auth, avatar } = useSelector((state) => state.auth);
    const [email, setEmail] = useState('');
    const [avatarLogin, setAvatarLogin] = useState('');
    useEffect(() => {
        setEmail(auth.email);
        setAvatarLogin(avatar);
    }, []);
    return (
        <div>
            <div className="flex items-center justify-center mx-auto mt-10">
                <img
                    className="h-32 w-32 rounded-full"
                    src={
                        !!avatarLogin
                            ? avatarLogin
                            : 'https://sbcf.fr/wp-content/uploads/2018/03/sbcf-default-avatar.png'
                    }
                />
            </div>
            <div className="flex items-center justify-center mx-auto font-sans mb-6">
                {email}
            </div>
        </div>
    );
}

export default ProfileUserSidebar;
