import React, { useState } from 'react';
import {
    Sidebar,
    Menu,
    MenuItem,
    SubMenu,
    useProSidebar,
} from 'react-pro-sidebar';
import { motion } from 'framer-motion';
import arrowRight from '~/assets/images/triple-right-arrow.webp';
// import { arrowRight } from '~/assets';

function BidDetailSideBar({ isAdmin }) {
    const { collapseSidebar } = useProSidebar();
    const [isCollapse, setIsCollapse] = useState(false);

    const handleCollapseSidebar = () => {
        collapseSidebar();
        setIsCollapse((prev) => !prev);
    };
    return (
        <div className="fixed top-0 -left-0 h-screen">
            <div className="">
                <Sidebar
                    className="h-screen relative"
                    collapsedWidth="40px"
                    defaultCollapsed={true}
                    transitionDuration={1000}
                >
                    {isCollapse && (
                        <Menu className="">
                            <SubMenu label="Charts">
                                <MenuItem> Pie charts </MenuItem>
                                <MenuItem> Line charts </MenuItem>
                            </SubMenu>
                            <MenuItem> Documentation </MenuItem>
                            <MenuItem> Calendar </MenuItem>
                            <SubMenu label="Bid">
                                <MenuItem> Setting </MenuItem>
                                <MenuItem> Quit </MenuItem>
                            </SubMenu>
                            {isAdmin && (
                                <SubMenu label="Admin">
                                    <MenuItem> Setting </MenuItem>
                                    <MenuItem> Quit </MenuItem>
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
        </div>
    );
}

export default BidDetailSideBar;
