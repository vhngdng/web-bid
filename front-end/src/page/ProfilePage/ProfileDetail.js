/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from 'react';
import {
    useGetAvatarQuery,
    useGetBackgroundQuery,
    useUploadImageMutation,
} from '~/app/service/image.service';
import { useGetUserByEmailQuery } from '~/app/service/user.service';
import Loader from '~/Loader';
import ImageModal from './ImageModal';

function ProfileDetail() {
    const { data: user, isLoading } = useGetUserByEmailQuery();
    const { data: avatarData, isSuccess: avatarSuccess } = useGetAvatarQuery();
    const { data: backgroundData, isSuccess: backgroundSuccess } =
        useGetBackgroundQuery();

    const ref = useRef(null);
    const [avatar, setAvatar] = useState('');
    // const [uploadImage] = useUploadImageMutation();
    const [backgroundImg, setBackgroundImg] = useState('');
    // const [selectFunctionSetUrl, setSelectFunctionSetUrl] = useState();
    const [isAvatar, setIsAvatar] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    useEffect(() => {
        if (avatarData) {
            setAvatar(avatarData.id);
        }
    }, [avatarSuccess]);
    useEffect(() => {
        if (backgroundData) {
            console.log(backgroundData);
            setBackgroundImg(backgroundData.id);
        }
    }, [backgroundSuccess]);
    if (isLoading) return <Loader />;
    console.log(user);
    const handleChangeBackground = () => {
        setIsAvatar(false);
        setOpenModal(true);
        console.log(isAvatar);
    };
    const handleChangeAvatar = () => {
        setIsAvatar(true);
        setOpenModal(true);
        console.log(isAvatar);
    };
    console.log(avatar);
    console.log(user);
    return (
        <>
            <div
                ref={ref}
                className=" bg-gray-200 dark:bg-gray-900 flex flex-wrap items-center justify-center"
            >
                <div className="container max-w-lg bg-white rounded dark:bg-gray-800 shadow-lg transform duration-200 easy-in-out m-12">
                    <div className="h-2/4 sm:h-64 overflow-hidden">
                        <img
                            className="w-full rounded-t"
                            src={
                                backgroundImg
                                    ? `http://localhost:8080/api/v1/images/read/${backgroundImg}`
                                    : `https://images.unsplash.com/photo-1631631480669-535cc43f2327?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YmFja2dyb3VuZCUyMGltYWdlfGVufDB8fDB8fA%3D%3D&w=1000&q=80`
                            }
                            alt="Photo by aldi sigun on Unsplash"
                            onClick={handleChangeBackground}
                        />
                    </div>
                    <div className="flex justify-start px-5 -mt-12 mb-5">
                        <span className="block relative h-32 w-32">
                            <img
                                alt="Photo by aldi sigun on Unsplash"
                                src={
                                    avatar
                                        ? `http://localhost:8080/api/v1/images/read/${avatar}`
                                        : user.avatar
                                        ? user.avatar
                                        : 'https://sbcf.fr/wp-content/uploads/2018/03/sbcf-default-avatar.png'
                                }
                                className={`mx-auto object-cover rounded-full h-24 w-24 bg-white p-1`}
                                onClick={handleChangeAvatar}
                            />
                        </span>
                    </div>
                    <div className="">
                        <div className="px-7 mb-8">
                            <h2 className="text-3xl font-bold text-green-800 dark:text-gray-300">
                                {user && (user.username || user.email)}
                            </h2>
                            <p className="text-gray-400 mt-2 dark:text-gray-400">
                                Illustrator
                            </p>
                            <p className="mt-2 text-gray-600 dark:text-gray-300">
                                Lorem ipsum dolor sit amet consectetur,
                                adipisicing elit. Asperiores molestiae vitae
                                odio non commodi itaque quisquam incidunt
                                doloribus fugit nesciunt.
                            </p>
                            <div className="justify-center px-4 py-2 cursor-pointer bg-green-900 max-w-min mx-auto mt-8 rounded-lg text-gray-300 hover:bg-green-800 hover:text-gray-100 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-gray-200">
                                {user && user.email}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ImageModal
                appElement={ref.current}
                open={openModal}
                setOpen={setOpenModal}
                setImage={isAvatar ? setAvatar : setBackgroundImg}
                isAvatar={isAvatar}
                selectImage={isAvatar ? avatar : backgroundImg}
            />
        </>
    );
}

export default ProfileDetail;