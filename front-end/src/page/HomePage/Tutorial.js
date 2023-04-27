import React, { useEffect, useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { backgroundVariants } from '~/animation';
import imageBuy from '~/assets/images/online-shoping.jpeg';
import imageSell from '~/assets/images/airplane.jpeg';
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
            <div className="flex justify-end items-center w-full mt-10">
                <div className="h-50vh w-1/2 bg-white/30 flex flex-col justify-center font-nowy px-3">
                    <div className="text-center">
                        To get started, simply create an account and browse our
                        wide selection of properties.
                    </div>

                    <div>
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

                    <div>
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
            <div className="w-full flex justify-center items-center">
                <div className="w-4/5">
                    <div className="h-full">
                        {tradeType === 'buy' && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={
                                    tradeType === 'buy' && toggle
                                        ? 'open'
                                        : 'closed'
                                }
                                variants={backgroundVariants}
                                className=" flex"
                            >
                                <div className="w-96 h-96">
                                    <img
                                        className="w-full h-full object-cover"
                                        src={imageBuy}
                                    />
                                </div>
                                <div className="w-full">test</div>
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
                            >
                                <div className="w-96 h-96">
                                    <img
                                        className={`w-full h-full object-cover`}
                                        src={imageSell}
                                    />
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
