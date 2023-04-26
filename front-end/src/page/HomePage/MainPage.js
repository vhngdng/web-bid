/* eslint-disable no-unused-vars */
/* eslint-disable no-extra-boolean-cast */
import React, { useEffect, useState } from 'react';
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
import { learnMoreVariants } from '~/animation';

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
                <BackgroundImage>
                    <div className="h-50vh flex justify-between">
                        <div className="w-1/2" />
                        <div className="w-1/2 my-20">
                            <div className="flex justify-center items-center text-4xl text-gray-700 font-extrabold font-nowy">
                                <div>
                                    <span className="italic p-2">
                                        Welcome to AuctionForFun
                                    </span>
                                    <div className="w-full flex justify-center items-center">
                                        {!isLearnMore ? (
                                            <div
                                                onClick={() =>
                                                    setIsLearnMore(true)
                                                }
                                                className="cursor-pointer text-center text-black text-xl my-5 py-2 bg-[rgba(213,224,221,0.815)] w-1/3 rounded-full hover:bg-opacity-75 hover:text-white"
                                            >
                                                Learn more
                                            </div>
                                        ) : (
                                            <div
                                                onClick={() =>
                                                    setIsLearnMore(false)
                                                }
                                                className="cursor-pointer text-center text-black text-xl my-5 py-2 bg-[rgba(213,224,221,0.815)] w-1/3 rounded-full hover:bg-opacity-75 hover:text-white"
                                            >
                                                I understood !!
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </BackgroundImage>
                <AnimatePresence>
                    {isDisable ? (
                        <motion.div
                            className="w-full"
                            animate={
                                isLearnMore
                                    ? learnMoreVariants.closed
                                    : learnMoreVariants.open
                            }
                            variants={learnMoreVariants}
                        >
                            <div className="w-full">
                                <div className="flex justify-center items-center">
                                    <div className="space-y-10 mt-10 w-4/5 rounded-t-lg">
                                        {top5Earliest.length > 0 && (
                                            <Top5Earliest
                                                top5Earliest={top5Earliest}
                                            />
                                        )}
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
                    ) : (
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
                                <div>Buy</div>
                                <div>Prooperty Registration</div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </>
    );
}

export default MainPage;
