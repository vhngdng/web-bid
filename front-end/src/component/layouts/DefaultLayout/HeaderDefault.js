/* eslint-disable no-unused-vars */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import styles from './modules/HeaderDefault.module.scss';
import classNames from 'classnames/bind';
import { logout } from '~/app/slice/auth.slice';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { notification } from '~/assets/images';
import SockJS from 'sockjs-client';
import { over } from 'stompjs';
import { useGetAllPaymentBidFinishQuery } from '~/app/service/Payment.service';
import Loader from '~/Loader';
import { toast, ToastContainer } from 'react-toastify';
import NotificationTimer from '~/notificationTimer';
import { DOMAIN_URL } from '~/CONST/const';
const cx = classNames.bind(styles);

var stompClient = null;
function HeaderDefault() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {
        data: payments,
        isLoading,
        isSuccess,
        refetch,
    } = useGetAllPaymentBidFinishQuery();
    const [isOpenNotification, setIsOpenNotification] = useState(false);
    const [Sock, setSock] = useState(null);
    const [noti, setNoti] = useState([]);
    const { auth } = useSelector((state) => state.auth);
    const refNoti = useRef(null);
    useEffect(() => {
        const handleSock = () => {
            let newSock = new SockJS(
                DOMAIN_URL + 'api/v1/ws',
                undefined,
                // eslint-disable-next-line no-undef
                {
                    protocols_whitelist: [
                        'xhr-polling',
                        'xdr-polling',
                        'jsonp-polling',
                    ],
                },
            );
            setSock(newSock);
        };
        window.addEventListener('beforeunload', setSock(handleSock));
        return () => {
            window.removeEventListener('beforeunload', setSock(handleSock));
        };
    }, []);
    useEffect(() => {
        if (Sock) {
            stompClient = over(Sock);
            // eslint-disable-next-line no-undef
            stompClient.connect({}, onConnected, onError);
        }
    }, [Sock]);

    useEffect(() => {
        let handler = (e) => {
            if (!refNoti.current.contains(e.target)) {
                setIsOpenNotification(false);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => {
            document.removeEventListener('mousedown', handler);
        };
    }, []);
    useEffect(() => {
        setNoti(payments);
    }, [isSuccess]);
    const onError = (err) => {
        console.log(err);
        navigate('/');
    };
    const onConnected = () => {
        if (stompClient) {
            stompClient.subscribe(
                `/user/${auth.email}/private`,
                onPrivateMessage,
            );
        }
    };

    const onPrivateMessage = (payload) => {
        console.log('receive message');
        let payloadData = JSON.parse(payload.body);
        console.log('payloadData', payloadData);
        switch (payloadData.status) {
            case 'PENDING': {
                if (
                    // eslint-disable-next-line no-extra-boolean-cast
                    noti &&
                    noti.some((element) => {
                        if (element.bidId === payloadData.bidId) return false;
                        return true;
                    })
                ) {
                    setNoti((prev) => [...prev, payloadData]);
                    toast.success('You have new Notification', {
                        position: 'top-center',
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        progress: undefined,
                        theme: 'light',
                    });
                } else if (!noti) {
                    let newNoti = [];
                    newNoti.push(payloadData);
                    setNoti(newNoti);
                    toast.success('You have new Notification', {
                        position: 'bottom-right',
                        autoClose: 5000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        progress: undefined,
                        theme: 'light',
                    });
                }
                break;
            }
            case 'FINISH': {
                console.log('payload Data', payloadData);

                console.log(payloadData.bidId);
                setNoti((prev) =>
                    prev.map((notifi) => {
                        if (notifi.bidId === payloadData.bidId) {
                            return { ...notifi, status: payloadData.status };
                        }
                    }),
                );
                toast.success('The payment is completed successfully', {
                    position: 'top-center',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: 'light',
                });

                setTimeout(() => {}, 1000);

                break;
            }
            case 'SUCCESS': {
                console.log('payload Data', payloadData);
                setNoti((prev) => {
                    let newNoti = prev.filter(
                        (notify) => notify.bidId !== payloadData.bidId,
                    );
                    setNoti(newNoti);
                });
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
                break;
            }
        }
    };

    const handleLogout = () => {
        dispatch(logout());
    };

    const handleRedirectToProfilePage = () => {
        navigate('/profile-detail');
    };

    const handleNavigateToPaymentDetail = (id) => {
        navigate(`/profile-detail/Payment/bidId/${id}`);
    };
    if (isLoading) return <Loader />;

    return (
        <nav className=" border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900 ">
            <div className="container flex flex-wrap items-center justify-around mx-auto w-max ">
                <button
                    data-collapse-toggle="navbar-default"
                    type="button"
                    className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                    aria-controls="navbar-default"
                    aria-expanded="false"
                >
                    <span className="sr-only">Open main menu</span>
                </button>
                <div
                    className="hidden w-max md:block md:w-auto"
                    id="navbar-default"
                >
                    <ul className="flex flex-col px-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        <li className="flex justify-between items-center my-6 mr-6 ">
                            <div className="flex justify-center items-center m-6 ">
                                <Link
                                    to="/"
                                    className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white"
                                    aria-current="page"
                                >
                                    Home
                                </Link>
                            </div>
                            <div className="flex justify-center items-center m-6 ">
                                <a
                                    href="#"
                                    className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                                >
                                    About
                                </a>
                            </div>
                            <div className="flex justify-center items-center m-6 ">
                                <a
                                    href="#"
                                    className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                                >
                                    Services
                                </a>
                            </div>
                            {auth.authorities.some(
                                (autho) => autho.authority === 'ROLE_ADMIN',
                            ) && (
                                <div className="flex justify-center items-center m-6 ">
                                    <Link
                                        to="/admin"
                                        className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                                    >
                                        Go To Admin Page
                                    </Link>
                                </div>
                            )}
                        </li>
                        <li className="m-6 ">
                            <div className="flex justify-center items-center relative m-6 inline-flex w-fit">
                                <div
                                    ref={refNoti}
                                    className="cursor-pointer relative m-2 p-2 text-gray-400 rounded-lg hover:text-gray-600 focus:outline-none focus:ring focus:ring-white focus:ring-offset-gray-100 focus:ring-offset-4 active:animate-bounce duration-700 active:opacity-25 transition  ease-linear"
                                    onClick={() =>
                                        setIsOpenNotification((prev) => !prev)
                                    }
                                >
                                    <img
                                        className="object-contain h-5 w-7"
                                        src={notification.logo.default}
                                        alt="notification"
                                    />
                                    {noti &&
                                        noti.length > 0 &&
                                        !isOpenNotification && (
                                            <div className="flex justify-center items-center absolute top-0 right-0 bottom-auto left-auto z-10 inline-block w-6 h-6 shrink-0 grow-0 bg-red-500 rounded-full">
                                                {noti.length}
                                            </div>
                                        )}
                                    {isOpenNotification && (
                                        <div
                                            className={cx(
                                                'noti-table fixed z-100',
                                            )}
                                        >
                                            <div
                                                id="toast-message-cta"
                                                className=' w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow dark:bg-gray-800 dark:text-gray-400" role="alert"'
                                            >
                                                <h2 className="flex justify-center mb-1 text-sm font-semibold text-gray-900 dark:text-white">
                                                    Payment
                                                </h2>
                                                {noti && noti.length > 0 ? (
                                                    noti.map((n, index) => (
                                                        <div
                                                            className="flex cursor-pointer gap-1.5 backdrop-blur-md transition-all hover:bg-gray-200 hover:bg-none xl:gap-2"
                                                            key={index}
                                                        >
                                                            <div
                                                                onClick={() =>
                                                                    handleNavigateToPaymentDetail(
                                                                        n.id,
                                                                    )
                                                                }
                                                                className="ml-3 text-sm font-normal max-w-xs flex-1"
                                                            >
                                                                <div className="flex justify-center mb-2 text-sm font-normal">
                                                                    Bid id :{' '}
                                                                    {n.bidId}
                                                                </div>
                                                                <div
                                                                    className={`flex justify-center mb-2 text-sm font-normal
                                                                    
                                                                    `}
                                                                >
                                                                    Status :
                                                                    {'  '}
                                                                    <span
                                                                        className={
                                                                            n.status ===
                                                                            'FINISH'
                                                                                ? 'text-green-500'
                                                                                : ''
                                                                        }
                                                                    >
                                                                        {
                                                                            n.status
                                                                        }
                                                                    </span>
                                                                </div>
                                                                {n.lastModifiedDate && (
                                                                    <div className="mb-2 text-sm font-normal italic hover:not-italic">
                                                                        <span className="flex justify-center mb-2 text-sm font-normal italic hover:not-italic">
                                                                            Time:
                                                                        </span>
                                                                        <span className="mb-2 text-sm font-normal italic hover:not-italic">
                                                                            {
                                                                                n.lastModifiedDate
                                                                            }
                                                                        </span>
                                                                    </div>
                                                                )}
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
                                                        You dont have any
                                                        request
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className="flex justify-center items-center ">
                                    <div
                                        className="m-2 cursor-pointer box-border w-32 md:hover:bg-transparent md:border-0 md:hover:text-red-700 md:p-0  md:hover:bg-transparent dark:hover:text-white text-ellipsis overflow-hidden"
                                        onClick={handleRedirectToProfilePage}
                                    >
                                        {auth.email}
                                    </div>
                                </div>
                                <button
                                    className="md:hover:text-red-700 m-2 bg-transparent hover:bg-white-500 text-purple-700 font-semibold hover:text-white py-2 px-4 border-1 hover:border-transparent rounded"
                                    onClick={() => handleLogout()}
                                >
                                    Log Out
                                </button>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <ToastContainer />
        </nav>
    );
}

export default HeaderDefault;
