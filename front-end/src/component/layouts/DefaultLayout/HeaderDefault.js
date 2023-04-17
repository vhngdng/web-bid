import React, { useEffect, useRef, useState } from 'react';
import styles from './modules/HeaderDefault.module.scss';
import classNames from 'classnames/bind';
import Loader from '~/Loader';
import SockJS from 'sockjs-client';
import NotificationTimer from '~/notificationTimer';
import logOutIMG from '~/assets/images/logOut.webp';

import { logout } from '~/app/slice/auth.slice';
import { useDispatch, useSelector } from 'react-redux';
// eslint-disable-next-line no-unused-vars
import { Link, useNavigate } from 'react-router-dom';
import { notification } from '~/assets';
import { over } from 'stompjs';
import { useGetAllPaymentBidFinishQuery } from '~/app/service/payment.service';
import { toast } from 'react-toastify';
import { DOMAIN_URL } from '~/CONST/const';
import { RotatingText } from 'rotating-text';
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
    // eslint-disable-next-line no-unused-vars
    const [isMouse, setIsMouse] = useState(false);
    const { auth, avatar } = useSelector((state) => state.auth);
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
        window.location.reload(true);
    };

    const handleNavigateToPaymentDetail = (id) => {
        navigate(`/profile-detail/Payment/bidId/${id}`);
    };
    if (isLoading) return <Loader />;

    return (
        <nav className="flex justify-end border-gray-200 py-2.5 rounded dark:bg-gray-900  border shadow-lg">
            <div className="w-full flex justify-center items-center border border-gray-100 rounded-lg md:mt-0 md:text-sm md:font-medium md:border-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                <div
                    onClick={() => navigate('/')}
                    className="flex justify-end w-2/3 cursor-pointer block py-2 pl-3 pr-4 text-white rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white"
                >
                    <h1 className="text-gray-800 w-96">
                        <RotatingText
                            text="Auctionforfun"
                            stagger={0.1}
                            timing={0.3}
                            className="rotating-text"
                            styles={{ fontSize: '16px' }}
                        />
                    </h1>
                </div>
                <div className="flex justify-end items-center relative m-6 inline-flex w-1/3">
                    <div
                        ref={refNoti}
                        className="cursor-pointer relative m-2 p-2 text-gray-400 rounded-lg hover:text-gray-600 focus:outline-none focus:ring focus:ring-white focus:ring-offset-gray-100 focus:ring-offset-4 active:animate-bounce duration-700 active:opacity-25 transition  ease-linear"
                        onClick={() => setIsOpenNotification((prev) => !prev)}
                    >
                        <img
                            className="object-contain h-5 w-7"
                            src={notification.logo.default}
                            alt="notification"
                        />
                        {noti && noti.length > 0 && !isOpenNotification && (
                            <div className="flex justify-center items-center absolute top-0 right-0 bottom-auto left-auto z-10 inline-block w-6 h-6 shrink-0 grow-0 bg-red-500 rounded-full">
                                {noti.length}
                            </div>
                        )}
                        {isOpenNotification && (
                            <div
                                className={cx(
                                    'noti-table fixed z-100 absolute right-1/2 top-1/2',
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
                                                        Bid id : {n.bidId}
                                                    </div>
                                                    <div
                                                        className={`flex justify-center mb-2 text-sm font-normal
                                                                    
                                                                    `}
                                                    >
                                                        Status :{'  '}
                                                        <span
                                                            className={
                                                                n.status ===
                                                                'FINISH'
                                                                    ? 'text-green-500'
                                                                    : ''
                                                            }
                                                        >
                                                            {n.status}
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
                                            You dont have any request
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                    <div>
                        <div
                            onClick={() => navigate('/profile-details')}
                            className="cursor-pointer truncate block whitespace-no-wrap"
                        >
                            {auth.email}
                        </div>
                    </div>
                    <div
                        className="relative cursor-pointer group inline-block px-4"
                        onClick={() => setIsMouse((prev) => !prev)}
                    >
                        <img
                            className="object-fill h-12 w-12 rounded-full"
                            src={
                                avatar
                                    ? avatar
                                    : 'https://sbcf.fr/wp-content/uploads/2018/03/sbcf-default-avatar.png'
                            }
                        />

                        <ul className="absolute right-0 hidden w-36 text-gray-700 pt-1 group-hover:block ">
                            {auth.authorities.some(
                                (autho) => autho.authority === 'ROLE_ADMIN',
                            ) && (
                                <li>
                                    <div
                                        onClick={() => navigate('/admin')}
                                        className="rounded-t text-red-rgb bg-gray-200 py-2 px-4 block whitespace-no-wrap transform hover:translate-x-2 transition-transform ease-in hover:bg-transparent hover:text-red-500"
                                    >
                                        Admin Page
                                    </div>
                                </li>
                            )}
                            <li>
                                <div
                                    onClick={() => navigate('profile-detail')}
                                    className="rounded-t text-red-rgb bg-gray-200 py-2 px-4 block whitespace-no-wrap transform hover:translate-x-2 transition-transform ease-in hover:bg-transparent hover:text-red-500"
                                >
                                    Profile
                                </div>
                            </li>
                            <li>
                                <div
                                    onClick={() => navigate('/bid-room')}
                                    className="rounded-t text-red-rgb bg-gray-200 py-2 px-4 block whitespace-no-wrap transform hover:translate-x-2 transition-transform ease-in hover:bg-transparent hover:text-red-500"
                                >
                                    Join room
                                </div>
                            </li>

                            <li>
                                <div
                                    onClick={() => handleLogout()}
                                    className="rounded-t text-red-rgb bg-gray-200 py-2 px-4 block whitespace-no-wrap transform hover:translate-x-2 transition-transform ease-in hover:bg-transparent hover:text-red-500"
                                >
                                    <div className="flex justify-center items-center">
                                        <span>Log out</span>
                                        <img
                                            className="object-fill h-12 w-12"
                                            src={logOutIMG}
                                        />
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            {/* <div
                className={`bg-opacity-20 h-60vh px-0 w-full bg-no-repeat bg-cover bg-center bg-url(${backgroundImage})`}
                style={{ backgroundImage: `url(${backgroundImage})` }}
            /> */}
        </nav>
    );
}

export default HeaderDefault;
