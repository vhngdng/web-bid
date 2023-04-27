/* eslint-disable no-extra-boolean-cast */
import React from 'react';
import { useLocation } from 'react-router-dom';
import backgroundImage from '~/assets/images/background-auction.jpg';
import { AnimatePresence, motion } from 'framer-motion';
import { backgroundVariants } from '~/animation';

function BackgroundImage({ children }) {
    const location = useLocation();
    console.log('location', location.pathname);
    {
        return location.pathname !== '/' ? (
            <>{children}</>
        ) : (
            <AnimatePresence>
                <motion.div
                    initial="closed"
                    animate="open"
                    variants={backgroundVariants}
                    className={`inline-block h-60vh bg-opacity-10 w-full bg-no-repeat bg-cover bg-bottom z-0`}
                    style={{ backgroundImage: `url(${backgroundImage})` }}
                >
                    {children}
                </motion.div>
            </AnimatePresence>
        );
    }
}

export default BackgroundImage;
