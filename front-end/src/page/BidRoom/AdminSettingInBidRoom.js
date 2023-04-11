/* eslint-disable no-extra-boolean-cast */
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { useUpdateStatusBidMutation } from '~/app/service/bid.service';
import { arrowIcon } from '~/assets/images';
import NotificationTimer from '~/notificationTimer';

function AdminSettingInBidRoom({ isOpen, auctioneer, sendFinishBidMessage }) {
    const { id } = useParams();
    const [updateStatusBid] = useUpdateStatusBidMutation();
    const [isRotate, setIsRotate] = useState(false);
    const [isAdminRotate, setIsAdminRotate] = useState(false);
    const navigate = useNavigate();

    const handleCloseBid = () => {
        updateStatusBid({
            id,
            status: 'DEACTIVE',
            dayOfSale: new Date(),
        })
            .unwrap()
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
    };
    const handleChangeStatus = (newStatus) => {
        toast.success(
            <NotificationTimer
                timer={Date.now()}
                message={`Bid will be change to ${newStatus}`}
            />,
            {
                position: 'top-center',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: undefined,
            },
        );
        setTimeout(() => {
            console.log(newStatus);
            updateStatusBid({
                id,
                status: newStatus,
            })
                .unwrap()
                .then((res) => console.log(res))
                .catch((err) => console.log(err));
        }, 5500);
    };
    return (
        <aside
            className={`fixed top-0 right-0 z-40 min-w-fit w-[13vw] ml-6 h-full roundedL bg-gray-900/50 flex-col justify-between py-6 items-center
            ${isOpen ? '' : 'hidden'}
            `}
        >
            <div className="flex justify-center items-center w-full space-x-3 my-6 border-gray-600 border-b space-y-3 pb-5">
                <svg
                    width="34"
                    height="34"
                    viewBox="0 0 34 34"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M1 17H0H1ZM7 17H6H7ZM17 27V28V27ZM27 17H28H27ZM17 0C12.4913 0 8.1673 1.79107 4.97918 4.97918L6.3934 6.3934C9.20644 3.58035 13.0218 2 17 2V0ZM4.97918 4.97918C1.79107 8.1673 0 12.4913 0 17H2C2 13.0218 3.58035 9.20644 6.3934 6.3934L4.97918 4.97918ZM0 17C0 21.5087 1.79107 25.8327 4.97918 29.0208L6.3934 27.6066C3.58035 24.7936 2 20.9782 2 17H0ZM4.97918 29.0208C8.1673 32.2089 12.4913 34 17 34V32C13.0218 32 9.20644 30.4196 6.3934 27.6066L4.97918 29.0208ZM17 34C21.5087 34 25.8327 32.2089 29.0208 29.0208L27.6066 27.6066C24.7936 30.4196 20.9782 32 17 32V34ZM29.0208 29.0208C32.2089 25.8327 34 21.5087 34 17H32C32 20.9782 30.4196 24.7936 27.6066 27.6066L29.0208 29.0208ZM34 17C34 12.4913 32.2089 8.1673 29.0208 4.97918L27.6066 6.3934C30.4196 9.20644 32 13.0218 32 17H34ZM29.0208 4.97918C25.8327 1.79107 21.5087 0 17 0V2C20.9782 2 24.7936 3.58035 27.6066 6.3934L29.0208 4.97918ZM17 6C14.0826 6 11.2847 7.15893 9.22183 9.22183L10.636 10.636C12.3239 8.94821 14.6131 8 17 8V6ZM9.22183 9.22183C7.15893 11.2847 6 14.0826 6 17H8C8 14.6131 8.94821 12.3239 10.636 10.636L9.22183 9.22183ZM6 17C6 19.9174 7.15893 22.7153 9.22183 24.7782L10.636 23.364C8.94821 21.6761 8 19.3869 8 17H6ZM9.22183 24.7782C11.2847 26.8411 14.0826 28 17 28V26C14.6131 26 12.3239 25.0518 10.636 23.364L9.22183 24.7782ZM17 28C19.9174 28 22.7153 26.8411 24.7782 24.7782L23.364 23.364C21.6761 25.0518 19.3869 26 17 26V28ZM24.7782 24.7782C26.8411 22.7153 28 19.9174 28 17H26C26 19.3869 25.0518 21.6761 23.364 23.364L24.7782 24.7782ZM28 17C28 14.0826 26.8411 11.2847 24.7782 9.22183L23.364 10.636C25.0518 12.3239 26 14.6131 26 17H28ZM24.7782 9.22183C22.7153 7.15893 19.9174 6 17 6V8C19.3869 8 21.6761 8.94821 23.364 10.636L24.7782 9.22183ZM10.3753 8.21913C6.86634 11.0263 4.86605 14.4281 4.50411 18.4095C4.14549 22.3543 5.40799 26.7295 8.13176 31.4961L9.86824 30.5039C7.25868 25.9371 6.18785 21.9791 6.49589 18.5905C6.80061 15.2386 8.46699 12.307 11.6247 9.78087L10.3753 8.21913ZM23.6247 25.7809C27.1294 22.9771 29.1332 19.6127 29.4958 15.6632C29.8549 11.7516 28.5904 7.41119 25.8682 2.64741L24.1318 3.63969C26.7429 8.20923 27.8117 12.1304 27.5042 15.4803C27.2001 18.7924 25.5372 21.6896 22.3753 24.2191L23.6247 25.7809Z"
                        fill="white"
                    />
                </svg>
                <p className="text-center text-2xl leading-6 text-white">
                    Setting
                </p>
            </div>
            <div className="flex flex-col justify-start items-center  px-6 border-b border-dashed border-gray-600 my-6 ">
                <div
                    className={`flex justify-between h-6 w-full ${
                        isRotate ? 'border-gray-600 border-b' : ''
                    } `}
                >
                    <div className="text-sm leading-5  uppercase">
                        Bid Action
                    </div>
                    <div className="flex justify-center items-center">
                        <img
                            className={`w-6 h-6 ${
                                isRotate ? 'rotate-180' : ''
                            }`}
                            src={arrowIcon.logo.default}
                            onClick={() => setIsRotate((prev) => !prev)}
                        />
                    </div>
                </div>
                {isRotate && (
                    <>
                        <div className="flex justify-center items-center  px-3 py-4 ">
                            <button
                                onClick={() => handleChangeStatus('PROCESSING')}
                                className="download-button transform active:scale-95 bg-blue-500 hover:bg-blue-400 text-white px-8 py-3 rounded-lg font-bold tracking-widest w-auto"
                            >
                                <div className="pl-2 leading-none uppercase">
                                    Run
                                </div>
                            </button>
                        </div>
                        <div className="flex justify-center items-center  px-3 py-4 ">
                            <button
                                onClick={() => sendFinishBidMessage()}
                                className="download-button transform active:scale-95 bg-blue-500 hover:bg-blue-400 text-white px-8 py-3 rounded-lg font-bold tracking-widest w-auto"
                            >
                                <div className="pl-2 leading-none uppercase">
                                    Finish
                                </div>
                            </button>
                        </div>
                        <div className="flex justify-center items-center  px-3 py-4 ">
                            <button
                                onClick={() => handleCloseBid()}
                                className="download-button transform active:scale-95 bg-blue-500 hover:bg-blue-400 text-white px-8 py-3 rounded-lg font-bold tracking-widest w-auto"
                            >
                                <div className="pl-2 leading-none uppercase">
                                    Close
                                </div>
                            </button>
                        </div>
                    </>
                )}
            </div>
            <div className="flex flex-col justify-start items-center  px-6 border-b border-dashed border-gray-600 my-6 ">
                <div
                    className={`flex justify-between h-6 w-full ${
                        isAdminRotate ? 'border-gray-600 border-b' : ''
                    } `}
                >
                    <div className="text-sm leading-5  uppercase">
                        Admin Action
                    </div>
                    <div className="flex justify-center items-center">
                        <img
                            className={`w-6 h-6 ${
                                isAdminRotate ? 'rotate-180' : ''
                            }`}
                            src={arrowIcon.logo.default}
                            onClick={() => setIsAdminRotate((prev) => !prev)}
                        />
                    </div>
                </div>
                {isAdminRotate && (
                    <>
                        <div className="flex justify-center items-center  px-3 py-4 ">
                            <button
                                onClick={() => navigate('/admin')}
                                className="download-button transform active:scale-95 bg-blue-500 hover:bg-blue-400 text-white px-8 py-3 rounded-lg font-bold tracking-widest w-auto"
                            >
                                <div className="pl-2 leading-none uppercase">
                                    Admin Page
                                </div>
                            </button>
                        </div>
                        <div className="flex justify-center items-center  px-3 py-4 ">
                            <button
                                onClick={() => navigate('/admin/open-bid')}
                                className="download-button transform active:scale-95 bg-blue-500 hover:bg-blue-400 text-white px-8 py-3 rounded-lg font-bold tracking-widest w-auto"
                            >
                                <div className="pl-2 leading-none uppercase">
                                    Open Bid Room
                                </div>
                            </button>
                        </div>
                    </>
                )}
            </div>

            <div className="absolute bottom-0 flex justify-between items-center w-full">
                <div className="flex justify-center items-center  space-x-2">
                    <div className="flex justify-center items-center">
                        <img
                            className="mx-auto mb-4 w-10 h-10 rounded-full"
                            src={
                                auctioneer.avatar
                                    ? auctioneer.avatar
                                    : 'https://sbcf.fr/wp-content/uploads/2018/03/sbcf-default-avatar.png'
                            }
                            alt="Avatar"
                        />
                    </div>
                    <div className="flex justify-start flex-col items-start">
                        <p className=" cursor-pointer text-sm leading-5 text-white">
                            {auctioneer.username}
                        </p>
                        <p className="cursor-pointer text-xs leading-3 text-gray-300 truncate">
                            {auctioneer.email}
                        </p>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </aside>
    );
}

export default AdminSettingInBidRoom;
