import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RotatingText } from 'rotating-text';
import HeaderDefault from './HeaderDefault';
import { useSelector } from 'react-redux';

function HeaderNotAuthenticate() {
    const { isAuthenticated } = useSelector((state) => state.auth);

    const navigate = useNavigate();
    const [search, setSearch] = useState('');

    return (
        <nav className="flex justify-end  py-1 rounded dark:bg-gray-900 shadow-lg">
            <div className="w-full flex justify-center items-center rounded-lg mt-8 md:mt-0 md:text-sm md:font-medium md:border-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                <div
                    onClick={() => navigate('/')}
                    className="flex justify-start w-1/3 cursor-pointer block py-2 pl-3  text-white rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white"
                >
                    <h1 className="text-gray-800 px-8 w-96 ">
                        <RotatingText
                            text="Auctionforfun"
                            stagger={0.1}
                            timing={0.3}
                            className="rotating-text"
                            styles={{ fontSize: '14px' }}
                        />
                    </h1>
                </div>
                <div className="flex justify-center items-center relative m-6 inline-flex w-1/3">
                    <div className="relative flex items-center w-1/2 h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden">
                        <div className="grid place-items-center h-full w-12 text-gray-300">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                        </div>

                        <input
                            className="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
                            type="text"
                            id="search"
                            placeholder="Search something.."
                            defaultValue={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>
                {isAuthenticated ? (
                    <HeaderDefault />
                ) : (
                    <div className="flex justify-end items-center relative m-6 inline-flex w-1/3 space-x-2">
                        <div
                            onClick={() => navigate('/login')}
                            className="rounded-full cursor-pointer truncate block whitespace-no-wrap px-2 py-2 hover:text-green-rgb"
                        >
                            Login
                        </div>

                        <div
                            onClick={() => navigate('/sign-up')}
                            className="rounded-full bg-black text-white cursor-pointer truncate block whitespace-no-wrap px-3 py-2 hover:bg-gray-700/90 hover:text-gray-200"
                        >
                            Sign Up
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}

export default HeaderNotAuthenticate;
