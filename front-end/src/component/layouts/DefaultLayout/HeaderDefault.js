/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import styles from './modules/HeaderDefault.module.scss';
import classNames from 'classnames/bind';
// import SockJS from 'sockjs-client';
// import { over } from 'stompjs';
// import { notification } from '~/assets/images';
// import { Button } from '@material-tailwind/react';
// import { useSelector } from 'react-redux';
// import { useGetRequestToChangeBidSuccessQuery } from '~/app/service/bid.service';
// import Loader from '~/Loader';
import { logout } from '~/app/slice/auth.slice';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@material-tailwind/react';
const cx = classNames.bind(styles);

// var stompClient = null;
// var Sock = null;
function HeaderDefault() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { auth } = useSelector((state) => state.auth);
    const handleLogout = () => {
        dispatch(logout());
    };

    const handleRedirectToProfilePage = () => {
        navigate('/profile-page');
    };
    return (
        <nav className=" border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900 ">
            <div className="bg-white container flex flex-wrap items-center justify-around mx-auto w-max ">
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
                    <ul className="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        <li className="flex justify-center items-center">
                            <Link
                                to="/"
                                className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white"
                                aria-current="page"
                            >
                                Home
                            </Link>
                        </li>
                        <li className="flex justify-center items-center">
                            <a
                                href="#"
                                className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                            >
                                About
                            </a>
                        </li>
                        <li className="flex justify-center items-center">
                            <a
                                href="#"
                                className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                            >
                                Services
                            </a>
                        </li>
                        <li className="flex justify-center items-center">
                            <a
                                href="#"
                                className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                            >
                                Pricing
                            </a>
                        </li>
                        <li className="flex justify-center items-center">
                            <a
                                href="#"
                                className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                            >
                                Contact
                            </a>
                        </li>
                        <li className="flex justify-center items-center">
                            <div>
                                <button
                                    className=" box-border w-32 md:hover:bg-transparent md:border-0 md:hover:text-red-700 md:p-0  md:hover:bg-transparent dark:hover:text-white text-ellipsis overflow-hidden"
                                    onClick={handleRedirectToProfilePage}
                                >
                                    {auth.email}
                                </button>
                            </div>
                        </li>
                        <li>
                            <button
                                className="md:hover:text-red-700 bg-transparent hover:bg-white-500 text-purple-700 font-semibold hover:text-white py-2 px-4 border border-gray-500 hover:border-transparent rounded"
                                onClick={() => handleLogout()}
                            >
                                Log Out
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default HeaderDefault;
