/* eslint-disable no-extra-boolean-cast */
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '~/Loader';
import { useGetDetailPropertyForGuestQuery } from '~/app/service/property.service';
import { AnimatePresence, motion } from 'framer-motion';
import { homeSidebarVariants } from '~/animation';
import { DOMAIN_URL } from '~/CONST/const';
import house from '~/assets/images/beautiful-house.jpg';
import housev2 from '~/assets/images/housev2.jpg';
import housev3 from '~/assets/images/housev3.png';
import airplane from '~/assets/images/airplane.jpeg';
import girl from '~/assets/images/girl.jpg';
import formatDateTime from '~/utils/formatDateTime';
import { NumericFormat } from 'react-number-format';
import readImage from '~/utils/readImage';
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
            <div className="min-h-75vh h-full w-full flex flex-col justify-center items-center ">
                <div className="w-1/2 space-y-10">
                    {images.length > 0
                        ? images.map((image, index) => (
                              <div key={index}>
                                  <img
                                      className="w-full object-cover rounded-lg shadow-[0_50px_25px_-24px_rgb(0,0,0,0.3)]"
                                      src={`${DOMAIN_URL}api/v1/images/read/${image.id}`}
                                  />
                              </div>
                          ))
                        : imagesFake.map((fake, index) => (
                              <div key={index}>
                                  <img
                                      className="w-full object-cover rounded-lg shadow-[0_50px_25px_-24px_rgb(0,0,0,0.3)]"
                                      src={fake}
                                  />
                              </div>
                          ))}
                </div>
            </div>
            <AnimatePresence>
                <motion.div
                    className={`fixed bottom-0 right-0 w-1/6 bg-gray-600/20`}
                    animate={scrollPosition >= 120 ? 'open' : 'collapsed'}
                    variants={homeSidebarVariants}
                    transition={{
                        ease: 'easeInOut',
                        duration: 1,
                    }}
                >
                    <div className=" w-full font-serif inline-block text-center space-x-3 space-y-4">
                        <div className="text-4xl mt-5">
                            {data.property.name}
                        </div>
                        <div className="text-2xl text-gray-600 ">
                            ({data.property.category})
                        </div>
                        <div className="text-2xl text-black italic">
                            Property Id: #{data.property.id}
                        </div>
                        <div className="flex justify-between">
                            <span>Created at</span>
                            <span>
                                {formatDateTime(data.property.createdAt).date}
                            </span>
                        </div>
                        <div className="flex space-x-2 w-full">
                            <span className="w-2/5 text-start">Quantity</span>
                            <span className="w-3/5 text-start">
                                {data.property.quantity}
                            </span>
                        </div>
                        <div
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
                            className={`text-2xl ${
                                ['PROCESSING', 'ACTIVE'].includes(
                                    data.property.bidStatus,
                                )
                                    ? 'cursor-pointer text-blue-400 hover:text-blue-600'
                                    : ''
                            }`}
                        >
                            {data.property.bidStatus === 'ACTIVE'
                                ? 'Can join the room to purchase now'
                                : data.property.bidStatus === 'PROCESSING'
                                ? `The room is in progress #${data.property.bidId}`
                                : 'Can not purchase this item now'}
                        </div>
                        <div className="flex justify-between items-center ">
                            <p>Reserve Price</p>
                            <p className="min-w-1/2 text-start">
                                <NumericFormat
                                    className="title-font font-serif font-medium text-2xl text-red-500 hover:scale-125"
                                    value={
                                        !!data.property.reservePrice
                                            ? data.property.reservePrice
                                            : 0
                                    }
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    allowLeadingZeros
                                    prefix={'$'}
                                />
                            </p>
                        </div>
                        <div className="flex justify-center items-center space-x-3">
                            <div className="w-24 rounded-full">
                                <img
                                    src={
                                        !!data.owner?.avatar
                                            ? readImage(data.owner.avatar)
                                            : 'https://sbcf.fr/wp-content/uploads/2018/03/sbcf-default-avatar.png'
                                    }
                                    className="w-full object-fill rounded-full"
                                />
                            </div>
                            <div>{data.property.owner.name}</div>
                        </div>
                        <div className="font-serif space-y-3">
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
