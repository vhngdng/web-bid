/* eslint-disable no-extra-boolean-cast */
import { Pagination } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import {
    useGetAllBidRoomPagingQuery,
    useGetBidRoomPrivateQuery,
} from '~/app/service/bid.service';
// eslint-disable-next-line no-unused-vars
import { downBlank, upBlank, upSolid, downSolid } from '~/assets';
// import { upSolid } from '~/assets/images';
import Loader from '~/Loader';
import { imageDefault } from '~/assets';
import { useNavigate } from 'react-router-dom';
import { DOMAIN_URL } from '~/CONST/const';
import { AnimatePresence, motion } from 'framer-motion';
import formatDateTime from '~/utils/formatDateTime';
import { homeSidebarVariants } from '~/animation';
import readImage from '~/utils/readImage';
import { NumericFormat } from 'react-number-format';
function ListBidRoom({ isAdmin }) {
    const [properties, setProperties] = useState([]);
    // eslint-disable-next-line no-unused-vars
    const { data, isLoading, refetch } = isAdmin
        ? useGetAllBidRoomPagingQuery(properties)
        : useGetBidRoomPrivateQuery(properties);
    // eslint-disable-next-line no-unused-vars
    const [page, setPage] = useState(1);
    const [isPropertyASC, setIsPropertyASC] = useState(false);
    const [isPropertyDESC, setIsPropertyDESC] = useState(false);
    const [isTimeASC, setIsTimeASC] = useState(false);
    const [isTimeDESC, setIsTimeDESC] = useState(false);
    const [isReservePriceASC, setIsReservePriceASC] = useState(false);
    const [isReservePriceDESC, setIsReservePriceDESC] = useState(false);
    const [isPriceStepASC, setIsPriceStepASC] = useState(false);
    const [isPriceStepDESC, setIsPriceStepDESC] = useState(false);
    const [isLastPriceASC, setIsLastPriceASC] = useState(false);
    const [isLastPriceDESC, setIsLastPriceDESC] = useState(false);
    const [isStatusASC, setIsStatusASC] = useState(false);
    const [isStatusDESC, setIsStatusDESC] = useState(false);
    const [isSort, setIsSort] = useState(false);
    // eslint-disable-next-line no-unused-vars
    const navigate = useNavigate();
    const [orderList, setOrderList] = useState(new Map());
    const [scrollPosition, setScrollPosition] = useState(0);
    const [order, setOrder] = useState({
        field: '',
        direction: '',
    });
    const handleScroll = useCallback(() => {
        const position = window.pageYOffset;
        setScrollPosition(position);
    }, []);
    // const isInView = useInView(ref, { once: true });
    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [scrollPosition]);
    useEffect(() => {
        if (orderList.size > 1) {
            // let newProperties = properties.push(convertUriWidivOrder());
            setProperties(
                `?${page && `page=${page - 1}&`}sort=${convertUriWidivOrder()}`,
            );
        } else {
            if (page !== 1) {
                setProperties(`?page=${page - 1}`);
            } else {
                setProperties([]);
            }
        }
    }, [orderList, page]);
    useEffect(() => {
        refetch();
    }, [properties]);

    useEffect(() => {
        if (orderList && orderList.get(order.field) === order.direction) {
            console.log(orderList.get(order.field));
            const newOrderList = new Map(orderList);
            newOrderList.delete(order.field);
            setOrderList(new Map(newOrderList));
        } else {
            orderList.set(order.field, order.direction);
            setOrderList(new Map(orderList));
        }
    }, [order]);
    const convertUriWidivOrder = useCallback(() => {
        const dataEntries = Array.from(orderList.entries());
        const dataString = dataEntries.map(([key, value]) => `${key},${value}`);
        return dataString.slice(1).join('&sort=');
    }, [orderList]);
    if (isLoading) return <Loader />;

    console.log('data', data);
    const handleEnterRoom = (id) => {
        // navigate(`${id}`);
        isAdmin ? navigate(`details-bid/${id}`) : navigate(`${id}`);
    };

    return (
        <>
            <section className="my-12">
                <div className="w-full">
                    <div className="flex justify-end">
                        <button
                            className="text-black bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                            onClick={() => setIsSort((prev) => !prev)}
                        >
                            Sort
                        </button>
                        <button
                            type="button"
                            className="text-black bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2"
                            onClick={() => refetch()}
                        >
                            Refresh
                        </button>
                    </div>
                    <motion.div
                        className={`fixed bottom-0 right-0 `}
                        animate={scrollPosition >= 120 ? 'open' : 'collapsed'}
                        variants={homeSidebarVariants}
                        transition={{
                            ease: 'easeInOut',
                            duration: 1,
                        }}
                    >
                        {isSort && (
                            <div className="bg-gray-200/20 flex flex-col justify-between items-center text-black uppercase text-sm leading-normal h-full rounded-tl-lg">
                                <div className="py-3 px-6 textLeft">
                                    <div className="flex items-center justify-center space-x-2">
                                        <div>
                                            <span className="text-center">
                                                Property
                                            </span>
                                        </div>
                                        <div className="flex flex-col justify-center items-center h-24 space-y-1">
                                            <div className="w-4">
                                                <img
                                                    src={
                                                        isPropertyASC
                                                            ? `${upSolid.logo.default}`
                                                            : `${upBlank.logo.default}`
                                                    }
                                                    onClick={() => {
                                                        setIsPropertyASC(
                                                            (prev) => !prev,
                                                        );
                                                        setIsPropertyDESC(
                                                            false,
                                                        );
                                                        setOrder({
                                                            field: 'property.name',
                                                            direction: 'asc',
                                                        });
                                                    }}
                                                    className="w-full object-cover"
                                                />
                                            </div>
                                            <div className="w-4">
                                                <img
                                                    src={
                                                        isPropertyDESC
                                                            ? `${downSolid.logo.default}`
                                                            : `${downBlank.logo.default}`
                                                    }
                                                    onClick={() => {
                                                        setOrder({
                                                            field: 'property.name',
                                                            direction: 'desc',
                                                        }),
                                                            setIsPropertyDESC(
                                                                (prev) => !prev,
                                                            );
                                                        setIsPropertyASC(false);
                                                    }}
                                                    className="w-full object-cover"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="py-3 px-6 text-center">
                                    <div className="flex items-center justify-center space-x-2">
                                        <div>
                                            <span className="text-center">
                                                Time
                                            </span>
                                        </div>
                                        <div className="flex flex-col justify-center items-center h-24 space-y-1">
                                            <div className="w-4">
                                                <img
                                                    src={
                                                        isTimeASC
                                                            ? `${upSolid.logo.default}`
                                                            : `${upBlank.logo.default}`
                                                    }
                                                    onClick={() => {
                                                        setOrder({
                                                            field: 'dayOfSale',
                                                            direction: 'asc',
                                                        });
                                                        setIsTimeASC(
                                                            (prev) => !prev,
                                                        );
                                                        setIsTimeDESC(false);
                                                    }}
                                                    className="w-full object-cover"
                                                />
                                            </div>
                                            <div className="w-4">
                                                <img
                                                    src={
                                                        isTimeDESC
                                                            ? `${downSolid.logo.default}`
                                                            : `${downBlank.logo.default}`
                                                    }
                                                    onClick={() => {
                                                        setOrder({
                                                            field: 'dayOfSale',
                                                            direction: 'desc',
                                                        });
                                                        setIsTimeDESC(
                                                            (prev) => !prev,
                                                        );
                                                        setIsTimeASC(false);
                                                    }}
                                                    className="w-full object-cover"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="py-3 px-6 text-center">
                                    <div className="flex items-center justify-center space-x-2">
                                        <div>
                                            <span className="text-center">
                                                Reserve Price
                                            </span>
                                        </div>
                                        <div className="flex flex-col justify-center items-center h-24 space-y-1">
                                            <div className="w-4">
                                                <img
                                                    src={
                                                        isReservePriceASC
                                                            ? `${upSolid.logo.default}`
                                                            : `${upBlank.logo.default}`
                                                    }
                                                    onClick={() => {
                                                        setOrder({
                                                            field: 'reservePrice',
                                                            direction: 'asc',
                                                        });
                                                        setIsReservePriceASC(
                                                            (prev) => !prev,
                                                        );
                                                        setIsReservePriceDESC(
                                                            false,
                                                        );
                                                    }}
                                                    className="w-full object-cover"
                                                />
                                            </div>
                                            <div className="w-4">
                                                <img
                                                    src={
                                                        isReservePriceDESC
                                                            ? `${downSolid.logo.default}`
                                                            : `${downBlank.logo.default}`
                                                    }
                                                    onClick={() => {
                                                        setOrder({
                                                            field: 'reservePrice',
                                                            direction: 'desc',
                                                        });
                                                        setIsReservePriceDESC(
                                                            (prev) => !prev,
                                                        );
                                                        setIsReservePriceASC(
                                                            false,
                                                        );
                                                    }}
                                                    className="w-full object-cover"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="py-3 px-6 text-center">
                                    <div className="flex items-center justify-center space-x-2">
                                        <div>
                                            <span className="text-center">
                                                Price Step
                                            </span>
                                        </div>
                                        <div>
                                            <div className="flex flex-col justify-center items-center h-24 space-y-1">
                                                <div className="w-4">
                                                    <img
                                                        src={
                                                            isPriceStepASC
                                                                ? `${upSolid.logo.default}`
                                                                : `${upBlank.logo.default}`
                                                        }
                                                        onClick={() => {
                                                            setOrder({
                                                                field: 'priceStep',
                                                                direction:
                                                                    'asc',
                                                            });
                                                            setIsPriceStepASC(
                                                                (prev) => !prev,
                                                            );
                                                            setIsPriceStepDESC(
                                                                false,
                                                            );
                                                        }}
                                                        className="w-full object-cover"
                                                    />
                                                </div>
                                                <div className="w-4">
                                                    <img
                                                        src={
                                                            isPriceStepDESC
                                                                ? `${downSolid.logo.default}`
                                                                : `${downBlank.logo.default}`
                                                        }
                                                        onClick={() => {
                                                            setOrder({
                                                                field: 'priceStep',
                                                                direction:
                                                                    'desc',
                                                            });
                                                            setIsPriceStepDESC(
                                                                (prev) => !prev,
                                                            );
                                                            setIsPriceStepASC(
                                                                false,
                                                            );
                                                        }}
                                                        className="w-full object-cover"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="py-3 px-6 text-center">
                                    <div className="flex items-center justify-center space-x-2">
                                        <div>
                                            <span className="text-center">
                                                Last Price
                                            </span>
                                        </div>
                                        <div className="flex flex-col justify-center items-center h-24 space-y-1">
                                            <div className="w-4">
                                                <img
                                                    src={
                                                        isLastPriceASC
                                                            ? `${upSolid.logo.default}`
                                                            : `${upBlank.logo.default}`
                                                    }
                                                    onClick={() => {
                                                        setOrder({
                                                            field: 'lastPrice',
                                                            direction: 'asc',
                                                        });
                                                        setIsLastPriceASC(
                                                            (prev) => !prev,
                                                        );
                                                        setIsLastPriceDESC(
                                                            false,
                                                        );
                                                    }}
                                                    className="w-full object-cover"
                                                />
                                            </div>
                                            <div className="w-4">
                                                <img
                                                    src={
                                                        isLastPriceDESC
                                                            ? `${downSolid.logo.default}`
                                                            : `${downBlank.logo.default}`
                                                    }
                                                    onClick={() => {
                                                        setOrder({
                                                            field: 'lastPrice',
                                                            direction: 'desc',
                                                        });
                                                        setIsLastPriceDESC(
                                                            (prev) => !prev,
                                                        );
                                                        setIsLastPriceASC(
                                                            false,
                                                        );
                                                    }}
                                                    className="w-full object-cover"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="py-3 px-6 text-center">
                                    <div className="flex items-center justify-center space-x-2">
                                        <div>
                                            <span className="text-center">
                                                Status
                                            </span>
                                        </div>
                                        <div className="flex flex-col justify-center items-center h-24 space-y-1">
                                            <div className="w-4">
                                                <img
                                                    src={
                                                        isStatusASC
                                                            ? `${upSolid.logo.default}`
                                                            : `${upBlank.logo.default}`
                                                    }
                                                    onClick={() => {
                                                        setOrder({
                                                            field: 'status',
                                                            direction: 'asc',
                                                        });
                                                        setIsStatusASC(
                                                            (prev) => !prev,
                                                        );
                                                        setIsStatusDESC(false);
                                                    }}
                                                    width="20"
                                                    height="20"
                                                />
                                            </div>
                                            <div className="w-4">
                                                <img
                                                    src={
                                                        isStatusDESC
                                                            ? `${downSolid.logo.default}`
                                                            : `${downBlank.logo.default}`
                                                    }
                                                    onClick={() => {
                                                        setOrder({
                                                            field: 'status',
                                                            direction: 'desc',
                                                        });
                                                        setIsStatusDESC(
                                                            (prev) => !prev,
                                                        );
                                                        setIsStatusASC(false);
                                                    }}
                                                    className="w-full object-cover"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </motion.div>
                    <div className="rounded-lg w-full ">
                        <section className="rounded-lg">
                            <AnimatePresence mode="wait" initial="false">
                                <div className="w-full ">
                                    <div className="text-gray-700 text-sm font-light rounded-lg bg-white/50">
                                        {data &&
                                            data.content &&
                                            data.content.map((bid, index) => (
                                                <motion.div
                                                    key={index}
                                                    className={`flex h-fit justify-evenly items-center w-full cursor-pointer hover:bg-gray-100 rounded-lg
                                                        ${
                                                            (index + 1) % 2
                                                                ? 'bg-gray-200/25'
                                                                : 'bg-gray-400/25'
                                                        }`}
                                                    onClick={() =>
                                                        handleEnterRoom(bid.id)
                                                    }
                                                    initial={{
                                                        x: -200,
                                                        opacity: 0,
                                                    }}
                                                    animate={{
                                                        opacity: 1,
                                                        x: 0,
                                                        transition: {
                                                            ease: [
                                                                0.25, 0.1, 0.25,
                                                                1.0,
                                                            ],
                                                            duration: 1,
                                                            delay: index / 5,
                                                        },
                                                    }}
                                                >
                                                    <div className="h-full w-1/4">
                                                        <img
                                                            className="object-cover w-full rounded-lg shadow-2xl"
                                                            src={
                                                                !!bid.property
                                                                    .imageId
                                                                    ? `${DOMAIN_URL}api/v1/images/read/${bid.property.imageId}`
                                                                    : imageDefault
                                                                          .logo
                                                                          .default
                                                            }
                                                        />
                                                    </div>
                                                    <div
                                                        className="w-2/3 text-lg space-x-2 py-4"
                                                        title={
                                                            bid.conditionReport
                                                        }
                                                    >
                                                        <div
                                                            className={`px-3 py-6 w-full`}
                                                        >
                                                            <div
                                                                className={`flex items-center justify-center h-full `}
                                                            >
                                                                <div className="text-center">
                                                                    <div className="font-extrabold lg:text-4xl text-2xl text-black">
                                                                        <span>
                                                                            {
                                                                                bid
                                                                                    .property
                                                                                    .name
                                                                            }{' '}
                                                                        </span>
                                                                        <span className="text-gray-500 italic">
                                                                            (
                                                                            {
                                                                                bid
                                                                                    .property
                                                                                    .category
                                                                            }
                                                                            )
                                                                        </span>
                                                                    </div>
                                                                    <div className="">
                                                                        <span>
                                                                            Room:{' '}
                                                                        </span>
                                                                        <span>
                                                                            {
                                                                                bid.id
                                                                            }
                                                                        </span>
                                                                    </div>
                                                                    <div className="text-black flex items-center justify-center w-full space-x-3">
                                                                        <span>
                                                                            Day
                                                                            Of
                                                                            Sale:
                                                                        </span>
                                                                        <span>
                                                                            {!!bid.dayOfSale &&
                                                                                formatDateTime(
                                                                                    bid.dayOfSale,
                                                                                )
                                                                                    .date}
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="flex justify-end">
                                                            <div className="w-1/3 space-y-3 space-x-3">
                                                                <div className="w-full">
                                                                    <div className="text-center">
                                                                        Auctioneer
                                                                    </div>
                                                                    <div className="flex items-center justify-center space-x-3">
                                                                        <div className="w-12 h-12 rounded-full">
                                                                            <img
                                                                                src={
                                                                                    !!bid
                                                                                        .auctioneer
                                                                                        .avatar
                                                                                        ? readImage(
                                                                                              bid
                                                                                                  .auctioneer
                                                                                                  .avatar,
                                                                                          )
                                                                                        : 'https://sbcf.fr/wp-content/uploads/2018/03/sbcf-default-avatar.png'
                                                                                }
                                                                                className="w-full object-cover rounded-full"
                                                                            />
                                                                        </div>
                                                                        <span>
                                                                            {bid
                                                                                .auctioneer
                                                                                .username ||
                                                                                bid
                                                                                    .auctioneer
                                                                                    .email}
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                                <div className="text-center w-full">
                                                                    <div>
                                                                        Attendee
                                                                    </div>
                                                                    <div className="w-full flex items-center justify-center truncate">
                                                                        {!!bid.attendees &&
                                                                            bid.attendees.map(
                                                                                (
                                                                                    attendee,
                                                                                    index,
                                                                                ) => (
                                                                                    <img
                                                                                        key={
                                                                                            index
                                                                                        }
                                                                                        className="object-cover w-6 h-6 rounded-full border-gray-200 border transform hover:scale-125"
                                                                                        src={
                                                                                            !!attendee.avatar
                                                                                                ? readImage(
                                                                                                      attendee.avatar,
                                                                                                  )
                                                                                                : 'https://sbcf.fr/wp-content/uploads/2018/03/sbcf-default-avatar.png'
                                                                                        }
                                                                                        title={
                                                                                            attendee.id
                                                                                        }
                                                                                    />
                                                                                ),
                                                                            )}
                                                                    </div>
                                                                    <div>
                                                                        {!!bid.attendees &&
                                                                            bid
                                                                                .attendees
                                                                                .length}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="w-2/3 flex">
                                                                <div className="pl-3 text-end w-full ">
                                                                    <div className="">
                                                                        Reserve
                                                                        Price:
                                                                    </div>
                                                                    <div className="">
                                                                        Price
                                                                        Step:
                                                                    </div>
                                                                    <div className="">
                                                                        Last
                                                                        Price:
                                                                    </div>
                                                                    <div className="">
                                                                        Status:
                                                                    </div>
                                                                </div>
                                                                <div className="text-center w-full">
                                                                    <NumericFormat
                                                                        className="flex item-center justify-center text-pink-900"
                                                                        value={
                                                                            bid.reservePrice
                                                                        }
                                                                        displayType={
                                                                            'text'
                                                                        }
                                                                        thousandSeparator={
                                                                            true
                                                                        }
                                                                        allowLeadingZeros
                                                                        prefix={
                                                                            '$'
                                                                        }
                                                                    />
                                                                    <NumericFormat
                                                                        className="flex item-center justify-center text-pink-600"
                                                                        value={
                                                                            bid.priceStep
                                                                        }
                                                                        displayType={
                                                                            'text'
                                                                        }
                                                                        thousandSeparator={
                                                                            true
                                                                        }
                                                                        allowLeadingZeros
                                                                        prefix={
                                                                            '$'
                                                                        }
                                                                    />
                                                                    <NumericFormat
                                                                        className="flex item-center justify-center text-blue-600"
                                                                        value={
                                                                            !!bid.lastPrice
                                                                                ? bid.lastPrice
                                                                                : 0
                                                                        }
                                                                        displayType={
                                                                            'text'
                                                                        }
                                                                        thousandSeparator={
                                                                            true
                                                                        }
                                                                        allowLeadingZeros
                                                                        prefix={
                                                                            '$'
                                                                        }
                                                                    />
                                                                    <div
                                                                        className={`${
                                                                            bid.status ===
                                                                                'FINISH' &&
                                                                            'transition-all duration-150 ease-in-out animate-bounce '
                                                                        }`}
                                                                    >
                                                                        <div className="flex items-center justify-center">
                                                                            {bid.status ===
                                                                                'PROCESSING' && (
                                                                                <svg
                                                                                    aria-hidden="true"
                                                                                    className="z-50 w-4 h-4 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                                                                                    viewBox="0 0 100 101"
                                                                                    fill="none"
                                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                                >
                                                                                    <path
                                                                                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                                                                        fill="currentColor"
                                                                                    />
                                                                                    <path
                                                                                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                                                                        fill="currentFill"
                                                                                    />
                                                                                </svg>
                                                                            )}
                                                                            <span
                                                                                className={`py-1 px-3 rounded-full text-xs 
                                                                    ${
                                                                        bid.status ===
                                                                        'ACTIVE'
                                                                            ? 'bg-green-300 text-green-700  transition-all duration-150 ease-in-out animate-pulse'
                                                                            : bid.status ===
                                                                              'DEACTIVE'
                                                                            ? 'bg-red-200 text-red-600'
                                                                            : bid.status ===
                                                                              'FINISH'
                                                                            ? 'bg-lime-rgb text-lime-rgb-600'
                                                                            : bid.status ===
                                                                              'SUCCESS'
                                                                            ? 'bg-purple-200 text-purple-600'
                                                                            : bid.status ===
                                                                              'PROCESSING'
                                                                            ? 'bg-yellow-200 text-yellow-800 relative'
                                                                            : ''
                                                                    }
                                                                    `}
                                                                            >
                                                                                {
                                                                                    bid.status
                                                                                }
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            ))}
                                    </div>
                                </div>
                            </AnimatePresence>
                        </section>
                        {data && !!data.totalPages && (
                            <Pagination
                                className="flex justify-center w-full mt-4 pb-4"
                                count={data.totalPages}
                                onChange={(event, value) => {
                                    setPage(value);
                                }}
                            />
                        )}
                    </div>
                </div>
            </section>
        </>
    );
}

export default ListBidRoom;
