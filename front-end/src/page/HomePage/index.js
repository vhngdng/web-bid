import React from 'react';
import { Helmet } from 'react-helmet';
import bg from '~/assets/images/bg.jpeg';
import { motion } from 'framer-motion';
import woodenHammer from '~/assets/images/wooden_hammer_auction.png';
import { RotatingText } from 'rotating-text';
import { colVariant } from '~/animation';
function Home() {
    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Auctionforfun Home</title>
                <meta name="description" content="Home" />
            </Helmet>

            <div className="w-screen">
                <div className="static flex justify-center items-center">
                    <motion.img
                        src={woodenHammer}
                        className="object-fill h-96 w-96"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1, transition: { delay: 1 } }}
                        exit={{ opacity: 0, transition: { delay: 1 } }}
                    />
                    <h1 className="absolute top-1/2 mb-12 mx-4 text-gray-900/20">
                        <RotatingText
                            text="Welcome&nbsp;to&nbsp;Auctionforfun"
                            stagger={0.1}
                            timing={0.3}
                            className="rotating-text"
                            styles={{ fontSize: '100px' }}
                        />
                    </h1>
                </div>
                <div className="flex justify-center items-center">
                    <motion.div
                        initial={{
                            x: -25,
                            opacity: 0,
                        }}
                        animate={{
                            transition: {
                                ease: 'easeInOut',
                                duration: 2,
                            },
                            x: 0,
                            opacity: 1,
                        }}
                        className="px-4"
                    >
                        <img
                            className="object-cover h-48 w-48 rounded-full"
                            src={bg}
                        />
                    </motion.div>
                    <motion.div
                        className="font-sans text-2xl text-white px-4"
                        initial={colVariant.hidden}
                        animate={colVariant.show}
                    >
                        Unlocking the value of the secondary goods market
                    </motion.div>
                </div>
            </div>
        </>
    );
}

export default Home;
