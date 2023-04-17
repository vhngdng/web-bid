import React from 'react';
import { useNavigate } from 'react-router-dom';
import { RotatingText } from 'rotating-text';

function HeaderNotAuthenticate() {
    const navigate = useNavigate();
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
                    <div>
                        <div
                            onClick={() => navigate('/profile-details')}
                            className="cursor-pointer truncate block whitespace-no-wrap"
                        >
                            Login
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default HeaderNotAuthenticate;
