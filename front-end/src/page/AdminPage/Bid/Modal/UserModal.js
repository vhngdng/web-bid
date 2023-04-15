/* eslint-disable no-extra-boolean-cast */
import Modal from 'react-modal';
import React, { useEffect, useState } from 'react';
import { useLazyGetUserByIdQuery } from '~/app/service/user.service';
import Loader from '~/Loader';
import { customStyles } from '~/utils/customModalStyle';
Modal.setAppElement('#root');
function UserModal({ userId, setIsOpen, open, setUserId }) {
    const [fetchGetUserById, { data, isLoading }] = useLazyGetUserByIdQuery();
    // eslint-disable-next-line no-unused-vars
    const [user, setUser] = useState();
    useEffect(() => {
        if (userId) {
            console.log('test');
            fetchGetUserById(userId);
        }
    }, [userId]);
    useEffect(() => {
        if (!!data) {
            console.log('modal', data);
        }
    }, [data]);
    const closeModal = () => {
        setUserId(null);
        setIsOpen(!open);
    };
    if (isLoading) return <Loader />;
    console.log('isOpen', open);
    return (
        <Modal
            isOpen={open}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="User"
        >
            <section className=" bg-[#071e34] h-fit flex font-medium items-center justify-center h-screen">
                <section className="w-64 mx-auto bg-[#20354b] rounded-2xl px-8 py-6 shadowLg">
                    <div className="flex items-center justify-between">
                        <span className="cursor-pointer text-gray-400 text-sm hover:text-blue-500">
                            {!!data && data.email}
                        </span>
                        <span className="text-emerald-400"></span>
                    </div>
                    <div className="mt-6 w-fit mx-auto">
                        <img
                            src={
                                !!data && !!data.avatar
                                    ? data.avatar
                                    : 'https://sbcf.fr/wp-content/uploads/2018/03/sbcf-default-avatar.png'
                            }
                            className="rounded-full object-cover h-28 w-28 "
                            alt="profile picture"
                            srcSet=""
                        />
                    </div>

                    <div className="mt-8 ">
                        <h2 className="text-white font-bold text-2xl tracking-wide">
                            {!!data && data.name}
                        </h2>
                    </div>
                    <p className="text-green-400 mt-2.5">
                        Number of Participating:{' '}
                        {!!data && data.numberOfParticipating}
                    </p>
                    <p className="text-pink-400 mt-2.5">
                        Number of Winning: {!!data && data.numberOfWinning}
                    </p>

                    <div className="h-1 w-full bg-black mt-8 rounded-full">
                        <div className="h-1 rounded-full w-2/5 bg-yellow-500 "></div>
                    </div>
                    <div className="mt-3 text-white text-sm">
                        <span className="text-gray-400">Rate: </span>
                        <span className="text-yellow-400">
                            {!!data &&
                                (data.numberOfWinning /
                                    data.numberOfParticipating) *
                                    100}{' '}
                            %
                        </span>
                    </div>
                </section>
            </section>
        </Modal>
    );
}

export default UserModal;
