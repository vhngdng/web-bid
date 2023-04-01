import React, { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

const customSelectStyle = 'bg-blue-200 text-lime-900 shadow-inner scale-y-90';
function ProfilePage() {
    const [selectSidebar, setSelectSidebar] = useState(1);
    const navigate = useNavigate();
    const location = useLocation();
    useEffect(() => {
        console.log(location.pathname);
        if (location.pathname.includes('transaction')) {
            setSelectSidebar(3);
        } else if (location.pathname.includes('upload-property')) {
            setSelectSidebar(2);
        } else if (location.pathname.includes('property-list')) {
            setSelectSidebar(4);
        } else {
            setSelectSidebar(1);
        }
    }, [location]);
    console.log(selectSidebar);
    return (
        <div>
            <div className="flex flex-row w-full">
                <aside
                    id="default-sidebar"
                    className="fixed top-30 left-0 z-40 min-w-fit w-[13vw] mx-6 h-full transition-transform -translate-x-full sm:translate-x-0"
                    aria-label="Sidebar"
                >
                    <div className="h-full rounded-lg px-3 py-4 overflow-y-auto bg-gray-50/25 dark:bg-gray-800">
                        <ul>
                            <li>
                                <button
                                    className={`flex flex-col items-center w-full transition duration-500 ease-in-out ml-0 py-2 text-base font-normal text-teal-300 hover:text-black rounded-lg dark:text-white hover:bg-blue-300 dark:hover:bg-gray-700 
                                    ${
                                        selectSidebar === 1
                                            ? customSelectStyle
                                            : 'bg-gray-200'
                                    }`}
                                    onClick={() => navigate('/profile-detail')}
                                >
                                    Profile
                                </button>
                            </li>
                            <li>
                                <button
                                    className={`flex flex-col items-center w-full transition duration-500 ease-in-out ml-0 py-2 text-base font-normal text-teal-300 hover:text-black rounded-lg dark:text-white hover:bg-blue-300 dark:hover:bg-gray-700 transition duration-150 ease-in-out
                                    ${
                                        selectSidebar === 2
                                            ? customSelectStyle
                                            : 'bg-gray-200'
                                    }`}
                                    onClick={() => navigate('upload-property')}
                                >
                                    Upload property
                                </button>
                            </li>
                            <li>
                                <button
                                    className={`flex flex-col items-center w-full transition duration-500 ease-in-out ml-0 py-2 text-base font-normal text-teal-300 hover:text-black rounded-lg dark:text-white hover:bg-blue-300 dark:hover:bg-gray-700 transition duration-150 ease-in-out
                                    ${
                                        selectSidebar === 3
                                            ? customSelectStyle
                                            : 'bg-gray-200'
                                    }`}
                                    onClick={() => navigate('transaction')}
                                >
                                    Transaction
                                </button>
                            </li>
                            <li>
                                <button
                                    className={`flex flex-col items-center w-full transition duration-500 ease-in-out ml-0 py-2 text-base font-normal text-teal-300 hover:text-black rounded-lg dark:text-white hover:bg-blue-300 dark:hover:bg-gray-700 transition duration-150 ease-in-out
                                    ${
                                        selectSidebar === 4
                                            ? customSelectStyle
                                            : 'bg-gray-200'
                                    }`}
                                    onClick={() => navigate('property-list')}
                                >
                                    Properties
                                </button>
                            </li>
                        </ul>
                    </div>
                </aside>

                <section className="flex flex-col mx-6 max-w-3xl">
                    <Outlet />
                </section>
            </div>
        </div>
    );
}

export default ProfilePage;
