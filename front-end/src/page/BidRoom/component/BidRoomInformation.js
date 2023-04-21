/* eslint-disable no-extra-boolean-cast */
import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { NumericFormat } from 'react-number-format';
import { DOMAIN_URL } from '~/CONST/const';
import Loader from '~/Loader';
import { useGetAllImageOfPropertyQuery } from '~/app/service/image.service';
import { arrowDownImage, arrowUpImage, imageDefault } from '~/assets';

function BidRoomInformation({
    bidRoomInfo,
    userWinning,
    sendValue,
    sendClose,
    price,
    moneyRef,
    logInEmail,
    controls,
}) {
    // eslint-disable-next-line no-unused-vars
    const [images, setImages] = useState([]);
    const [imageListShow, setImageListShow] = useState([]);
    const [indexImage, setIndexImage] = useState(0);
    const [isOpenImageModal, setIsOpenImageModal] = useState(false);
    const { data, isLoading } = useGetAllImageOfPropertyQuery(
        bidRoomInfo.property.id,
    );
    useEffect(() => {
        !!data && data.length > 0 && setImages([...data]);
    }, [data]);

    useEffect(() => {
        if (images.length > 5) {
            indexImage + 4 > images.length
                ? setImageListShow([
                      ...images.slice(indexImage, images.length),
                      ...images.slice(0, 4 - images.length + indexImage),
                  ])
                : setImageListShow([
                      ...images.slice(indexImage, indexImage + 4),
                  ]);
        } else {
            setImageListShow([...images]);
        }
    }, [indexImage, images]);
    useEffect(() => {
        if (images.length > 0 && images.some((i) => i.type === 'PROPERTY')) {
            setIndexImage(
                images.indexOf(images.find((i) => i.type === 'PROPERTY')),
            );
        }
    }, [images]);

    if (isLoading) return <Loader />;
    console.log('image data', data);
    console.log('data in bid room info', bidRoomInfo);

    const handleChangeIndex = (index) => {
        if (index < 0) {
            setIndexImage(images.length - 1);
        } else if (index > images.length - 1) {
            setIndexImage(0);
        } else {
            setIndexImage(index);
        }
    };
    return (
        <section className="pt-12 pb-12 bg-blueGray-100 rounded-b-10xl overflow-hidden max-w-screen min-w-full">
            <div className="container px-4 mx-auto">
                <div className="flex flex-wrap -mx-4">
                    <div className="w-full lg:w-1/2 px-4 mb-16 lg:mb-0">
                        <div className="relative flex -mx-4 flex items-center justify-between lg:justify-start lg:items-start xl:items-center">
                            <div className="w-full sm:w-auto min-w-max px-4 text-center flex sm:flex-col items-center justify-center">
                                <div
                                    className="cursor-pointer inline-block sm:mb-12 mr-4 sm:mr-0 transform -rotate-90 sm:transform-none hover:text-darkBlueGray-400"
                                    onClick={() =>
                                        handleChangeIndex(indexImage - 1)
                                    }
                                >
                                    <img src={arrowUpImage.logo.default} />
                                </div>
                                <div>
                                    {imageListShow.map((image, index) => (
                                        <div
                                            className={`cursor-pointer h-30 block mb-4 mr-2 sm:mr-0 
                          ${
                              images.indexOf(image) === indexImage
                                  ? 'ring-offset-2 ring-blue-300 ring-2'
                                  : ''
                          }`}
                                            onClick={() =>
                                                handleChangeIndex(
                                                    images.indexOf(image),
                                                )
                                            }
                                            key={index}
                                        >
                                            <img
                                                className="object-cover h-24 w-48"
                                                src={`${DOMAIN_URL}api/v1/images/read/${image.id}`}
                                                alt={bidRoomInfo.property.name}
                                            />
                                        </div>
                                    ))}
                                </div>

                                <div
                                    className="cursor-pointer inline-block transform -rotate-90 sm:transform-none hover:text-darkBlueGray-400"
                                    onClick={() =>
                                        handleChangeIndex(indexImage + 1)
                                    }
                                >
                                    <img src={arrowDownImage.logo.default} />
                                </div>
                            </div>

                            <div className="w-full sm:w-9/12 px-4">
                                <img
                                    className="mb-5 object-fill h-full w-full"
                                    src={
                                        images.length > 0
                                            ? `${DOMAIN_URL}api/v1/images/read/${images[indexImage].id}`
                                            : `${imageDefault.logo.default}`
                                    }
                                    alt=""
                                    ref={moneyRef}
                                />
                                {isOpenImageModal && (
                                    <img
                                        onClick={() =>
                                            setIsOpenImageModal((prev) => !prev)
                                        }
                                        className="bg-transparent px-5 fixed object-cover h-1/2 w-1/2 top-1/3 left-1/3"
                                        src={`${DOMAIN_URL}api/v1/images/read/${images[indexImage].id}`}
                                        key={images[indexImage].id}
                                    />
                                )}

                                <AnimatePresence>
                                    <div className="relative flex justify-center mb-6">
                                        <NumericFormat
                                            className=" text-center title-font font-medium lg:text-6xl text-red-rgb hover:text-red-rgb hover:scale-125"
                                            value={price}
                                            displayType={'text'}
                                            thousandSeparator={true}
                                            allowLeadingZeros
                                            prefix={'$'}
                                        />

                                        <motion.div
                                            className="absolute top-0 right-1/3"
                                            // ref={moneyPingRef}
                                            initial={{ opacity: 0, y: 0 }}
                                            animate={controls}
                                            exit={{ opacity: 0, y: 0 }}
                                            key={bidRoomInfo.priceStep}
                                        >
                                            <NumericFormat
                                                className=" text-center title-font font-medium lg:text-4xl text-red-500"
                                                value={bidRoomInfo.priceStep}
                                                displayType={'text'}
                                                thousandSeparator={true}
                                                allowLeadingZeros
                                                prefix={'$'}
                                            />
                                        </motion.div>
                                    </div>
                                </AnimatePresence>
                            </div>
                        </div>
                        <div className="my-6 p-4">
                            <div className="flex justify-center items-center px-6 py-6">
                                <span className="text-2xl px-4">
                                    Description
                                </span>
                            </div>
                            <div className="h-36">
                                <p className="overflow-y-scroll text-lg text-center text-black">
                                    {!!bidRoomInfo.property.description
                                        ? bidRoomInfo.property.description
                                        : 'No description'}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="w-full lg:w-1/2 px-4">
                        <div className="max-w-4xl mb-6">
                            <div className="">
                                <h2 className=" mt-6 mb-4 text-5xl md:text-7xl lg:text-8xl font-sans font-extrabold hover:text-gray-600 hover:font-sans">
                                    {bidRoomInfo.property.name} (
                                    {bidRoomInfo.property.category})
                                </h2>
                            </div>
                            <h2 className=" mt-6 mb-4 text-3xl md:text-7xl lg:text-6xl text-blue-rgb font-heading font-medium">
                                {bidRoomInfo.property.owner.username}
                            </h2>
                        </div>

                        <div className="flex justify-center items-center mb-10">
                            <p className="w-full px-3 py-2 text-center text-3xl">
                                Quantity:{' '}
                                {!!bidRoomInfo.property.quantity
                                    ? bidRoomInfo.property.quantity
                                    : '1'}
                            </p>
                        </div>
                        <div className="flex justify-center items-center mb-10">
                            <p className="w-full px-3 py-2 text-center text-3xl">
                                Price Step:{' '}
                            </p>
                            <NumericFormat
                                className="w-full px-3 py-2 text-center text-3xl text-red-700"
                                value={bidRoomInfo.priceStep}
                                displayType={'text'}
                                thousandSeparator={true}
                                allowLeadingZeros
                                prefix={'$'}
                            />
                        </div>
                        <div className="flex justify-center items-center mb-10">
                            <p className="w-full px-3 py-2 text-center text-3xl">
                                Reserve Price :{' '}
                            </p>
                            <NumericFormat
                                className="w-full px-3 py-2 text-center text-3xl text-red-rgb"
                                value={bidRoomInfo.reservePrice}
                                displayType={'text'}
                                thousandSeparator={true}
                                allowLeadingZeros
                                prefix={'$'}
                            />
                        </div>
                        <div className="flex justify-center items-center mb-10">
                            Last pay: {userWinning}
                        </div>
                        <div className="flex flex-wrap -mx-2 mb-12">
                            <div className="w-full md:w-2/3 px-2 mb-2 md:mb-0">
                                <div
                                    onClick={
                                        !!bidRoomInfo.auctioneer.email &&
                                        bidRoomInfo.status === 'PROCESSING' &&
                                        logInEmail !==
                                            bidRoomInfo.auctioneer.email
                                            ? sendValue
                                            : null
                                    }
                                    className={`block py-4 px-2 leading-8 font-heading font-medium tracking-tighter text-xl text-white text-center rounded-xl focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
                                            ${
                                                bidRoomInfo.status ===
                                                    'PROCESSING' &&
                                                logInEmail !==
                                                    bidRoomInfo.auctioneer.email
                                                    ? 'cursor-pointer bg-blue-500 hover:bg-blue-600'
                                                    : 'bg-gray-300 hover:bg-gray-500 rounded focus:outline-none pointer-event-none'
                                            }
                                            `}
                                >
                                    Pay
                                </div>
                            </div>
                            <div className="w-full md:w-1/3 px-2">
                                <div
                                    onClick={sendClose}
                                    className="cursor-pointer block py-4 px-2 leading-8 font-heading font-medium tracking-tighter text-xl text-white text-center bg-red-400 focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 hover:bg-red-600 rounded-xl"
                                >
                                    Exit
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default BidRoomInformation;
