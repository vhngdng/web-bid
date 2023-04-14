import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { DOMAIN_URL } from '~/CONST/const';

export const Slideshow = ({ image }) => (
    <AnimatePresence>
        <motion.img
            key={image.src}
            src={`${DOMAIN_URL}api/v1/images/read/${image.id}`}
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            className="object-fit h-40 w-40"
        />
    </AnimatePresence>
);
