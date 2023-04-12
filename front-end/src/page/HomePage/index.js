import { motion } from 'framer-motion';
// import { motion } from 'framer-motion-3d';
import React from 'react';
import { Helmet } from 'react-helmet';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RotatingText } from 'rotating-text';
function Home() {
    const { auth } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    const handleRedirectToAdminPage = () => {
        navigate('admin');
    };
    const handleRedirectToProfile = () => {
        navigate('/profile-detail');
    };
    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Auctionforfun Home</title>
                <meta name="description" content="Home" />
            </Helmet>
            <div>
                <h1 className="mb-12 mx-4 text-gray-400">
                    <RotatingText
                        text="Welcome&nbsp;to&nbsp;Auctionforfun"
                        stagger={0.1}
                        timing={0.3}
                        className="rotating-text"
                        styles={{ fontSize: '100px' }}
                    />
                </h1>

                <div className="flex justify-center ">
                    <div
                        className="button w-40 h-16 bg-blue-500 rounded-lg cursor-pointer select-none
                            active:translate-y-2  active:[box-shadow:0_0px_0_0_#1b6ff8,0_0px_0_0_#1b70f841]
                            active:border-b-[0px]
                            transition-all duration-150 [box-shadow:0_10px_0_0_#1b6ff8,0_15px_0_0_#1b70f841]
                            border-b-[1px] border-blue-400 mx-auto"
                        onClick={() => navigate('/bid-room')}
                    >
                        <span className="flex flex-col justify-center items-center h-full text-white font-bold text-lg ">
                            Join BidRoom
                        </span>
                    </div>
                    {auth.authorities.find(
                        (n) => n.authority === 'ROLE_ADMIN',
                    ) ? (
                        <div
                            className="button w-40 h-16 bg-blue-500 rounded-lg cursor-pointer select-none
                            active:translate-y-2  active:[box-shadow:0_0px_0_0_#1b6ff8,0_0px_0_0_#1b70f841]
                            active:border-b-[0px]
                            transition-all duration-150 [box-shadow:0_10px_0_0_#1b6ff8,0_15px_0_0_#1b70f841]
                            border-b-[1px] border-blue-400 mx-auto"
                            onClick={handleRedirectToAdminPage}
                        >
                            <span className="flex flex-col justify-center items-center h-full text-white font-bold text-lg ">
                                Go to Admin page
                            </span>
                        </div>
                    ) : (
                        <div
                            onClick={handleRedirectToProfile}
                            className="button w-40 h-16 bg-blue-500 rounded-lg cursor-pointer select-none
                            active:translate-y-2  active:[box-shadow:0_0px_0_0_#1b6ff8,0_0px_0_0_#1b70f841]
                            active:border-b-[0px]
                            transition-all duration-150 [box-shadow:0_10px_0_0_#1b6ff8,0_15px_0_0_#1b70f841]
                            border-b-[1px] border-blue-400 mx-auto"
                        >
                            <span className="flex flex-col justify-center items-center h-full text-white font-bold text-lg ">
                                Go to Your Profile page
                            </span>
                        </div>
                    )}
                </div>
                <div className="my-4 flex justify-center align-center ">
                    <motion.img
                        className="w-96 h-96"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                            transition: { type: 'spring', duration: 1 },
                        }}
                        exit={{ opacity: 0 }}
                        // eslint-disable-next-line no-undef
                        src={require('~/assets/images/giphy.gif')}
                        alt="loading..."
                    />
                </div>
            </div>
        </>
    );
}

export default Home;
