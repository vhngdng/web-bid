/* eslint-disable no-extra-boolean-cast */
import React from 'react';
import { DOMAIN_URL } from '~/CONST/const';
import Loader from '~/Loader';
import { useGetUserByEmailQuery } from '~/app/service/user.service';

function ProfileUserSidebar() {
    const { data, isLoading } = useGetUserByEmailQuery();
    if (isLoading) return <Loader />;
    console.log(data);
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
                        !!data.avatar
                            ? `${DOMAIN_URL}api/v1/images/read/${data.avatar}`
                            : data.avatar
                            ? data.avatar
                            : 'https://sbcf.fr/wp-content/uploads/2018/03/sbcf-default-avatar.png'
                    }
                />
            </div>
            <div className="flex items-center justify-center mx-auto font-sans mb-6">
                {data.username}
            </div>
        </>
    );
}

export default ProfileUserSidebar;
