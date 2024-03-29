/* eslint-disable no-extra-boolean-cast */
import React, { useEffect, useState } from 'react';
import { NumericFormat } from 'react-number-format';
import { DOMAIN_URL } from '~/CONST/const';
import { AnimatePresence, motion } from 'framer-motion';
import formatDateTime from '~/utils/formatDateTime';
import house from '~/assets/images/beautiful-house.jpg';
import housev2 from '~/assets/images/housev2.jpg';
import housev3 from '~/assets/images/housev3.png';
import airplane from '~/assets/images/airplane.jpeg';
import girl from '~/assets/images/girlv2.jpg';
import { useNavigate } from 'react-router-dom';
import trippleArrow from '~/assets/images/triple-right-arrow.webp';

const images = [house, housev2, housev3, airplane, girl];
function Top5Famous({ top5Famous }) {
    const [imageListShow, setImageListShow] = useState([]);
    // const [data, setData] = useState([]);
    const [indexImage, setIndexImage] = useState(0);
    const [isPropertyInfo, setIsPropertyInfo] = useState(true);
    const navigate = useNavigate();
    useEffect(() => {
        if (!!top5Famous) {
            top5Famous.forEach((bid, index) =>
                !!bid.property?.imageProperty
                    ? setImageListShow((prev) => [
                          ...prev,
                          `${DOMAIN_URL}/api/v1/read/${bid.property.imageProperty}`,
                      ])
                    : setImageListShow((prev) => [...prev, images[index]]),
            );
            // setData([...top5Famous]);
        }
    }, [top5Famous]);
    const handleChangeIndex = (index) => {
        setIndexImage(index);
    };
    return (
        <div className="py-5">
            <div className="flex items-center w-full mx-5vw space-x-4">
                <div className="underline underline-offset-auto text-3xl py-5">
                    Top 5 Highest Price
                </div>
                <div className="h-4 w-4 bg-transparent">
                    <img src={trippleArrow} className="object-fill w-full" />
                </div>
                <div
                    className="text-2xl text-gray-600 cursor-pointer hover:text-blue-500 italic hover:not-italic"
                    onClick={() => navigate('list-property')}
                >
                    See more
                </div>
            </div>

            <div className="w-full py-5 px-5">
                <div className="inline-block w-full h-full">
                    <div className="w-full h-40vh flex justify-center box-border">
                        <div className="w-4/5 flex items-stretch justify-center p-5 bg-white/30 rounded-t-lg">
                            <div className="w-3/5 h-96">
                                <img
                                    className="w-full h-full object-cover rounded-lg cursor-pointer shadow-2xl"
                                    src={imageListShow[indexImage]}
                                    onClick={() =>
                                        navigate(
                                            `/list-property/${top5Famous[indexImage].property.id}`,
                                        )
                                    }
                                />
                            </div>
                            <div className="w-2/5 ml-4 space-x-4 flex justify-between">
                                <div className="w-full ">
                                    <div className="flex justify-around w-full mb-5">
                                        <div
                                            onClick={() =>
                                                setIsPropertyInfo(true)
                                            }
                                            className={`bg-red-rgb cursor-pointer w-1/3 bg-gray200 text-center rounded-lg
                                                ${
                                                    isPropertyInfo
                                                        ? 'shadow-[0_50px_25px_-24px_rgb(0,0,0,0.3)] ring-offset-2 ring-red-rgb ring-2'
                                                        : 'hover:bg-opacity-70'
                                                }
                                            `}
                                        >
                                            Property
                                        </div>
                                        <div
                                            onClick={() =>
                                                setIsPropertyInfo(false)
                                            }
                                            className={`bg-blue-rgb cursor-pointer w-1/3 bg-gray200 text-center rounded-lg
                                                ${
                                                    isPropertyInfo
                                                        ? 'hover:bg-opacity-70'
                                                        : 'shadow-[0_50px_25px_-24px_rgb(0,0,0,0.3)] ring-offset-2 ring-blue-rgb ring-1'
                                                }
                                            `}
                                        >
                                            Bid info
                                        </div>
                                    </div>
                                    <AnimatePresence>
                                        {isPropertyInfo ? (
                                            <motion.div
                                                initial={{
                                                    opacity: isPropertyInfo
                                                        ? 0
                                                        : 1,
                                                }}
                                                animate={{
                                                    opacity: isPropertyInfo
                                                        ? 1
                                                        : 0,
                                                    transition: { duration: 2 },
                                                }}
                                                exit={{ opacity: 0 }}
                                                className="h-full flex-col justify-center items-start text-center text-xl space-y-4 "
                                            >
                                                <div>
                                                    <p className="text-3xl font-sans font-semibold">
                                                        {top5Famous.length >
                                                            0 &&
                                                            top5Famous[
                                                                indexImage
                                                            ].property.name}
                                                    </p>
                                                    <p className="text-gray-500">
                                                        (
                                                        {top5Famous.length >
                                                            0 &&
                                                            top5Famous[
                                                                indexImage
                                                            ].property.category}
                                                        )
                                                    </p>
                                                </div>
                                                <div className="flex justify-between items-center px-3">
                                                    <p>Quantity</p>
                                                    <p className="text-start min-w-1/2">
                                                        {top5Famous.length >
                                                            0 &&
                                                            top5Famous[
                                                                indexImage
                                                            ].property.quantity}
                                                    </p>
                                                </div>
                                                <div className="flex justify-between items-center px-3">
                                                    <p>Reserve Price</p>
                                                    <p className="min-w-1/2 text-start">
                                                        <NumericFormat
                                                            className="title-font font-medium hover:scale-125 italic"
                                                            value={
                                                                top5Famous.length >
                                                                0
                                                                    ? top5Famous[
                                                                          indexImage
                                                                      ]
                                                                          .reservePrice
                                                                    : 0
                                                            }
                                                            displayType={'text'}
                                                            thousandSeparator={
                                                                true
                                                            }
                                                            allowLeadingZeros
                                                            prefix={'$'}
                                                        />
                                                    </p>
                                                </div>
                                                <div className="flex justify-between items-center px-3">
                                                    <p>Last Price</p>
                                                    <p className="min-w-1/2 text-start">
                                                        <NumericFormat
                                                            className="title-font font-medium hover:scale-125 italic"
                                                            value={
                                                                top5Famous.length >
                                                                0
                                                                    ? top5Famous[
                                                                          indexImage
                                                                      ]
                                                                          .lastPrice
                                                                    : 0
                                                            }
                                                            displayType={'text'}
                                                            thousandSeparator={
                                                                true
                                                            }
                                                            allowLeadingZeros
                                                            prefix={'$'}
                                                        />
                                                    </p>
                                                </div>
                                                <div className="px-3 text-lg italic">
                                                    {top5Famous.length > 0 &&
                                                        top5Famous[indexImage]
                                                            .conditionReport}
                                                </div>
                                            </motion.div>
                                        ) : (
                                            <div className="h-full flex-col justify-center items-start space-y-4 px-3">
                                                <div className="flex justify-between items-center px-3">
                                                    <p>Day Of Sale</p>
                                                    <p className="text-start min-w-1/2">
                                                        {top5Famous.length >
                                                            0 &&
                                                            !!top5Famous[
                                                                indexImage
                                                            ].dayOfSale &&
                                                            formatDateTime(
                                                                top5Famous[
                                                                    indexImage
                                                                ].dayOfSale,
                                                            ).date}
                                                    </p>
                                                </div>
                                                <div className="flex justify-between items-center px-3">
                                                    <p>Price Step</p>
                                                    <p className="min-w-1/2 text-start">
                                                        <NumericFormat
                                                            className="title-font font-medium hover:scale-125 italic"
                                                            value={
                                                                top5Famous.length >
                                                                    0 &&
                                                                top5Famous[
                                                                    indexImage
                                                                ].priceStep
                                                            }
                                                            displayType={'text'}
                                                            thousandSeparator={
                                                                true
                                                            }
                                                            allowLeadingZeros
                                                            prefix={'$'}
                                                        />
                                                    </p>
                                                </div>
                                                <div className="flex justify-between items-center px-3">
                                                    <p>Attendee</p>
                                                    <p className="text-start min-w-1/2">
                                                        {top5Famous.length >
                                                            0 &&
                                                            top5Famous[
                                                                indexImage
                                                            ].countAttendees}
                                                    </p>
                                                </div>
                                                <div className="px-3">
                                                    <div className="flex justify-center items-center ">
                                                        <div className="w-12">
                                                            <img
                                                                src={
                                                                    top5Famous.length >
                                                                        0 &&
                                                                    !!top5Famous[
                                                                        indexImage
                                                                    ].auctioneer
                                                                        .avatar
                                                                        ? top5Famous[
                                                                              indexImage
                                                                          ]
                                                                              .auctioneer
                                                                              .avatar
                                                                        : 'https://sbcf.fr/wp-content/uploads/2018/03/sbcf-default-avatar.png'
                                                                }
                                                                className="rounded-full w-full object-cover"
                                                            />
                                                        </div>
                                                        <div className="min-w-1/2">
                                                            <div className="text-center text-blue-rgb">
                                                                Auctioneer
                                                            </div>
                                                            <p className="flex justify-center items-center font-xl text-start">
                                                                {top5Famous.length >
                                                                    0 &&
                                                                    top5Famous[
                                                                        indexImage
                                                                    ].auctioneer
                                                                        .name}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="px-3">
                                                    <div className="flex justify-center items-center ">
                                                        <div className="w-12">
                                                            <img
                                                                src={
                                                                    top5Famous.length >
                                                                        0 &&
                                                                    !!top5Famous[
                                                                        indexImage
                                                                    ]
                                                                        .winningBidder
                                                                        .avatar
                                                                        ? top5Famous[
                                                                              indexImage
                                                                          ]
                                                                              .winningBidder
                                                                              .avatar
                                                                        : 'https://sbcf.fr/wp-content/uploads/2018/03/sbcf-default-avatar.png'
                                                                }
                                                                className="rounded-full w-full object-cover"
                                                            />
                                                        </div>
                                                        <div className="min-w-1/2">
                                                            <div className="text-center text-red-rgb">
                                                                Winner
                                                            </div>
                                                            <p className="flex justify-center items-center font-xl text-start">
                                                                {top5Famous.length >
                                                                    0 &&
                                                                    top5Famous[
                                                                        indexImage
                                                                    ]
                                                                        .winningBidder
                                                                        .name}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-between items-stretch my-20">
                        {imageListShow.map((image, index) => (
                            <div
                                key={index}
                                className="w-48 bg-white/30 p-2 h-48 rounded-lg"
                            >
                                <div
                                    className={`cursor-pointer w-full h-4/5
                                                            ${
                                                                imageListShow.indexOf(
                                                                    image,
                                                                ) === indexImage
                                                                    ? 'ring-offset-2 ring-blue-300 ring-2 contrast-125 transition duration-1000 ease-in-out shadow-[0_50px_25px_-24px_rgb(0,0,0,0.3)] scale-125 rounded-lg'
                                                                    : 'contrast-50'
                                                            }`}
                                    onClick={() =>
                                        handleChangeIndex(
                                            imageListShow.indexOf(image),
                                        )
                                    }
                                >
                                    <img
                                        className="w-full h-full object-cover rounded-lg"
                                        src={image}
                                    />
                                </div>
                                <div className="italic h-fit py-2 truncate">
                                    {top5Famous[index].property.name}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Top5Famous;
