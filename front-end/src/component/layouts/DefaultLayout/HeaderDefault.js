/* eslint-disable no-extra-boolean-cast */
import React, { useContext, useEffect, useRef, useState } from 'react';
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
import { ToastContainer, toast } from 'react-toastify';
import { DOMAIN_URL } from '~/CONST/const';
import formatDateTime from '~/utils/formatDateTime';
import { NumericFormat } from 'react-number-format';
import { useGetNotificationQuery } from '~/app/service/user.service';
import { NotificationContext } from '~/context/NotificationProvider';
const cx = classNames.bind(styles);
var stompClient = null;

function HeaderDefault({ isOpenNotification, setIsOpenNotification }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { data, isLoading, isSuccess, refetch } = useGetNotificationQuery();
    const [Sock, setSock] = useState(null);
    const [noti, setNoti] = useState(new Map());
    const [message, setMessage] = useState();
    // eslint-disable-next-line no-unused-vars
    const { auth, avatar } = useSelector((state) => state.auth);
    // eslint-disable-next-line no-unused-vars
    const { setNewNoti } = useContext(NotificationContext);
    const refNoti = useRef(null);

    useEffect(() => {
        if (isSuccess) {
            const newNoti = new Map();
            !!data.paymentNotifications.length
                ? newNoti.set('PAYMENT', [...data.paymentNotifications])
                : newNoti.set('PAYMENT', []);
            !!data.propertyNotifications.length
                ? newNoti.set('PROPERTY', [...data.propertyNotifications])
                : newNoti.set('PROPERTY', []);
            setNoti(newNoti);
        }
    }, [data]);

    useEffect(() => {
        console.log('noti effect', noti);
        if (!!message) {
            setNewNoti(message);
            switch (message.notification) {
                case 'PROPERTY': {
                    handlePropertyNoti();
                    break;
                }
                case 'PAYMENT':
                    handlePaymentNoti();
                    break;
                case 'BID':
                    break;
            }
        }
    }, [message]);
    useEffect(() => {
        const handleSock = () => {
            let newSock = new SockJS(
                DOMAIN_URL + 'api/v1/ws',
                undefined,
                // eslint-disable-next-line no-undef
                {
                    transports: ['xhr-polling', 'xdr-polling', 'jsonp-polling'],
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
    const handlePropertyNoti = () => {
        console.log('handlePrivate', noti);
        if (['ACCEPTED', 'REFUSED'].includes(message.permission)) {
            if (!noti.get(message.notification).length) {
                const newNoti = new Map(noti);
                newNoti.set(message.notification, message);
                setNoti(newNoti);
            } else if (
                !noti
                    .get(message.notification)
                    .some((property) => property.id === message.id)
            ) {
                const newNoti = new Map(noti);
                newNoti.get(message.notification).push(message);
                setNoti(new Map(newNoti));
            } else {
                const newNoti = new Map(noti);
                const updatedNoti = newNoti
                    .get(message.notification)
                    .map((noti) => {
                        if (noti.id === message.id) {
                            return { ...noti, permission: message.permission };
                        }
                        return noti;
                    });
                newNoti.set(message.notification, updatedNoti);
                setNoti(new Map(newNoti));
            }
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
        }
    };
    const handlePaymentNoti = () => {
        switch (message.status) {
            case 'PENDING': {
                if (
                    !noti
                        .get(message.notification)
                        .some((element) => element.bidId === message.bidId)
                ) {
                    const newNoti = new Map(noti);
                    newNoti.get(message.notification).push(message);
                    setNoti(new Map(newNoti));
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
                }
                break;
            }
            case 'FINISH': {
                console.log('message bid ID', message.bidId);
                const newNoti = new Map(noti);
                const updatedNoti = newNoti
                    .get(message.notification)
                    .map((notifi) => {
                        if (notifi.bidId === message.bidId) {
                            console.log('notifi bid id', notifi);
                            return { ...notifi, status: message.status };
                        }
                        return notifi;
                    });
                newNoti.set(message.notification, updatedNoti);
                setNoti(new Map(newNoti));
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

                break;
            }
            case 'SUCCESS': {
                console.log('payload Data', message);
                const newNoti = new Map(noti);
                const newNotiv2 = newNoti
                    .get(message.notification)
                    .filter((notify) => notify.bidId !== message.bidId);
                newNoti.set(message.notification, newNotiv2);
                setNoti(newNoti);
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
    const onPrivateMessage = (payload) => {
        let payloadData = JSON.parse(payload.body);
        setMessage(payloadData);
    };

    const handleLogout = () => {
        dispatch(logout());
        window.location.reload(true);
    };

    const handleNavigateToPaymentDetail = (id) => {
        navigate(`/profile-detail/Payment/bidId/${id}`);
    };
    if (isLoading) return <Loader />;
    console.log('noti data', data);
    return (
        <div className="flex items-center relative mr-6 inline-flex w-full">
            <div
                ref={refNoti}
                className="cursor-pointer relative m-2 p-2 text-gray-400 rounded-lg hover:text-gray-600 focus:outline-none focus:ring focus:ring-white focus:ring-offset-gray-100 focus:ring-offset-4"
                onClick={() => setIsOpenNotification((prev) => !prev)}
            >
                <div className="w-5 h-full">
                    <img
                        className="object-cover w-full fill-blue-500"
                        src={notification.logo.default}
                        alt="notification"
                    />
                </div>
                {!!noti &&
                    !!noti.get('PAYMENT') &&
                    !!noti.get('PROPERTY') &&
                    noti.get('PAYMENT').length + noti.get('PROPERTY').length >
                        0 &&
                    !isOpenNotification && (
                        <div className="flex justify-center items-center absolute top-0 right-0 bottom-auto left-auto z-10 inline-block w-6 h-6 shrink-0 grow-0 bg-red-500 rounded-full">
                            {noti.get('PAYMENT').length +
                                noti.get('PROPERTY').length}
                        </div>
                    )}
                {isOpenNotification && (
                    <div
                        className={cx(
                            'noti-table absolute z-50 absolute right-1/2 top-1/2 max-h-30vh overflow-y-auto',
                        )}
                    >
                        <div
                            id="toast-message-cta"
                            className='w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow dark:bg-gray-800 dark:text-gray-400" role="alert"'
                        >
                            {!!noti &&
                            noti.get('PAYMENT').length +
                                noti.get('PROPERTY').length >
                                0 ? (
                                <>
                                    {!!noti.get('PAYMENT') &&
                                        noti.get('PAYMENT').map((n, index) => (
                                            <div
                                                className="flex cursor-pointer gap-1.5 transition-all hover:bg-gray-200 hover:bg-none xl:gap-2"
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
                                                        className={`flex justify-center mb-2 text-sm font-normal space-x-2`}
                                                    >
                                                        <span>Status: </span>
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
                                                        <div className="mb-2 text-sm font-normal italic hover:not-italic space-x-2">
                                                            <p className="text-center mb-2 text-sm font-normal italic hover:not-italic">
                                                                Time:
                                                            </p>
                                                            <p className="mb-2 text-sm font-normal italic hover:not-italic">
                                                                {n.lastModifiedDate !==
                                                                    null &&
                                                                    formatDateTime(
                                                                        n.lastModifiedDate,
                                                                    ).date}
                                                            </p>
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
                                        ))}
                                    {!!noti.get('PROPERTY') &&
                                        noti
                                            .get('PROPERTY')
                                            .map((property, index) => (
                                                <div
                                                    className="flex cursor-pointer gap-1.5 transition-all hover:bg-gray-200 hover:bg-none xl:gap-2"
                                                    key={index}
                                                >
                                                    <div
                                                        onClick={() =>
                                                            navigate(
                                                                `/profile-detail/propertyDetails/${property.id}`,
                                                            )
                                                        }
                                                        className="ml-3 text-sm font-normal max-w-xs flex-1"
                                                    >
                                                        <div className="flex justify-center mb-2 text-sm font-normal">
                                                            Property id :{' '}
                                                            {property.id}
                                                        </div>
                                                        <div className="mb-2 text-sm font-normal">
                                                            <span className="mb-2 text-sm font-normal text-center">
                                                                {property.name}
                                                            </span>
                                                        </div>
                                                        <div className="mb-2 text-sm italic hover:not-italic">
                                                            <span className="mb-2 text-sm text-gray-600 italic hover:not-italic text-center">
                                                                (
                                                                {
                                                                    property.category
                                                                }
                                                                )
                                                            </span>
                                                        </div>
                                                        <div className="flex justify-center items-center mb-2 text-sm font-normal space-x-4">
                                                            <span>
                                                                Permission:
                                                            </span>
                                                            <span
                                                                className={
                                                                    property.permission ===
                                                                    'ACCEPTED'
                                                                        ? 'text-green-500'
                                                                        : property.permission ===
                                                                          'REFUSED'
                                                                        ? 'text-red-500'
                                                                        : 'text-orange-700'
                                                                }
                                                            >
                                                                {
                                                                    property.permission
                                                                }
                                                            </span>
                                                        </div>
                                                        {property.permission ===
                                                            'REFUSED' && (
                                                            <div className="mb-2 text-sm font-normal italic hover:not-italic flex space-x-4">
                                                                <span className="mb-2 text-sm font-normal italic hover:not-italic">
                                                                    Bid Price:
                                                                </span>
                                                                <NumericFormat
                                                                    className=" text-center title-font font-medium text-red-rgb hover:text-red-rgb hover:scale-125"
                                                                    value={
                                                                        property.auctioneerPrice
                                                                    }
                                                                    displayType={
                                                                        'text'
                                                                    }
                                                                    thousandSeparator={
                                                                        true
                                                                    }
                                                                    allowLeadingZeros
                                                                    prefix={'$'}
                                                                />
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
                                            ))}
                                </>
                            ) : (
                                <div className="inline-flex px-2.5 py-1.5 text-xs font-medium text-center text-blue bg-gray-300 ">
                                    You dont have any notification
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
            <div>
                <div
                    onClick={() => navigate('/profile-detail')}
                    className="cursor-pointer truncate block w-24"
                >
                    {auth.email}
                </div>
            </div>
            <div className="relative cursor-pointer group inline-block px-4">
                <div className="w-8 h-full">
                    <img
                        className="object-cover w-full rounded-full"
                        src={
                            avatar
                                ? avatar
                                : 'https://sbcf.fr/wp-content/uploads/2018/03/sbcf-default-avatar.png'
                        }
                    />
                </div>

                <ul className="absolute right-0 hidden w-36 text-gray-700 pt-1 bg-gray-200 group-hover:block group-hover:z-50 rounded-lg shadow-[0_50px_25px_-24px_rgb(0,0,0,0.3)]">
                    {auth.authorities.some(
                        (autho) => autho.authority === 'ROLE_ADMIN',
                    ) && (
                        <li>
                            <div
                                onClick={() => navigate('/admin')}
                                className="rounded-t text-red-rgb py-2 px-4 block whitespace-no-wrap transform hover:translate-x-2 transition-transform ease-in hover:bg-transparent hover:text-red-500"
                            >
                                Admin Page
                            </div>
                        </li>
                    )}
                    <li>
                        <div
                            onClick={() => navigate('profile-detail')}
                            className="rounded-t text-red-rgb py-2 px-4 block whitespace-no-wrap transform hover:translate-x-2 transition-transform ease-in hover:bg-transparent hover:text-red-500"
                        >
                            Profile
                        </div>
                    </li>
                    <li>
                        <div
                            onClick={() => navigate('/bid-room')}
                            className="rounded-t text-red-rgb py-2 px-4 block whitespace-no-wrap transform hover:translate-x-2 transition-transform ease-in hover:bg-transparent hover:text-red-500"
                        >
                            Join room
                        </div>
                    </li>

                    <li>
                        <div
                            onClick={() => handleLogout()}
                            className="rounded-t text-red-rgb py-2 px-4 block whitespace-no-wrap transform hover:translate-x-2 transition-transform ease-in hover:bg-transparent hover:text-red-500"
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
            <ToastContainer />
        </div>
    );
}

export default HeaderDefault;
