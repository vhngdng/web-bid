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
import { arrowDropdown, imageDefault } from '~/assets';
import Loader from '~/Loader';
import ErrorPage404 from '~/page/ErrorPage';
import UserModal from './Modal/UserModal';
import { DOMAIN_URL } from '~/CONST/const';
import { useUpdateStatusBidMutation } from '~/app/service/bid.service';
import { motion, useAnimate } from 'framer-motion';

const statusBid = ['DEACTIVE', 'ACTIVE', 'FINISH', 'PROCESSING'];
function DetailBidRoom() {
    const { bidId } = useParams();
    const [updateStatusBid] = useUpdateStatusBidMutation();
    const [listStatus, setListStatus] = useState(statusBid);
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
    const [scope, animate] = useAnimate();
    const [isShowStatus, setIsShowStatus] = useState(false);
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
            setListStatus(statusBid.filter((s) => s !== data.bid.status));
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

    const handleChangeStatus = (status) => {
        console.log(status);
        updateStatusBid({
            id: data.bid.id,
            status,
        })
            .unwrap()
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
    };
    console.log(data);
    const showVariants = {
        close: { opacity: 0, scale: 0.3 },
        open: {
            opacity: 1,
            scale: 1,
            transition: { type: 'spring', duration: 1 },
        },
    };
    return (
        <div className="static p-3 my-6" ref={tableRef}>
            <div className=" max-h-full ">
                <div className="flex-1 justify-center items-center">
                    <h2 className="flex justify-center my-2 col-span-5 border-slate-50 rounded-lg w-4/5 text-3xl">
                        Bid
                    </h2>
                    {bid && (
                        <div className=" grid grid-cols-5 border-1 gap-1">
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
                                Payment
                            </div>

                            <div className=" bg-red-100 col-span-3 border-slate-50 rounded-r-lg">
                                {!!bid && bid.Payment && (
                                    <>
                                        <div className="flex justify-center">
                                            ID: {bid.Payment.id} &nbsp;
                                        </div>
                                        <div>
                                            <div className="flex justify-center">
                                                Created At:
                                            </div>{' '}
                                            <div className="flex justify-center">
                                                {bid.Payment.createdAt}
                                            </div>
                                        </div>
                                        <div className="flex justify-center">
                                            <div className="mr-2">Status:</div>
                                            <div
                                                className={`flex justify-center bg-red-100 col-span-3 border-slate-50 rounded-r-lg
                        ${bid.payment.status === 'SUCCESS' && 'text-green-500'}
                        `}
                                            >
                                                {bid.Payment.status}
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
                            <div className="flex justify-center bg-blue-100 col-span-2 border-slate-50 rounded-l-lg">
                                Status
                            </div>
                            <div className=" flex justify-center bg-red-100 col-span-3 border-slate-50 rounded-r-lg">
                                <div className="relative">
                                    <button
                                        className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center "
                                        type="button"
                                        onClick={() =>
                                            setIsShowStatus((prev) => !prev)
                                        }
                                    >
                                        {bid.status}
                                        <img
                                            className={`h-4 w-4 ml-2  ${
                                                isShowStatus
                                                    ? ''
                                                    : 'transform rotate-180'
                                            }`}
                                            src={arrowDropdown.logo.default}
                                        />
                                    </button>
                                    <div className="absolute top-0 left-full translate-x-full sm:right-0 sm:translate-x-0  mt-1 rounded absolute z-10 w-fit">
                                        <motion.ul
                                            variants={showVariants}
                                            animate={
                                                isShowStatus ? 'open' : 'close'
                                            }
                                            className={` list-none overflow-x-visible rounded ${
                                                isShowStatus ? '' : 'hidden'
                                            }`}
                                        >
                                            {listStatus.map((status, index) => (
                                                <motion.li
                                                    whileHover={{ scale: 1.2 }}
                                                    className=" rounded shadow-lg"
                                                    key={index}
                                                    onClick={() =>
                                                        handleChangeStatus(
                                                            status,
                                                        )
                                                    }
                                                >
                                                    <a
                                                        href=""
                                                        className="flex py-2 px-2 transition duration-300 bg-gray-100/20 text-red-700"
                                                    >
                                                        {status}
                                                    </a>
                                                </motion.li>
                                            ))}
                                        </motion.ul>
                                    </div>
                                </div>
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
