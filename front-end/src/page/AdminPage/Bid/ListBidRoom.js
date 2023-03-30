/* eslint-disable no-extra-boolean-cast */
import { Pagination } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { useGetAllBidRoomPagingQuery } from '~/app/service/bid.service';
// eslint-disable-next-line no-unused-vars
import { downBlank, upBlank, upSolid, downSolid } from '~/assets/images';
// import { upSolid } from '~/assets/images';
import Loader from '~/Loader';
import formatDateTime from '~/utils/formatDateTime';
import { imageDefault } from '~/assets/images';
function ListBidRoom() {
    const [properties, setProperties] = useState([]);
    const [showSidebar, setShowSideBar] = useState(false);
    // eslint-disable-next-line no-unused-vars
    const { data, isLoading, refetch } =
        useGetAllBidRoomPagingQuery(properties);
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

    const [orderList, setOrdetList] = useState(new Map());
    const [order, setOrder] = useState({
        field: '',
        direction: '',
    });
    useEffect(() => {
        if (orderList.size > 1) {
            // let newProperties = properties.push(convertUriWithOrder());
            setProperties(
                `?${page && `page=${page - 1}&`}sort=${convertUriWithOrder()}`,
            );
        } else {
            setProperties([]);
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
    const handleOpenModal = () => {};
    return (
        <>
            <section className="container mx-auto font-mono mb-8 ">
                <div>
                    <div className="w-fit rounded-lg shadow-lg bg-gray-50/10 ">
                        <section className="max-h-65vh overflow-y-scroll rounded-lg">
                            <table className="w-full table-auto shadow-md ">
                                <thead>
                                    <tr className="bg-green-rgb text-back uppercase text-sm leading-normal ">
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
                                                                    (prev) =>
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
                                                                    (prev) =>
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
                                                                    (prev) =>
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
                                                                    (prev) =>
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
                                                                    (prev) =>
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
                                                                    (prev) =>
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
                                                                    (prev) =>
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
                                                                    (prev) =>
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
                                                                    (prev) =>
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
                                                                    (prev) =>
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
                                                                    (prev) =>
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
                                            <tr
                                                key={index}
                                                className={` border-gray-300 hover:bg-gray-100 
                                                    ${
                                                        (index + 1) % 2 &&
                                                        'bg-gray-100/25'
                                                    }
                                                
                                                    //     [
                                                    //         'ACTIVE',
                                                    //         'PROCESSING',
                                                    //     ].includes(bid.status)
                                                    //         ? 'cursor-pointer'
                                                    //         : 'pointer-events-none'
                                                    // }
                                                    `}
                                                title={bid.conditionReport}
                                            >
                                                <td className="py-3 px-6 textLeft whitespace-nowrap">
                                                    <div
                                                        onClick={() =>
                                                            setShowSideBar(
                                                                (prev) => !prev,
                                                            )
                                                        }
                                                        className="flex items-center cursor-pointer"
                                                    >
                                                        <div className="mr-2 ">
                                                            {bid.id}
                                                        </div>
                                                        <img
                                                            className="object-contain h-10 w-10 mr-2"
                                                            src={
                                                                !!bid.property
                                                                    .imageId
                                                                    ? `http://localhost:8080/api/v1/images/read/${bid.property.imageId}`
                                                                    : imageDefault
                                                                          .logo
                                                                          .default
                                                            }
                                                            onClick={
                                                                handleOpenModal
                                                            }
                                                        />
                                                        <span className="font-medium">
                                                            {bid.property.name}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="py-3 px-6 textLeft">
                                                    <div className="flex items-center">
                                                        <span>
                                                            {bid.auctioneer
                                                                .username ||
                                                                bid.auctioneer
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
                                                                            !!attendee.imageId
                                                                                ? `http://localhost:8080/api/v1/images/read/${attendee.imageId}`
                                                                                : 'https://sbcf.fr/wp-content/uploads/2018/03/sbcf-default-avatar.png'
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
                                                    className={`py-3 px-6 text-center ${
                                                        bid.status ===
                                                            'PROCESSING' &&
                                                        'transition-all duration-150 ease-in-out animate-bounce'
                                                    }`}
                                                >
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
                                                                          'FINISH' ||
                                                                      bid.status ===
                                                                          'SUCCESS'
                                                                    ? 'bg-purple-200 text-purple-600'
                                                                    : bid.status ===
                                                                      'PROCESSING'
                                                                    ? 'bg-yellow-200 text-yellow-800'
                                                                    : ''
                                                            }
                                                            `}
                                                    >
                                                        {bid.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </section>
                        <Pagination
                            className="flex justify-center w-full mt-4 pb-4"
                            count={data.totalPages}
                            onChange={(event, value) => setPage(value)}
                        />
                    </div>
                </div>
            </section>
            <div
                className={`top-0 left-0 w-[20vw] bg-gradient-to-b from-lime-rgb from-0% via-green-rgb via-30% via-blue-rgb via-60% to-pink-rgb to-90%  p-10 pl-20 text-white fixed h-full z-40  ease-in-out duration-300 ${
                    showSidebar ? 'translate-x-0 ' : 'translate-x-full hidden'
                }`}
            >
                <h3 className="mt-20 text-4xl font-semibold text-white">
                    I am a sidebar
                </h3>
            </div>
        </>
    );
}

export default ListBidRoom;
