import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import ProfileUserSidebar from '../../component/layouts/DefaultSidebarUser/ProfileUserSidebar';

const customSelectStyle = 'bg-blue-200 text-lime-900 shadow-inner scale-y-90';
function ProfilePage() {
    const [selectSidebar, setSelectSidebar] = useState(1);

    const navigate = useNavigate();
    const location = useLocation();
    useEffect(() => {
        console.log(location.pathname);
        if (location.pathname.includes('Payment')) {
            setSelectSidebar(3);
        } else if (location.pathname.includes('property-registration')) {
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
            <Helmet>
                <meta charSet="utf-8" />
                <title>User Profile</title>
                <meta name="description" content="User" />
            </Helmet>
            <div className="flex flex-row w-full">
                <aside
                    id="default-sidebar"
                    className="fixed top-0 left-0 z-40 min-w-fit w-[13vw] mr-6 h-full transition-transform -translate-x-full sm:translate-x-0"
                    aria-label="Sidebar"
                >
                    {
                        <div className="h-full overflow-y-auto overflow-x-hidden bg-gray-500/25 dark:bg-gray-800 w-56 rounded-tr-3xl">
                            <ProfileUserSidebar />
                            <ul className="text-gray-600">
                                <li>
                                    <button
                                        className={`flex flex-col  items-center w-full transition duration-500 ease-in-out ml-0 py-2 text-base font-normal hover:text-black dark:text-white dark:hover:bg-gray-700 
                                    transform hover:translate-x-2 transition-transform ease-in hover:bg-transparent
                                    ${
                                        selectSidebar === 1
                                            ? customSelectStyle
                                            : 'bg-transparent'
                                    }`}
                                        onClick={() =>
                                            navigate('/profile-detail')
                                        }
                                    >
                                        Profile
                                    </button>
                                </li>
                                <li>
                                    <button
                                        className={`flex flex-col items-center w-full transition duration-500 ease-in-out ml-0 py-2 text-base font-normal hover:text-black dark:text-white dark:hover:bg-gray-700 transition duration-150 ease-in-out
                                    transform hover:translate-x-2 transition-transform ease-in hover:bg-transparent 
                                    ${
                                        selectSidebar === 2
                                            ? customSelectStyle
                                            : 'bg-transparent'
                                    }`}
                                        onClick={() =>
                                            navigate('property-registration')
                                        }
                                    >
                                        Auction property registration
                                    </button>
                                </li>
                                <li>
                                    <button
                                        className={`flex flex-col items-center w-full transition duration-500 ease-in-out ml-0 py-2 text-base font-normal hover:text-black dark:text-white dark:hover:bg-gray-700 transition duration-150 ease-in-out
                                    transform hover:translate-x-2 transition-transform ease-in hover:bg-transparent
                                    ${
                                        selectSidebar === 3
                                            ? customSelectStyle
                                            : 'bg-transparent'
                                    }`}
                                        onClick={() => navigate('Payment')}
                                    >
                                        Payment
                                    </button>
                                </li>
                                <li>
                                    <button
                                        className={`flex flex-col items-center w-full transition duration-500 ease-in-out ml-0 py-2 text-base font-normal hover:text-black dark:text-white dark:hover:bg-gray-700 transition duration-150 ease-in-out
                                    transform hover:translate-x-2 transition-transform ease-in hover:bg-transparent
                                    ${
                                        selectSidebar === 4
                                            ? customSelectStyle
                                            : 'bg-transparent'
                                    }`}
                                        onClick={() =>
                                            navigate('property-list')
                                        }
                                    >
                                        Properties
                                    </button>
                                </li>
                            </ul>
                        </div>
                    }
                </aside>

                <section className="flex flex-col mx-6">
                    <Outlet />
                </section>
            </div>
        </div>
    );
}

export default ProfilePage;
