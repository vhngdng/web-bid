/* eslint-disable no-unused-vars */
/* eslint-disable no-extra-boolean-cast */
import React, { useContext, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Loader from '~/Loader';
import { useGetHomeDetailsQuery } from '~/app/service/bid.service';
import Top5Earliest from './components/Top5Earliest';
import Top5User from './components/Top5User';
import { Helmet } from 'react-helmet';
import Top5Famous from './components/Top5Famous';
// import Tutorial from './Tutorial';
import ListProperty from './property/ListProperty';
import { useNavigate } from 'react-router-dom';
import BackgroundImage from '~/component/layouts/DefaultLayout/BackgroundImage';
import { colVariant, learnMoreVariants } from '~/animation';
import Tutorial from './Tutorial';
import checkIcon from '~/assets/images/check-icon.jpg';

function MainPage() {
    const { data, isLoading } = useGetHomeDetailsQuery();
    const [top5Earliest, setTop5Earliest] = useState([]);
    const [top5Famous, setTop5Famous] = useState([]);
    const [top5User, setTop5User] = useState([]);
    const [isLearnMore, setIsLearnMore] = useState(false);
    const [isDisable, setIsDisable] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        if (!!data) {
            setTop5Earliest([...data.bidEarliestTop5]);
            setTop5User([...data.userRateTop5]);
            setTop5Famous([...data.bidFamousTop5]);
        }
    }, [data]);
    useEffect(() => {
        setTimeout(() => {
            setIsDisable((prev) => !prev);
        }, 300);
    }, [isLearnMore]);
    if (isLoading) return <Loader />;
    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Auctionforfun Home</title>
                <meta name="description" content="Home" />
            </Helmet>
            <div className="w-full inline-block overflow-x-hidden">
                {isDisable ? (
                    <AnimatePresence>
                        <motion.div
                            className="w-full"
                            animate={
                                isLearnMore
                                    ? learnMoreVariants.closed
                                    : learnMoreVariants.open
                            }
                            variants={learnMoreVariants}
                        >
                            <div className="h-60vh flex justify-between">
                                <div className="w-1/2" />
                                <div className="w-1/2 my-20">
                                    <div className="flex justify-center items-center text-4xl text-gray-700 font-extrabold font-nowy">
                                        <div className="w-4/5">
                                            <div className="p-2 text-center">
                                                Welcome to AuctionForFun
                                            </div>
                                            <AnimatePresence>
                                                <motion.div
                                                    className="font-nowy text-base text-black text-center p-4 italic"
                                                    initial={colVariant.hidden}
                                                    animate={colVariant.show}
                                                >
                                                    Unlock the full potential of
                                                    your passion for property
                                                    investment on our exclusive
                                                    online bidding platform.
                                                    With a wide range of
                                                    exciting and lucrative
                                                    properties, including luxury
                                                    condos, beachfront villas,
                                                    and prime commercial real
                                                    estate, you can build your
                                                    dream lifestyle and achieve
                                                    financial freedom with ease.
                                                </motion.div>
                                            </AnimatePresence>
                                            <div className="w-full flex justify-center items-center">
                                                <div
                                                    onClick={() => {
                                                        setIsLearnMore(true);
                                                    }}
                                                    className="cursor-pointer text-center text-black text-xl my-5 py-2 bg-[rgba(213,224,221,0.815)] w-1/3 rounded-full hover:bg-opacity-75 hover:text-gray-700/50"
                                                >
                                                    Learn more
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="w-full">
                                <div className="flex justify-center items-center">
                                    <div className="space-y-10 mt-10 w-4/5 rounded-t-lg">
                                        <Top5Earliest
                                            top5Earliest={top5Earliest}
                                        />
                                    </div>
                                </div>
                                <div className="bg-[rgba(182,207,201,0.815)] flex justify-center items-center">
                                    <div className="w-4/5 my-10">
                                        <div className="flex items-center w-full mx-5vw py-5">
                                            <span className="underline underline-offset-auto text-3xl">
                                                Top 5 User
                                            </span>
                                        </div>
                                        {top5User.length > 0 && (
                                            <Top5User top5User={top5User} />
                                        )}
                                    </div>
                                </div>
                                <div className="flex justify-center items-center overflow-hidden">
                                    <div className=" w-4/5 my-10">
                                        <Top5Famous top5Famous={top5Famous} />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                ) : (
                    <AnimatePresence>
                        <motion.div
                            className="w-full"
                            animate={
                                isLearnMore
                                    ? learnMoreVariants.open
                                    : learnMoreVariants.closed
                            }
                            variants={learnMoreVariants}
                        >
                            <div className="w-full flex justify-center items-center">
                                <Tutorial />
                            </div>
                            <div className="w-full flex justify-center items-center">
                                <div
                                    onClick={() => {
                                        setIsLearnMore(false);
                                    }}
                                    className="cursor-pointer text-center text-black text-lg my-5 py-2 px-4 bg-[rgb(187,205,206)] w-fit rounded-full hover:bg-opacity-75 hover:text-gray-700 flex justify-center items-center"
                                >
                                    <div className="w-6 h-6">
                                        <img
                                            src={checkIcon}
                                            className="object-fill w-full"
                                        />
                                    </div>
                                    <span className="px-2">
                                        I understand and want to join now
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                )}
            </div>
        </>
    );
}

export default MainPage;
