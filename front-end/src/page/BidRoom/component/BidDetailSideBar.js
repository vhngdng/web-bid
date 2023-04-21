/* eslint-disable no-extra-boolean-cast */
import React, { useCallback, useEffect, useState } from 'react';
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
// import Modal from 'react-modal';
// import { customStyles } from '~/utils/customStyle';
import ConfirmModal from './ConfirmModal';
// import { arrowRight } from '~/assets';

function BidDetailSideBar({
    isAdmin,
    setIsOpenAdminSetting,
    id,
    bidRoomStatus,
    sendFinishBidMessage,
    userWinning,
}) {
    const { collapseSidebar } = useProSidebar();
    const [isCollapse, setIsCollapse] = useState(false);
    const [scrollPosition, setScrollPosition] = useState(0);
    const [updateStatusBid] = useUpdateStatusBidMutation();
    const [open, setOpen] = useState(false);
    const [url, setUrl] = useState('');
    // eslint-disable-next-line no-unused-vars
    const navigate = useNavigate();
    useEffect(() => {
        if (!open) setUrl('');
    }, [open]);
    const handleScroll = useCallback(() => {
        const position = window.pageYOffset;
        setScrollPosition(position);
    }, []);

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
        if (bidRoomStatus !== newStatus) {
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
        } else {
            toast.error('Can not change status of room', {
                position: 'top-center',
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: 'colored',
            });
        }
    };
    const handlePropertyRegistration = () => {
        setUrl('/profile-detail/property-registration');
        setOpen((prev) => !prev);
    };
    const handleListProperty = () => {
        setUrl('/list-property');
        setOpen((prev) => !prev);
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
                                    <MenuItem onClick={() => navigate('/')}>
                                        {' '}
                                        Go to Home Page{' '}
                                    </MenuItem>
                                    <MenuItem> Rule </MenuItem>
                                    <SubMenu label="Property">
                                        <MenuItem
                                            onClick={handlePropertyRegistration}
                                        >
                                            Property Registration
                                        </MenuItem>
                                        <MenuItem onClick={handleListProperty}>
                                            List Property
                                        </MenuItem>
                                    </SubMenu>
                                    {/* <SubMenu label="Bid">
                                        <MenuItem>
                                            {' '}
                                            Property Registration{' '}
                                        </MenuItem>
                                        <MenuItem> List Property </MenuItem>
                                    </SubMenu> */}
                                    {isAdmin && (
                                        <SubMenu
                                            label="Setting"
                                            onClick={() =>
                                                setIsOpenAdminSetting(
                                                    (prev) => !prev,
                                                )
                                            }
                                        >
                                            <MenuItem
                                                onClick={() =>
                                                    handleChangeStatus(
                                                        'PROCESSING',
                                                    )
                                                }
                                            >
                                                <div className="pl-2 leading-none font-sans text-blue-600 font-extrabold">
                                                    Run
                                                </div>
                                            </MenuItem>
                                            <MenuItem
                                                onClick={() =>
                                                    sendFinishBidMessage()
                                                }
                                            >
                                                <div
                                                    className={`pl-2 leading-none font-sans font-extrabold ${
                                                        !!userWinning.username
                                                            ? 'text-red-rgb'
                                                            : 'text-gray-300 pointer-events-none'
                                                    }`}
                                                >
                                                    Finish
                                                </div>{' '}
                                            </MenuItem>
                                            <MenuItem>
                                                <div
                                                    onClick={() =>
                                                        handleChangeStatus(
                                                            'DEACTIVE',
                                                        )
                                                    }
                                                    className="pl-2 leading-none font-sans text-red-600 font-extrabold"
                                                >
                                                    Close
                                                </div>
                                            </MenuItem>
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
            <ConfirmModal
                open={open}
                setOpen={setOpen}
                url={url}
                setUrl={setUrl}
            />
        </>
    );
}

export default BidDetailSideBar;
