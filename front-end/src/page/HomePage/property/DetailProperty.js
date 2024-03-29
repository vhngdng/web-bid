/* eslint-disable no-extra-boolean-cast */
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '~/Loader';
import { useGetDetailPropertyForGuestQuery } from '~/app/service/property.service';
import { AnimatePresence, motion } from 'framer-motion';
import { homeSidebarVariants } from '~/animation';
import house from '~/assets/images/beautiful-house.jpg';
import housev2 from '~/assets/images/housev2.jpg';
import housev3 from '~/assets/images/housev3.png';
import airplane from '~/assets/images/airplane.jpeg';
import girl from '~/assets/images/girl.jpg';
import readImage from '~/utils/readImage';
import ImageSlideShow from './ImageSlideShow';
const imagesFake = [house, housev2, housev3, airplane, girl];

function DetailProperty() {
    const { propertyId } = useParams();
    const { data, isLoading } = useGetDetailPropertyForGuestQuery(propertyId);
    const [scrollPosition, setScrollPosition] = useState(0);
    const [images, setImages] = useState([]);
    const navigate = useNavigate();
    const handleScroll = () => {
        const position = window.pageYOffset;
        setScrollPosition(position);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [scrollPosition]);

    useEffect(() => {
        if (!!data && data.images.length > 0) {
            setImages([...data.images]);
        }
    }, [data]);

    if (isLoading) return <Loader />;

    return (
        <>
            <div className="min-h-75vh h-full w-full flex flex-col justify-center items-center mt-5">
                <div className="w-full space-y-10">
                    {!!data && (
                        <ImageSlideShow
                            images={images.length > 0 ? images : imagesFake}
                            name={data.property.name}
                            category={data.property.category}
                            propertyId={data.property.id}
                            createdAt={data.property.createdAt}
                            quantity={data.property.quantity}
                            reservePrice={data.property.reservePrice}
                        />
                    )}
                </div>
            </div>
            <AnimatePresence>
                <motion.div
                    className={`fixed bottom-0 right-0 w-1/6 bg-gray-600/20 pt-10`}
                    animate={scrollPosition >= 120 ? 'open' : 'collapsed'}
                    variants={homeSidebarVariants}
                    transition={{
                        ease: 'easeInOut',
                        duration: 1,
                    }}
                >
                    <div className=" w-full inline-block text-center space-x-3 space-y-4">
                        <div className={`text-2xl`}>
                            {data.property.bidStatus === 'ACTIVE'
                                ? 'Purchase now'
                                : data.property.bidStatus === 'PROCESSING'
                                ? `The room is in progress #${data.property.bidId}`
                                : 'Can not purchase this item now'}
                        </div>
                        <button
                            className={`text-black rounded-lg text-sm px-5 py-2.5 text-center mb-2 font-medium shadow-lg dark:shadow-lg focus:outline-none ${
                                ['PROCESSING', 'ACTIVE'].includes(
                                    data.property.bidStatus,
                                )
                                    ? 'bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-blue-300 dark:focus:ring-blue-800 shadow-blue-500/50 dark:shadow-blue-800/80'
                                    : 'bg-gradient-to-r from-gray-500 via-gray-600 to-gray-700 hover:bg-gradient-to-br focus:ring-gray-300 dark:focus:ring-gray-800 shadow-gray-500/50 dark:shadow-gray-800/80'
                            }`}
                            disabled={
                                !['PROCESSING', 'ACTIVE'].includes(
                                    data.property.bidStatus,
                                )
                            }
                            onClick={
                                ['PROCESSING', 'ACTIVE'].includes(
                                    data.property.bidStatus,
                                )
                                    ? () =>
                                          navigate(
                                              `/bid-room/join/${data.property.bidId}`,
                                          )
                                    : null
                            }
                        >
                            Enter Room
                        </button>
                        <div className="italic text-gray-700/75">Owner</div>
                        <div className="flex justify-center items-center space-x-3">
                            <div className="w-12 h-12 rounded-full">
                                <img
                                    src={
                                        !!data.owner?.avatar
                                            ? readImage(data.owner.avatar)
                                            : 'https://sbcf.fr/wp-content/uploads/2018/03/sbcf-default-avatar.png'
                                    }
                                    className="w-full object-cover rounded-full"
                                />
                            </div>
                            <div>{data.property.owner.name}</div>
                        </div>
                        <div className="space-y-3">
                            <p className="italic text-gray-700/75">
                                Description
                            </p>
                            <p>{data.property.description}</p>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>
        </>
    );
}

export default DetailProperty;
