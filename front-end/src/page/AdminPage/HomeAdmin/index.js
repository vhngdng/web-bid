import React, { useEffect, useRef, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
    useGetRequestToChangeBidSuccessQuery,
    useUpdateSuccessBidMutation,
} from '~/app/service/bid.service';
import NotificationTimer from '~/notificationTimer';
import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import Loader from '~/Loader';
import { toast, ToastContainer } from 'react-toastify';
import { Helmet } from 'react-helmet';
import ProfileUserSidebar from '~/component/layouts/DefaultSidebarUser/ProfileUserSidebar';
import { AnimatePresence, motion } from 'framer-motion';
import { homeSidebarVariants } from '~/animation';
import { useCallback } from 'react';
const cx = classNames.bind(styles);

const customSelectStyle = 'bg-blue-200 text-lime-900 shadow-inner scale-y-90';
function AdminHomePage() {
    const { data, isLoading, refetch } = useGetRequestToChangeBidSuccessQuery();
    const [updateSuccessBid] = useUpdateSuccessBidMutation();
    const [showSidebar, setShowSideBar] = useState(false);
    const refNoti = useRef(null);
    const buttonRef = useRef(null);

    const [selectSidebar, setSelectSidebar] = useState(1);
    const navigate = useNavigate();
    const location = useLocation();
    const [scrollPosition, setScrollPosition] = useState(0);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [scrollPosition]);

    const handleScroll = useCallback(() => {
        const position = window.pageYOffset;
        setScrollPosition(position);
    }, []);
    useEffect(() => {
        console.log(location.pathname);
        if (location.pathname.includes('create-bid')) {
            setSelectSidebar(3);
        } else if (location.pathname.includes('open-bid')) {
            setSelectSidebar(4);
        } else if (location.pathname.includes('properties')) {
            setSelectSidebar(5);
        } else {
            setSelectSidebar(1);
        }
    }, [location]);
    useEffect(() => {
        let handler = (e) => {
            if (
                !buttonRef.current.contains(e.target) &&
                !refNoti.current.contains(e.target)
            ) {
                setShowSideBar(false);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => {
            document.removeEventListener('mousedown', handler);
        };
    }, []);
    if (isLoading) return <Loader />;

    const handleAccept = async (id) => {
        await updateSuccessBid(id)
            .unwrap()
            .then(() => {
                toast.success(<NotificationTimer timer={Date.now()} />, {
                    position: 'top-center',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: undefined,
                });
                setTimeout(() => {
                    refetch();
                }, 1000);
            })
            .catch((err) => toast.error(err));
    };

    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Auction Admin</title>
                <meta name="description" content="Admin" />
            </Helmet>
            <div>
                <div className="flex flex-row w-full">
                    <AnimatePresence>
                        <motion.div
                            className={`fixed bottom-0 left-0 `}
                            animate={
                                scrollPosition >= 120 ? 'open' : 'collapsed'
                            }
                            variants={homeSidebarVariants}
                            transition={{
                                ease: 'easeInOut',
                                duration: 1,
                            }}
                        >
                            <div className="h-full overflow-y-auto overflow-x-hidden bg-gray-500/25 dark:bg-gray-800 w-56 rounded-tr-3xl">
                                <ProfileUserSidebar />

                                <ul className="text-gray-600">
                                    <li className="relative">
                                        <button
                                            className={`flex flex-col  items-center w-full transition duration-500 ease-in-out ml-0 py-2 text-base font-normal hover:text-black dark:text-white dark:hover:bg-gray-700 
                                        transform hover:translate-x-2 transition-transform ease-in hover:bg-transparent
                                        ${
                                            selectSidebar === 1
                                                ? customSelectStyle
                                                : 'bg-transparent'
                                        }`}
                                            onClick={() => navigate('')}
                                        >
                                            List Bid Room
                                        </button>
                                    </li>
                                    <li className="relative">
                                        <button
                                            className={`flex flex-col items-center w-full transition duration-500 ease-in-out ml-0 py-2 text-base font-normal hover:text-black dark:text-white dark:hover:bg-gray-700 transition duration-150 ease-in-out
                                       transform hover:translate-x-2 transition-transform ease-in hover:bg-transparent 
                                       ${
                                           selectSidebar === 3
                                               ? customSelectStyle
                                               : 'bg-transparent'
                                       }`}
                                            onClick={() =>
                                                navigate('create-bid')
                                            }
                                        >
                                            Create Bid Room
                                        </button>
                                    </li>
                                    <li className="relative">
                                        <button
                                            className={`flex flex-col items-center w-full transition duration-500 ease-in-out ml-0 py-2 text-base font-normal hover:text-black dark:text-white dark:hover:bg-gray-700 transition duration-150 ease-in-out
                                        transform hover:translate-x-2 transition-transform ease-in hover:bg-transparent
                                        ${
                                            selectSidebar === 4
                                                ? customSelectStyle
                                                : 'bg-transparent'
                                        }`}
                                            onClick={() => navigate('open-bid')}
                                        >
                                            Open Bid Room
                                        </button>
                                    </li>
                                    <li className="relative">
                                        <button
                                            className={`flex flex-col items-center w-full transition duration-500 ease-in-out ml-0 py-2 text-base font-normal hover:text-black dark:text-white dark:hover:bg-gray-700 transition duration-150 ease-in-out
                                       transform hover:translate-x-2 transition-transform ease-in hover:bg-transparent 
                                       ${
                                           selectSidebar === 5
                                               ? customSelectStyle
                                               : 'bg-transparent'
                                       }`}
                                            onClick={() =>
                                                navigate('properties')
                                            }
                                        >
                                            Properties
                                        </button>
                                    </li>
                                    <li className="relative">
                                        <button
                                            className={`flex flex-col items-center w-full transition duration-500 ease-in-out ml-0 py-2 text-base font-normal hover:text-black dark:text-white dark:hover:bg-gray-700 transition duration-150 ease-in-out
                                        transform hover:translate-x-2 transition-transform ease-in hover:bg-transparent bg-transparent
                                        ${showSidebar ? 'text-red-300' : ''}
                                        `}
                                            onClick={() =>
                                                setShowSideBar((prev) => !prev)
                                            }
                                            ref={buttonRef}
                                        >
                                            Bid Success
                                        </button>
                                        {data &&
                                            data.length > 0 &&
                                            !showSidebar && (
                                                <div className="flex justify-center items-center absolute top-0 right-0 bottom-auto left-auto z-10 inline-block w-6 h-6 shrink-0 grow-0 bg-red-500 rounded-full">
                                                    {data.length}
                                                </div>
                                            )}
                                    </li>
                                </ul>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                    <section className=" mr-5 flex flex-col text-start ">
                        <Outlet />
                    </section>
                    <div
                        className={`fixed bottom-0 right-0 w-[16vw] bg-[rgb(189, 211, 213)] shadow-lg p-10 text-white fixed h-full z-40  ease-in-out duration-300 ${
                            showSidebar
                                ? 'translate-x-0 '
                                : 'translate-x-full hidden'
                        }`}
                        ref={refNoti}
                    >
                        <h3 className="mt-20 text-4xl font-semibold text-graay-200">
                            Finish
                        </h3>
                        {showSidebar && (
                            <div className={cx('noti-table')}>
                                <div
                                    id="toast-message-cta"
                                    className={cx(
                                        ' w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow dark:bg-gray-800 dark:text-gray-400" role="alert"',
                                    )}
                                >
                                    {data && data.length > 0 ? (
                                        data.map((noti, index) => (
                                            <div className="flex" key={index}>
                                                <div className="ml-3 text-sm font-normal">
                                                    <span className="mb-1 text-sm font-semibold text-gray-900 dark:text-white">
                                                        Bid Id: {noti.id}
                                                    </span>
                                                    <div className="mb-2 text-sm font-normal">
                                                        Day of Sale:{' '}
                                                        {noti.dayOfSale}
                                                    </div>
                                                    <button
                                                        onClick={() =>
                                                            handleAccept(
                                                                noti.id,
                                                            )
                                                        }
                                                        className="inline-flex px-2.5 py-1.5 text-xs font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800"
                                                    >
                                                        Accept
                                                    </button>
                                                </div>
                                                <button
                                                    type="button"
                                                    className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
                                                    data-dismiss-target="#toast-message-cta"
                                                    aria-label="Close"
                                                >
                                                    <span className="sr-only">
                                                        Close
                                                    </span>
                                                    <svg
                                                        aria-hidden="true"
                                                        className="w-5 h-5"
                                                        fill="currentColor"
                                                        viewBox="0 0 20 20"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                            clipRule="evenodd"
                                                        ></path>
                                                    </svg>
                                                </button>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="inline-flex px-2.5 py-1.5 text-xs font-medium text-center text-blue bg-gray-300 ">
                                            You dont have any request
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <ToastContainer pauseOnHover={false} />
        </>
    );
}

export default AdminHomePage;
