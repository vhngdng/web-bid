import { Button } from '@material-tailwind/react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    useGetRequestToChangeBidSuccessQuery,
    useUpdateSuccessBidMutation,
} from '~/app/service/bid.service';
import NotificationTimer from '~/notificationTimer';
import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import Loader from '~/Loader';
import { notification } from '~/assets/images';
import { toast, ToastContainer } from 'react-toastify';
const cx = classNames.bind(styles);

function AdminHomePage() {
    const { data, isLoading, refetch } = useGetRequestToChangeBidSuccessQuery();
    const [updateSuccessBid] = useUpdateSuccessBidMutation();
    const [isOpenNotification, setIsOpenNotification] = useState(false);
    const handleShowRequest = () => {
        setIsOpenNotification(!isOpenNotification);
    };
    if (isLoading) return <Loader />;
    console.log(data);

    const handleAccept = async (id) => {
        await updateSuccessBid(id)
            .unwrap()
            .then((data) => {
                console.log(data);
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
            <div>
                <button
                    className="w-max relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800"
                    onClick={handleShowRequest}
                >
                    <div className={cx('notify')}>
                        <img
                            src={notification.logo.default}
                            alt="notification"
                        />
                        <div className={cx('noti-number')}>
                            {data && data.length > 0 && !isOpenNotification
                                ? data.length
                                : ''}
                        </div>

                        {isOpenNotification && (
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
                </button>
                <Link to="create-bid">
                    <Button>Create Bid Room</Button>
                </Link>
                <Link to="open-bid">
                    <Button>Open Bid Room</Button>
                </Link>
            </div>
            <ToastContainer />
        </>
    );
}

export default AdminHomePage;
