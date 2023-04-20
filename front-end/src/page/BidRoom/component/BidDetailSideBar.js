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
import { useNavigate } from 'react-router-dom';
import { homeSidebarVariants } from '~/animation';
import { ToastContainer, toast } from 'react-toastify';
import NotificationTimer from '~/notificationTimer';
import { useUpdateStatusBidMutation } from '~/app/service/bid.service';
// import { arrowRight } from '~/assets';

function BidDetailSideBar({ isAdmin, setIsOpenAdminSetting, id }) {
    const { collapseSidebar } = useProSidebar();
    const [isCollapse, setIsCollapse] = useState(false);
    const [scrollPosition, setScrollPosition] = useState(0);
    const [updateStatusBid] = useUpdateStatusBidMutation();
    // eslint-disable-next-line no-unused-vars
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
    const handleChangeStatus = (newStatus) => {
        toast.success(
            <NotificationTimer
                timer={Date.now()}
                message={`Bid will be change to ${newStatus}`}
            />,
            {
                position: 'top-center',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: undefined,
            },
        );
        setTimeout(() => {
            console.log(newStatus);
            updateStatusBid({
                id,
                status: newStatus,
            })
                .unwrap()
                .then((res) => console.log(res))
                .catch((err) => console.log(err));
        }, 5500);
    };
    return (
        <>
            <AnimatePresence>
                <motion.div
                    className={`fixed bottom-0 left-0 `}
                    animate={scrollPosition >= 120 ? 'open' : 'collapsed'}
                    variants={homeSidebarVariants}
                    transition={{
                        ease: 'easeInOut',
                        duration: 1,
                    }}
                >
                    <div className="h-full">
                        <Sidebar
                            className="h-screen relative"
                            collapsedWidth="40px"
                            defaultCollapsed={true}
                            transitionDuration={1000}
                        >
                            {isCollapse && (
                                <Menu className="">
                                    <MenuItem> Go to Home Page </MenuItem>
                                    <MenuItem> Rule </MenuItem>
                                    <SubMenu label="Bid">
                                        <MenuItem> Buy </MenuItem>
                                        <MenuItem> Quit </MenuItem>
                                    </SubMenu>
                                    {isAdmin && (
                                        <SubMenu
                                            label="Setting"
                                            onClick={() =>
                                                setIsOpenAdminSetting(
                                                    (prev) => !prev,
                                                )
                                            }
                                        >
                                            <MenuItem>
                                                <button
                                                    onClick={() =>
                                                        handleChangeStatus(
                                                            'PROCESSING',
                                                        )
                                                    }
                                                    className="transform active:scale-95 bg-blue-500 hover:bg-blue-400 text-white px-8 py-3 rounded-lg font-bold tracking-widest w-auto"
                                                >
                                                    <div className="pl-2 leading-none uppercase">
                                                        Run
                                                    </div>
                                                </button>
                                            </MenuItem>
                                            <MenuItem>Finish</MenuItem>
                                            <MenuItem>Close</MenuItem>
                                        </SubMenu>
                                    )}
                                </Menu>
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
            <ToastContainer />
        </>
    );
}

export default BidDetailSideBar;
