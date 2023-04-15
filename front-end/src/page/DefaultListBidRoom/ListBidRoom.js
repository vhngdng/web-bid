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
import formatDateTime from '~/utils/formatDateTime';
import { imageDefault } from '~/assets';
import { useNavigate } from 'react-router-dom';
import { DOMAIN_URL } from '~/CONST/const';
import { AnimatePresence, motion } from 'framer-motion';
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
    // eslint-disable-next-line no-unused-vars
    const navigate = useNavigate();
    const [orderList, setOrdetList] = useState(new Map());
    const [order, setOrder] = useState({
        field: '',
        direction: '',
    });
    // const isInView = useInView(ref, { once: true });

    useEffect(() => {
        if (orderList.size > 1) {
            // let newProperties = properties.push(convertUriWithOrder());
            setProperties(
                `?${page && `page=${page - 1}&`}sort=${convertUriWithOrder()}`,
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
            setOrdetList(new Map(newOrderList));
        } else {
            orderList.set(order.field, order.direction);
            setOrdetList(new Map(orderList));
        }
    }, [order]);
    const convertUriWithOrder = useCallback(() => {
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
            <section className="container mx-auto font-mono my-12">
                <div>
                    <div className="flex justify-end">
                        <button
                            type="button"
                            className="rounded-full text-black bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 active:animate-bounce transition-all duration-750 ease-in-out "
                            onClick={() => refetch()}
                        >
                            Refresh
                        </button>
                    </div>
                    <div className="w-fit rounded-lg shadow-lg bg-gray-50/10 ">
                        <section className="max-h-65vh overflow-y-scroll rounded-lg">
                            <AnimatePresence mode="wait" initial="false">
                                <table className="w-full table-auto shadow-md">
                                    <thead>
                                        <tr className="bg-green-rgb text-black uppercase text-sm leading-normal ">
                                            <th className="py-3 px-6 textLeft">
                                                <div className="flex">
                                                    <span className="flex items-center justify-center">
                                                        Property
                                                    </span>
                                                    <div className="content-center">
                                                        <div className="py-1">
                                                            <img
                                                                src={
                                                                    isPropertyASC
                                                                        ? `${upSolid.logo.default}`
                                                                        : `${upBlank.logo.default}`
                                                                }
                                                                onClick={() => {
                                                                    setIsPropertyASC(
                                                                        (
                                                                            prev,
                                                                        ) =>
                                                                            !prev,
                                                                    );
                                                                    setIsPropertyDESC(
                                                                        false,
                                                                    );
                                                                    setOrder({
                                                                        field: 'property.name',
                                                                        direction:
                                                                            'asc',
                                                                    });
                                                                }}
                                                                width="20"
                                                                height="20"
                                                            />
                                                        </div>
                                                        <div>
                                                            <img
                                                                src={
                                                                    isPropertyDESC
                                                                        ? `${downSolid.logo.default}`
                                                                        : `${downBlank.logo.default}`
                                                                }
                                                                width="20"
                                                                height="20"
                                                                onClick={() => {
                                                                    setOrder({
                                                                        field: 'property.name',
                                                                        direction:
                                                                            'desc',
                                                                    }),
                                                                        setIsPropertyDESC(
                                                                            (
                                                                                prev,
                                                                            ) =>
                                                                                !prev,
                                                                        );
                                                                    setIsPropertyASC(
                                                                        false,
                                                                    );
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </th>
                                            <th className="py-3 px-6 textLeft">
                                                Auctioneer
                                            </th>
                                            <th className="py-3 px-6 textLeft">
                                                Participants
                                            </th>
                                            <th className="py-3 px-6 text-center">
                                                <div className="flex">
                                                    <span className="flex items-center justify-center">
                                                        Time
                                                    </span>
                                                    <div className="content-center">
                                                        <div className="py-1">
                                                            <img
                                                                src={
                                                                    isTimeASC
                                                                        ? `${upSolid.logo.default}`
                                                                        : `${upBlank.logo.default}`
                                                                }
                                                                onClick={() => {
                                                                    setOrder({
                                                                        field: 'dayOfSale',
                                                                        direction:
                                                                            'asc',
                                                                    });
                                                                    setIsTimeASC(
                                                                        (
                                                                            prev,
                                                                        ) =>
                                                                            !prev,
                                                                    );
                                                                    setIsTimeDESC(
                                                                        false,
                                                                    );
                                                                }}
                                                                width="20"
                                                                height="20"
                                                            />
                                                        </div>
                                                        <div>
                                                            <img
                                                                src={
                                                                    isTimeDESC
                                                                        ? `${downSolid.logo.default}`
                                                                        : `${downBlank.logo.default}`
                                                                }
                                                                onClick={() => {
                                                                    setOrder({
                                                                        field: 'dayOfSale',
                                                                        direction:
                                                                            'desc',
                                                                    });
                                                                    setIsTimeDESC(
                                                                        (
                                                                            prev,
                                                                        ) =>
                                                                            !prev,
                                                                    );
                                                                    setIsTimeASC(
                                                                        false,
                                                                    );
                                                                }}
                                                                width="20"
                                                                height="20"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </th>
                                            <th className="py-3 px-6 text-center">
                                                <div className="flex">
                                                    <span className="flex items-center justify-center">
                                                        Reserve Price
                                                    </span>
                                                    <div className="">
                                                        <div className="py-1">
                                                            <img
                                                                src={
                                                                    isReservePriceASC
                                                                        ? `${upSolid.logo.default}`
                                                                        : `${upBlank.logo.default}`
                                                                }
                                                                onClick={() => {
                                                                    setOrder({
                                                                        field: 'reservePrice',
                                                                        direction:
                                                                            'asc',
                                                                    });
                                                                    setIsReservePriceASC(
                                                                        (
                                                                            prev,
                                                                        ) =>
                                                                            !prev,
                                                                    );
                                                                    setIsReservePriceDESC(
                                                                        false,
                                                                    );
                                                                }}
                                                                width="20"
                                                                height="20"
                                                            />
                                                        </div>
                                                        <div>
                                                            <img
                                                                src={
                                                                    isReservePriceDESC
                                                                        ? `${downSolid.logo.default}`
                                                                        : `${downBlank.logo.default}`
                                                                }
                                                                onClick={() => {
                                                                    setOrder({
                                                                        field: 'reservePrice',
                                                                        direction:
                                                                            'desc',
                                                                    });
                                                                    setIsReservePriceDESC(
                                                                        (
                                                                            prev,
                                                                        ) =>
                                                                            !prev,
                                                                    );
                                                                    setIsReservePriceASC(
                                                                        false,
                                                                    );
                                                                }}
                                                                width="20"
                                                                height="20"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </th>
                                            <th className="py-3 px-6 text-center">
                                                <div className="flex justify-center">
                                                    <span className="flex items-center justify-center">
                                                        Price Step
                                                    </span>
                                                    <div>
                                                        <div className="py-1">
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
                                                                        (
                                                                            prev,
                                                                        ) =>
                                                                            !prev,
                                                                    );
                                                                    setIsPriceStepDESC(
                                                                        false,
                                                                    );
                                                                }}
                                                                width="20"
                                                                height="20"
                                                            />
                                                        </div>
                                                        <div>
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
                                                                        (
                                                                            prev,
                                                                        ) =>
                                                                            !prev,
                                                                    );
                                                                    setIsPriceStepASC(
                                                                        false,
                                                                    );
                                                                }}
                                                                width="20"
                                                                height="20"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </th>
                                            <th className="py-3 px-6 text-center">
                                                <div>
                                                    <span className="flex items-center justify-center">
                                                        Last Price
                                                    </span>
                                                    <div className="flex space-x-1 justify-center items-center m-auto">
                                                        <div className="py-1 ">
                                                            <img
                                                                src={
                                                                    isLastPriceASC
                                                                        ? `${upSolid.logo.default}`
                                                                        : `${upBlank.logo.default}`
                                                                }
                                                                onClick={() => {
                                                                    setOrder({
                                                                        field: 'lastPrice',
                                                                        direction:
                                                                            'asc',
                                                                    });
                                                                    setIsLastPriceASC(
                                                                        (
                                                                            prev,
                                                                        ) =>
                                                                            !prev,
                                                                    );
                                                                    setIsLastPriceDESC(
                                                                        false,
                                                                    );
                                                                }}
                                                                width="20"
                                                                height="20"
                                                            />
                                                        </div>
                                                        <div>
                                                            <img
                                                                src={
                                                                    isLastPriceDESC
                                                                        ? `${downSolid.logo.default}`
                                                                        : `${downBlank.logo.default}`
                                                                }
                                                                onClick={() => {
                                                                    setOrder({
                                                                        field: 'lastPrice',
                                                                        direction:
                                                                            'desc',
                                                                    });
                                                                    setIsLastPriceDESC(
                                                                        (
                                                                            prev,
                                                                        ) =>
                                                                            !prev,
                                                                    );
                                                                    setIsLastPriceASC(
                                                                        false,
                                                                    );
                                                                }}
                                                                width="20"
                                                                height="20"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </th>
                                            <th className="py-3 px-6 text-center">
                                                <div className="flex">
                                                    <span className="flex items-center justify-center">
                                                        Status
                                                    </span>
                                                    <div className="content-center">
                                                        <div className="py-1">
                                                            <img
                                                                src={
                                                                    isStatusASC
                                                                        ? `${upSolid.logo.default}`
                                                                        : `${upBlank.logo.default}`
                                                                }
                                                                onClick={() => {
                                                                    setOrder({
                                                                        field: 'status',
                                                                        direction:
                                                                            'asc',
                                                                    });
                                                                    setIsStatusASC(
                                                                        (
                                                                            prev,
                                                                        ) =>
                                                                            !prev,
                                                                    );
                                                                    setIsStatusDESC(
                                                                        false,
                                                                    );
                                                                }}
                                                                width="20"
                                                                height="20"
                                                            />
                                                        </div>
                                                        <div>
                                                            <img
                                                                src={
                                                                    isStatusDESC
                                                                        ? `${downSolid.logo.default}`
                                                                        : `${downBlank.logo.default}`
                                                                }
                                                                onClick={() => {
                                                                    setOrder({
                                                                        field: 'status',
                                                                        direction:
                                                                            'desc',
                                                                    });
                                                                    setIsStatusDESC(
                                                                        (
                                                                            prev,
                                                                        ) =>
                                                                            !prev,
                                                                    );
                                                                    setIsStatusASC(
                                                                        false,
                                                                    );
                                                                }}
                                                                width="20"
                                                                height="20"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-gray-700 text-sm fontLight ">
                                        {data &&
                                            data.content &&
                                            data.content.map((bid, index) => (
                                                <motion.tr
                                                    key={index}
                                                    className={`cursor-pointer border-gray-300 hover:bg-gray-100 
                                                        ${
                                                            (index + 1) % 2 &&
                                                            'bg-gray-100/25'
                                                        }
                                                        ${
                                                            !!isAdmin
                                                                ? 'cursor-pointer'
                                                                : [
                                                                      'ACTIVE',
                                                                      'PROCESSING',
                                                                  ].includes(
                                                                      bid.status,
                                                                  )
                                                                ? 'cursor-pointer'
                                                                : 'pointer-events-none'
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
                                                    <td
                                                        className={`py-3 px-6 textLeft whitespace-nowrap `}
                                                    >
                                                        <div
                                                            className={`flex items-center 
                                                            
                                                            `}
                                                            title={
                                                                bid.conditionReport
                                                            }
                                                        >
                                                            <div className="mr-2 ">
                                                                {bid.id}
                                                            </div>
                                                            <img
                                                                className="object-contain h-10 w-10 mr-2"
                                                                src={
                                                                    !!bid
                                                                        .property
                                                                        .imageId
                                                                        ? `${DOMAIN_URL}api/v1/images/read/${bid.property.imageId}`
                                                                        : imageDefault
                                                                              .logo
                                                                              .default
                                                                }
                                                            />
                                                            <span className="font-medium">
                                                                {
                                                                    bid.property
                                                                        .name
                                                                }
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className="py-3 px-6 textLeft">
                                                        <div className="flex items-center">
                                                            <span>
                                                                {bid.auctioneer
                                                                    .username ||
                                                                    bid
                                                                        .auctioneer
                                                                        .email}
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className="py-3 px-6 text-center">
                                                        <div className="flex items-center justify-center">
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
                                                                            className="w-6 h-6 rounded-full border-gray-200 border transform hover:scale-125"
                                                                            src={
                                                                                !!attendee.avatar
                                                                                    ? attendee.avatar
                                                                                    : 'https://sbcf.fr/wp-content/uploads/2018/03/sbcf-default-avatar.png'
                                                                            }
                                                                            title={
                                                                                attendee.id
                                                                            }
                                                                        />
                                                                    ),
                                                                )}
                                                        </div>
                                                    </td>
                                                    <td className="py-3 px-6 text-center">
                                                        <div className="flex item-center justify-center">
                                                            {
                                                                formatDateTime(
                                                                    bid.dayOfSale,
                                                                ).date
                                                            }
                                                        </div>
                                                    </td>
                                                    <td className="py-3 px-6 text-center">
                                                        <div className="flex item-center justify-center text-pink-900">
                                                            {bid.reservePrice}
                                                        </div>
                                                    </td>
                                                    <td className="py-3 px-6 text-center">
                                                        <div className="flex item-center justify-center text-pink-600">
                                                            {bid.priceStep}
                                                        </div>
                                                    </td>
                                                    <td className="py-3 px-6 text-center">
                                                        <div className="flex item-center justify-center text-blue-800 ">
                                                            {!!bid.lastPrice &&
                                                                bid.lastPrice}
                                                        </div>
                                                    </td>
                                                    <td
                                                        className={`py-3 px-6 text-center relative ${
                                                            bid.status ===
                                                                'FINISH' &&
                                                            'transition-all duration-150 ease-in-out animate-bounce '
                                                        }`}
                                                    >
                                                        <div className="flex items-center">
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
                                                                {bid.status}
                                                            </span>
                                                        </div>
                                                    </td>
                                                </motion.tr>
                                            ))}
                                    </tbody>
                                </table>
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
