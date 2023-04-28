import React, { useEffect, useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { backgroundVariants } from '~/animation';
import imageBuy from '~/assets/images/buy.jpg';
import imageSell from '~/assets/images/sell.jpg';
function Tutorial() {
    const [tradeType, setTradeType] = useState('');
    const [toggle, setToggle] = useState(null);
    useEffect(() => {
        // eslint-disable-next-line no-unused-vars
        setTimeout(() => {
            // eslint-disable-next-line no-unused-vars
            setTradeType(() =>
                toggle ? setTradeType('buy') : setTradeType('registration'),
            );
        }, 300);
    }, [toggle]);
    // const handleBack
    return (
        <div className="w-full ">
            <div className="flex justify-end items-center w-full">
                <div className="h-53vh w-1/2 flex flex-col justify-center font-nowy px-3">
                    <div className="text-start px-5">
                        To get started, simply create an account and browse our
                        wide selection of properties.
                    </div>

                    <div className="w-2/3">
                        <span>
                            Want to learn how to buy properties like a pro?
                            Click on the
                        </span>
                        <span
                            onClick={() => setToggle(true)}
                            className="cursor-pointer text-xl w-1/2 mx-2 text-gray-500/90 italic hover:text-blue-400 hover:not-italic"
                        >
                            Buy Tutorial
                        </span>
                    </div>

                    <div className="w-2/3">
                        <span>
                            Looking to showcase your property to potential
                            buyers and connect with industry experts? Click on
                            the
                        </span>
                        <span
                            onClick={() => setToggle(false)}
                            className="cursor-pointer text-xl w-1/2 mx-2 text-gray-500/90 italic hover:text-blue-400 hover:not-italic"
                        >
                            Property Registration
                        </span>
                    </div>
                </div>
            </div>
            <div className="w-full flex justify-center items-center ">
                <div className="w-4/5">
                    <div className="h-full ">
                        {tradeType === 'buy' && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={
                                    tradeType === 'buy' && toggle
                                        ? 'open'
                                        : 'closed'
                                }
                                variants={backgroundVariants}
                                className="flex justify-start items-center bg-gradient-to-r from-[rgba(207,221,222,255)] to-[rgba(187,206,210,255)] rounded-lg p-3"
                            >
                                <div className="w-48 h-48 bg-white/30 rounded-lg p-3">
                                    <img
                                        className="w-full h-full object-cover rounded-lg shadow-2xl"
                                        src={imageBuy}
                                    />
                                </div>
                                <div className="m-5 ">
                                    <div className="w-full">
                                        1. Join the room
                                    </div>
                                    <div className="w-full">
                                        2. Win the property with highest price
                                    </div>
                                    <div className="w-full">
                                        3. Finish payment
                                    </div>
                                    <div className="w-full">
                                        4. Get your property
                                    </div>
                                </div>
                            </motion.div>
                        )}
                        {tradeType === 'registration' && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={
                                    tradeType === 'registration' && !toggle
                                        ? 'open'
                                        : 'closed'
                                }
                                variants={backgroundVariants}
                                className="flex justify-start items-center items-center bg-gradient-to-r from-[rgba(207,221,222,255)] to-[rgba(187,206,210,255)] rounded-lg p-3"
                            >
                                <div className="w-48 h-48 bg-white/30 rounded-lg p-3">
                                    <img
                                        className="w-full h-full object-cover rounded-lg shadow-2xl"
                                        src={imageSell}
                                    />
                                </div>
                                <div className="m-5">
                                    <div className="w-full">
                                        1. Go to your Profile Page
                                    </div>
                                    <div className="w-full">
                                        2. Click on Registration Property button
                                        on the sidebar
                                    </div>
                                    <div className="w-full">
                                        3. Dont forget to describe the details
                                        of your item
                                    </div>
                                    <div className="w-full">
                                        4. Wait us for checking it and deal the
                                        price{' '}
                                    </div>
                                    <div className="w-full">
                                        5. Now just wait for the time of
                                        starting the online bid room and you
                                        will get the money after success
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Tutorial;
