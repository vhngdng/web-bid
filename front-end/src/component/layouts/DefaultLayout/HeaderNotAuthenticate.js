import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RotatingText } from 'rotating-text';
import HeaderDefault from './HeaderDefault';
import { useSelector } from 'react-redux';

function HeaderNotAuthenticate() {
    const { isAuthenticated } = useSelector((state) => state.auth);

    const navigate = useNavigate();

    return (
        <nav className="flex justify-end  pt-1 rounded dark:bg-gray-900 shadow-lg">
            <div className="w-full flex justify-center items-center rounded-lg mt-8 md:mt-0 md:text-sm md:font-medium md:border-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                <div
                    onClick={() => navigate('/')}
                    className="flex justify-start w-2/3 cursor-pointer block py-2 pl-3  text-white rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white"
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
