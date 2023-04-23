import React, { useEffect, useState } from 'react';
import {
    Sidebar,
    Menu,
    MenuItem,
    SubMenu,
    useProSidebar,
} from 'react-pro-sidebar';
import { AnimatePresence, motion } from 'framer-motion';
import arrowRight from '~/assets/images/triple-right-arrow.webp';
import { homeSidebarVariants } from '~/animation';
import { useNavigate } from 'react-router-dom';
import TutorialModal from './TutorialModal';

function HomeSidebar() {
    const { collapseSidebar } = useProSidebar();
    const [isCollapse, setIsCollapse] = useState(false);
    const [search, setSearch] = useState('');
    const [scrollPosition, setScrollPosition] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const handleScroll = () => {
        const position = window.pageYOffset;
        setScrollPosition(position);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [scrollPosition]);
    const handleCollapseSidebar = () => {
        collapseSidebar();
        setIsCollapse((prev) => !prev);
    };
    const handleSearch = (e) => {
        console.log(e.key);
        if (e.key === 'Enter') {
            navigate(`/search/${search}`);
        }
    };
    return (
        <>
            <AnimatePresence>
                <motion.div
                    className={`fixed bottom-0 left-0`}
                    animate={scrollPosition >= 120 ? 'open' : 'collapsed'}
                    variants={homeSidebarVariants}
                    transition={{
                        ease: 'easeInOut',
                        duration: 1,
                    }}
                >
                    <div className="h-full">
                        <Sidebar
                            className="relative h-full"
                            collapsedWidth="40px"
                            defaultCollapsed={true}
                            transitionDuration={1000}
                            backgroundColor="rgb(255,255,255,0.3)"
                            width="11vw"
                        >
                            {isCollapse && (
                                <div className="my-10 space-y-10">
                                    <div className="flex justify-center items-center relative inline-flex w-full">
                                        <div className="relative flex items-center w-5/6 h-12 rounded-lg focus-within:shadow-lg overflow-hidden">
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
                                                onKeyDown={(e) =>
                                                    handleSearch(e)
                                                }
                                                defaultValue={search}
                                                onChange={(e) =>
                                                    setSearch(e.target.value)
                                                }
                                            />
                                        </div>
                                    </div>
                                    <Menu className="">
                                        <MenuItem onClick={() => navigate('/')}>
                                            {' '}
                                            Go to Home Page{' '}
                                        </MenuItem>
                                        <MenuItem
                                            onClick={() =>
                                                setIsOpen((prev) => !prev)
                                            }
                                        >
                                            {' '}
                                            Tutorial{' '}
                                        </MenuItem>
                                        <SubMenu label="Property">
                                            <MenuItem
                                                onClick={() =>
                                                    navigate(
                                                        '/profile-detail/property-registration',
                                                    )
                                                }
                                            >
                                                {' '}
                                                Property Registration
                                            </MenuItem>
                                            <MenuItem
                                                onClick={() =>
                                                    navigate('/list-property')
                                                }
                                            >
                                                {' '}
                                                List Property{' '}
                                            </MenuItem>
                                        </SubMenu>
                                        <MenuItem
                                            onClick={() =>
                                                navigate('/bid-room')
                                            }
                                        >
                                            {' '}
                                            Bid Room{' '}
                                        </MenuItem>
                                    </Menu>
                                </div>
                            )}
                            <main
                                style={{ padding: 10 }}
                                className="absolute top-1/2 right-0 pr-0"
                            >
                                <div>
                                    <motion.img
                                        className="object-fit h-6 w-6"
                                        src={arrowRight}
                                        initial={{ opacity: 0, scale: 0.75 }}
                                        animate={{
                                            opacity: 1,
                                            scale: 1,
                                            rotate: isCollapse ? 180 : 0,
                                            transition: { duration: 0.5 },
                                        }}
                                        onClick={handleCollapseSidebar}
                                    />
                                </div>
                            </main>
                        </Sidebar>
                    </div>
                </motion.div>
            </AnimatePresence>
            <TutorialModal isOpen={isOpen} setIsOpen={setIsOpen} />
        </>
    );
}

export default HomeSidebar;
