/* eslint-disable no-extra-boolean-cast */
import React, { useEffect, useState } from 'react';
import { NumericFormat } from 'react-number-format';
import { DOMAIN_URL } from '~/CONST/const';
import house from '~/assets/images/beautiful-house.jpg';
import housev2 from '~/assets/images/housev2.jpg';
import housev3 from '~/assets/images/housev3.png';
import airplane from '~/assets/images/airplane.jpeg';
import girl from '~/assets/images/girl.jpg';
import formatDateTime from '~/utils/formatDateTime';
import { AnimatePresence, motion } from 'framer-motion';
const images = [house, housev2, housev3, airplane, girl];
function Top5Famous({ top5Famous }) {
    const [imageListShow, setImageListShow] = useState([]);
    // const [data, setData] = useState([]);
    const [indexImage, setIndexImage] = useState(0);
    const [isPropertyInfo, setIsPropertyInfo] = useState(true);
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
    console.log('top5Famous', top5Famous);
    console.log('imageListShow', imageListShow);
    const handleChangeIndex = (index) => {
        setIndexImage(index);
    };
    return (
        <>
            <div className="font-sans text-3xl text-blue-rgb">
                Top 5 Highest Price
            </div>
            <div className="w-full">
                <div className="inline-block w-full h-full ">
                    <div className="w-full h-60vh flex items-stretch justify-between">
                        <div className="w-3/5 ">
                            <img
                                className="w-full h-full object-fill"
                                src={imageListShow[indexImage]}
                            />
                        </div>
                        <div className="w-2/5 ml-4 space-x-4 flex justify-between">
                            <div className="w-full ">
                                <div className="flex justify-around w-full mb-5">
                                    <div
                                        onClick={() => setIsPropertyInfo(true)}
                                        className={`bg-red-rgb cursor-pointer w-1/3 bg-gray200 text-center rounded-lg
                                            ${
                                                isPropertyInfo
                                                    ? 'shadow-[0_50px_25px_-24px_rgb(0,0,0,0.3)] scale-125'
                                                    : ''
                                            }
                                        `}
                                    >
                                        Property
                                    </div>
                                    <div
                                        onClick={() => setIsPropertyInfo(false)}
                                        className={`bg-blue-rgb cursor-pointer w-1/3 bg-gray200 text-center rounded-lg
                                            ${
                                                isPropertyInfo
                                                    ? ''
                                                    : 'shadow-[0_50px_25px_-24px_rgb(0,0,0,0.3)] scale-125'
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
                                                opacity: isPropertyInfo ? 0 : 1,
                                            }}
                                            animate={{
                                                opacity: isPropertyInfo ? 1 : 0,
                                                transition: { duration: 2 },
                                            }}
                                            exit={{ opacity: 0 }}
                                            className="h-full flex-col justify-center items-start text-center text-xl space-y-4 "
                                        >
                                            <div>
                                                <p className="text-3xl font-sans font-semibold">
                                                    {top5Famous.length > 0 &&
                                                        top5Famous[indexImage]
                                                            .property.name}
                                                </p>
                                                <p className="text-gray-500">
                                                    (
                                                    {top5Famous.length > 0 &&
                                                        top5Famous[indexImage]
                                                            .property.category}
                                                    )
                                                </p>
                                            </div>
                                            <div className="flex justify-between items-center px-3">
                                                <p>Quantity</p>
                                                <p className="text-start min-w-1/2">
                                                    {top5Famous.length > 0 &&
                                                        top5Famous[indexImage]
                                                            .property.quantity}
                                                </p>
                                            </div>
                                            <div className="flex justify-between items-center px-3">
                                                <p>Reserve Price</p>
                                                <p className="min-w-1/2 text-start">
                                                    <NumericFormat
                                                        className="title-font font-medium text-red-rgb hover:text-red-rgb hover:scale-125"
                                                        value={
                                                            top5Famous.length >
                                                            0
                                                                ? top5Famous[
                                                                      indexImage
                                                                  ].reservePrice
                                                                : 0
                                                        }
                                                        displayType={'text'}
                                                        thousandSeparator={true}
                                                        allowLeadingZeros
                                                        prefix={'$'}
                                                    />
                                                </p>
                                            </div>
                                            <div className="flex justify-between items-center px-3">
                                                <p>Last Price</p>
                                                <p className="min-w-1/2 text-start">
                                                    <NumericFormat
                                                        className="title-font font-medium text-red-rgb hover:text-red-rgb hover:scale-125"
                                                        value={
                                                            top5Famous.length >
                                                            0
                                                                ? top5Famous[
                                                                      indexImage
                                                                  ].lastPrice
                                                                : 0
                                                        }
                                                        displayType={'text'}
                                                        thousandSeparator={true}
                                                        allowLeadingZeros
                                                        prefix={'$'}
                                                    />
                                                </p>
                                            </div>
                                            <div className="px-3 text-lg italic font-serif">
                                                {top5Famous.length > 0 &&
                                                    top5Famous[indexImage]
                                                        .conditionReport}
                                            </div>
                                        </motion.div>
                                    ) : (
                                        <div className="h-full flex-col justify-center items-start space-y-4 space-x-3">
                                            <div className="flex justify-between items-center px-3">
                                                <p>Day Of Sale</p>
                                                <p className="text-start min-w-1/2">
                                                    {top5Famous.length > 0 &&
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
                                                        className="title-font font-medium text-red-rgb hover:text-red-rgb hover:scale-125"
                                                        value={
                                                            top5Famous.length >
                                                                0 &&
                                                            top5Famous[
                                                                indexImage
                                                            ].priceStep
                                                        }
                                                        displayType={'text'}
                                                        thousandSeparator={true}
                                                        allowLeadingZeros
                                                        prefix={'$'}
                                                    />
                                                </p>
                                            </div>
                                            <div className="flex justify-between items-center px-3">
                                                <p>Attendee</p>
                                                <p className="text-start min-w-1/2">
                                                    {top5Famous.length > 0 &&
                                                        top5Famous[indexImage]
                                                            .countAttendees}
                                                </p>
                                            </div>
                                            <div className="px-3">
                                                <div className="text-center text-gray-400">
                                                    Auctioneer
                                                </div>
                                                <div className="flex justify-between items-center ">
                                                    <div className="w-24">
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
                                                            className="rounded-full w-full"
                                                        />
                                                    </div>
                                                    <p className="text-start min-w-1/2">
                                                        {top5Famous.length >
                                                            0 &&
                                                            top5Famous[
                                                                indexImage
                                                            ].auctioneer.name}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="px-3">
                                                <div className="text-center text-gray-400">
                                                    Winner
                                                </div>
                                                <div className="flex justify-between items-center ">
                                                    <div className="w-24">
                                                        <img
                                                            src={
                                                                top5Famous.length >
                                                                    0 &&
                                                                !!top5Famous[
                                                                    indexImage
                                                                ].winningBidder
                                                                    .avatar
                                                                    ? top5Famous[
                                                                          indexImage
                                                                      ]
                                                                          .winningBidder
                                                                          .avatar
                                                                    : 'https://sbcf.fr/wp-content/uploads/2018/03/sbcf-default-avatar.png'
                                                            }
                                                            className="rounded-full w-full"
                                                        />
                                                    </div>
                                                    <p className="text-start min-w-1/2">
                                                        {top5Famous.length >
                                                            0 &&
                                                            top5Famous[
                                                                indexImage
                                                            ].winningBidder
                                                                .name}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-between items-stretch my-20">
                        {imageListShow.map((image, index) => (
                            <div
                                className={`cursor-pointer w-1/6
                                                        ${
                                                            imageListShow.indexOf(
                                                                image,
                                                            ) === indexImage
                                                                ? 'ring-offset-2 ring-blue-300 ring-2 contrast-125 shadow-[0_50px_25px_-24px_rgb(0,0,0,0.3)] scale-125'
                                                                : 'contrast-50'
                                                        }`}
                                onClick={() =>
                                    handleChangeIndex(
                                        imageListShow.indexOf(image),
                                    )
                                }
                                key={index}
                            >
                                <img
                                    className="w-full h-full object-fill"
                                    src={image}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Top5Famous;
