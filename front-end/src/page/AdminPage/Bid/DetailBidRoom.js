/* eslint-disable no-extra-boolean-cast */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { Modal } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { toast } from 'react-toastify';
import {
    useGetDetailBidWithIdQuery,
    useGetRequestToChangeBidSuccessQuery,
    useUpdateSuccessBidMutation,
} from '~/app/service/bid.service';
import { imageDefault } from '~/assets/images';
import Loader from '~/Loader';
import ErrorPage404 from '~/page/ErrorPage';
import UserModal from './UserModal';

function DetailBidRoom() {
    const { bidId } = useParams();
    const { data, isLoading, isSuccess, error } = useGetDetailBidWithIdQuery(
        bidId,
        {
            onError: (err) => {
                if (err.status === 404) {
                    navigate('/error');
                }
            },
        },
    );
    const [isOpen, setIsOpen] = useState(false);
    const [bid, setBid] = useState();
    const [messages, setMessages] = useState();
    const [userId, setUserId] = useState(null);
    let tableRef = useRef(null);
    const navigate = useNavigate();
    useEffect(() => {
        if (isSuccess) {
            if (!!data.bid) {
                setBid(data.bid);
            }
            if (!!data.messages) {
                setMessages(data.messages);
            }
        }
    }, [data]);
    if (isLoading) return <Loader />;
    if (error) {
        return <div>Error: {error.message}</div>;
    }
    const handleShowAttendeeInfo = (id) => {
        setUserId(id);
        setIsOpen((prev) => !prev);
    };
    return (
        <div ref={tableRef}>
            <div className="max-h-full overflow-y-hidden">
                <div className="flex-1 justify-center items-center">
                    <h2 className="flex justify-center my-2 col-span-5 border-slate-50 rounded-lg w-4/5 text-3xl">
                        Bid
                    </h2>
                    {bid && (
                        <div className="grid grid-cols-5 border-1 gap-1">
                            <div className="flex justify-center bg-blue-100 col-span-2 border-slate-50 rounded-l-lg">
                                Bid ID
                            </div>
                            <div className="flex justify-center bg-red-100 col-span-3 border-slate-50 rounded-r-lg">
                                {bid.id}
                            </div>
                            <div className="flex items-center justify-center bg-blue-100 col-span-2 border-slate-50 rounded-l-lg">
                                Auctioneer
                            </div>
                            <div className=" bg-red-100 col-span-3 border-slate-50 rounded-r-lg">
                                <div className="flex justify-center">
                                    ID: {bid.auctioneer.id} &nbsp;
                                </div>
                                <div className="flex justify-center">
                                    Username:{' '}
                                    {!!bid.auctioneer.username &&
                                        bid.auctioneer.username}{' '}
                                    &nbsp;
                                </div>
                                <div className="cursor-pointer text-blue-rgb flex justify-center hover:text-blue-500">
                                    {bid.auctioneer.email}
                                </div>
                            </div>
                            <div className="flex items-center justify-center bg-blue-100 col-span-2 border-slate-50 rounded-l-lg">
                                Attendee
                            </div>
                            <div className=" bg-red-100 col-span-3 border-slate-50 rounded-r-lg">
                                <div className="grid grid-cols-3 border-1 gap-1">
                                    {!!bid.attendees &&
                                        bid.attendees.map((attendee, index) => (
                                            <div
                                                key={index}
                                                className="flex-1 justify-center items center"
                                            >
                                                <div
                                                    className="flex justify-center items center"
                                                    onClick={() =>
                                                        handleShowAttendeeInfo(
                                                            attendee.id,
                                                        )
                                                    }
                                                >
                                                    <img
                                                        key={index}
                                                        className="w-10 h-10 object-fit rounded-full border-gray-200 border transform hover:scale-125"
                                                        src={
                                                            attendee.avatar
                                                                ? attendee.avatar
                                                                : 'https://sbcf.fr/wp-content/uploads/2018/03/sbcf-default-avatar.png'
                                                        }
                                                    />
                                                </div>
                                                <span className="flex justify-center items center">
                                                    ID: {attendee.id}
                                                </span>
                                            </div>
                                        ))}
                                </div>
                            </div>
                            <div className="flex-1 bg-blue-100 col-span-2 border-slate-50 rounded-l-lg">
                                <span className="flex justify-center items center">
                                    Property
                                </span>
                                <div className="flex justify-center">
                                    <img
                                        className="object-fit h-10 w-10"
                                        src={
                                            !!bid.property.imageId
                                                ? `${DOMAIN_URL}api/v1/images/read/${bid.property.imageId}`
                                                : `${imageDefault.logo.default}`
                                        }
                                        alt="IMG"
                                    />
                                </div>
                            </div>
                            <div className=" bg-red-100 col-span-3 border-slate-50 rounded-r-lg">
                                <div className="flex justify-center">
                                    ID: {bid.property.id} &nbsp;
                                </div>
                                <div className="flex justify-center">
                                    Name:{' '}
                                    {!!bid.property.name && bid.property.name}{' '}
                                    &nbsp;
                                </div>
                                <div className="flex justify-center">
                                    Category:{' '}
                                    {!!bid.property && bid.property.category}{' '}
                                    &nbsp;
                                </div>
                            </div>
                            <div className="flex justify-center items-center bg-blue-100 col-span-2 border-slate-50 rounded-l-lg">
                                Transaction
                            </div>

                            <div className=" bg-red-100 col-span-3 border-slate-50 rounded-r-lg">
                                {!!bid && bid.transaction && (
                                    <>
                                        <div className="flex justify-center">
                                            ID: {bid.transaction.id} &nbsp;
                                        </div>
                                        <div>
                                            <div className="flex justify-center">
                                                Created At:
                                            </div>{' '}
                                            <div className="flex justify-center">
                                                {bid.transaction.createdAt}
                                            </div>
                                        </div>
                                        <div className="flex justify-center">
                                            <div className="mr-2">Status:</div>
                                            <div
                                                className={`flex justify-center bg-red-100 col-span-3 border-slate-50 rounded-r-lg
                        ${
                            bid.transaction.status === 'SUCCESS' &&
                            'text-green-500'
                        }
                        `}
                                            >
                                                {bid.transaction.status}
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                            <div className="flex justify-center bg-blue-100 col-span-2 border-slate-50 rounded-l-lg">
                                Condition Report
                            </div>
                            <div className="flex justify-center bg-red-100 col-span-3 border-slate-50 rounded-r-lg">
                                {bid.conditionReport}
                            </div>
                            <div className="flex justify-center bg-blue-100 col-span-2 border-slate-50 rounded-l-lg">
                                dayOfSale
                            </div>
                            <div className="flex justify-center bg-red-100 col-span-3 border-slate-50 rounded-r-lg">
                                {bid.dayOfSale}
                            </div>
                            <div className="flex justify-center bg-blue-100 col-span-2 border-slate-50 rounded-l-lg">
                                Reserve Price
                            </div>
                            <div className="flex justify-center bg-red-100 col-span-3 border-slate-50 rounded-r-lg">
                                {bid.reservePrice}
                            </div>
                            <div className="flex justify-center bg-blue-100 col-span-2 border-slate-50 rounded-l-lg">
                                Price Step
                            </div>
                            <div className="flex justify-center bg-red-100 col-span-3 border-slate-50 rounded-r-lg">
                                {bid.priceStep}
                            </div>
                            <div className="flex justify-center bg-blue-100 col-span-2 border-slate-50 rounded-l-lg">
                                Last Price
                            </div>
                            <div className="flex justify-center bg-red-100 col-span-3 border-slate-50 rounded-r-lg">
                                {!!bid.lastPrice && bid.lastPrice}
                            </div>
                        </div>
                    )}
                </div>

                <div className="flex-1 justify-center items-center">
                    <div className="grid grid-cols-5 border-1 gap-1">
                        <h2 className="flex justify-center my-2 col-span-5 border-slate-50 rounded-lg w-4/5 text-3xl ">
                            History
                        </h2>
                        <div className="flex justify-center bg-gray-200 col-span-5 border-slate-50 rounded-lg max-h-60vh">
                            <div className="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
                                <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                                    <div className="max-h-60vh">
                                        <table className="min-w-full  ">
                                            <thead className="border-b ">
                                                <tr>
                                                    <th
                                                        scope="col"
                                                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                                                    >
                                                        #
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                                                    >
                                                        Status
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                                                    >
                                                        Increase Amount
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                                                    >
                                                        Sender Name
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                                                    >
                                                        Time At
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="overflow-y-scroll">
                                                {!!messages &&
                                                    messages.map((m, index) => (
                                                        <tr
                                                            key={index}
                                                            className={`border-b ${
                                                                (index + 1) % 2
                                                                    ? 'bg-gray-100'
                                                                    : 'bg-white'
                                                            }`}
                                                        >
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                                {index + 1}
                                                            </td>
                                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                                {m.status}
                                                            </td>
                                                            <td className="flex justify-center text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                                {
                                                                    m.increaseAmount
                                                                }
                                                            </td>
                                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                                {m.senderName}
                                                            </td>
                                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                                {m.createdAt}
                                                            </td>
                                                        </tr>
                                                    ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <UserModal
                    open={isOpen}
                    setIsOpen={setIsOpen}
                    userId={userId}
                    appElement={tableRef}
                    setUserId={setUserId}
                />
            </div>
        </div>
    );
}

export default DetailBidRoom;
