import React from 'react';
import { useNavigate } from 'react-router-dom';
import { RotatingText } from 'rotating-text';
import HeaderDefault from './HeaderDefault';
import { useSelector } from 'react-redux';

function HeaderNotAuthenticate({ isOpenNotification, setIsOpenNotification }) {
    const { isAuthenticated } = useSelector((state) => state.auth);

    const navigate = useNavigate();

    return (
        <nav className="flex justify-end h-full rounded dark:bg-gray-900">
            <div className="w-full h-7vh flex shadow-lg">
                <div className="w-2vw" />
                <div className="w-98vw flex justify-between items-center">
                    <div className="flex justify-start w-1/4 block pl-3  text-white rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white">
                        <h1
                            className="text-gray-800 w-96 text-lg font-nowy text-bold italic"
                            onClick={() => navigate('/')}
                        >
                            <RotatingText
                                text="Auctionforfun"
                                stagger={0.1}
                                timing={0.3}
                                className="rotating-text cursor-pointer"
                                styles={{ fontSize: '12px' }}
                            />
                        </h1>
                    </div>
                    <div className="mx-5vw flex items-center space-x-4">
                        <div
                            className="cursor-pointer text-end hover:text-white"
                            onClick={() => navigate('/')}
                        >
                            Home
                        </div>
                        {isAuthenticated ? (
                            <HeaderDefault
                                isOpenNotification={isOpenNotification}
                                setIsOpenNotification={setIsOpenNotification}
                            />
                        ) : (
                            <div className="flex justify-end items-center relative inline-flex space-x-2">
                                <div
                                    onClick={() => navigate('/login')}
                                    className="rounded-full cursor-pointer truncate block whitespace-no-wrap px-2 py-2 hover:text-white"
                                >
                                    Login
                                </div>

                                <div
                                    onClick={() => navigate('/sign-up')}
                                    className="rounded-full bg-black text-white cursor-pointer truncate block whitespace-no-wrap px-3 py-1 hover:bg-gray-700/90 hover:text-gray-200"
                                >
                                    Sign Up
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default HeaderNotAuthenticate;
