/* eslint-disable no-extra-boolean-cast */
/* eslint-disable no-unused-vars */
import { Button } from '@material-tailwind/react';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetAllMessageFromSuccessBidQuery } from '~/app/service/message.service';
import {
    useGetPaymentByIdQuery,
    useUpdatePaymentStatusMutation,
} from '~/app/service/payment.service';
import Loader from '~/Loader';
import ErrorPage404 from '~/page/ErrorPage';

function PaymentDetail() {
    const { bidId } = useParams();
    const { auth } = useSelector((state) => state.auth);
    const [updatePaymentStatus] = useUpdatePaymentStatusMutation();
    const {
        data: message,
        isLoading: messageLoading,
        error,
    } = useGetAllMessageFromSuccessBidQuery(bidId);
    const {
        data: payment,
        isLoading,
        isSuccess,
    } = useGetPaymentByIdQuery(bidId);
    const [isAdmin, setIsAdmin] = useState();
    const [status, setStatus] = useState();

    useEffect(() => {
        if (isSuccess) {
            setStatus(payment.status);
        }
    }, [payment]);
    useEffect(() => {
        if (isSuccess) {
            console.log(isSuccess);
            payment.auctioneerEmail === auth.email
                ? setIsAdmin(true)
                : setIsAdmin(false);
        }
    }, [isSuccess]);

    if (isLoading || messageLoading) return <Loader />;
    if (!!error) return <ErrorPage404 />;
    const handlePayment = (bidId) => {
        updatePaymentStatus({
            status: 'FINISH',
            bidId,
        });
        setStatus('FINISH');
    };
    console.log('payment', payment);
    console.log('message', message);

    return (
        <>
            <div className="grid grid-cols-5 border-1 gap-1">
                <div className="flex justify-center my-2 col-span-5 border-slate-50 rounded-lg w-4/5 text-3xl">
                    Payment
                </div>
                <div className="flex justify-center bg-blue-100 col-span-2 border-slate-50 rounded-l-lg">
                    Payment ID
                </div>
                <div className="flex justify-center bg-red-100 col-span-3 border-slate-50 rounded-r-lg">
                    {!!payment && payment.id}
                </div>
                <div className="flex justify-center bg-blue-100 col-span-2 border-slate-50 rounded-l-lg">
                    Bid ID
                </div>
                <div className="flex justify-center bg-red-100 col-span-3 border-slate-50 rounded-r-lg">
                    {!!payment && payment.bidId}
                </div>
                <div className="flex justify-center bg-blue-100 col-span-2 border-slate-50 rounded-l-lg">
                    Created At
                </div>
                <div className="flex justify-center bg-red-100 col-span-3 border-slate-50 rounded-r-lg">
                    {!!payment && payment.createdAt}
                </div>
                <div className="flex justify-center bg-blue-100 col-span-2 border-slate-50 rounded-l-lg">
                    Status
                </div>
                <div
                    className={`flex justify-center bg-red-100 col-span-3 border-slate-50 rounded-r-lg
                    ${status === 'SUCCESS' && 'text-green-500'}
                    `}
                >
                    {!!payment && status}
                </div>
                <div className="flex justify-center bg-blue-100 col-span-2 border-slate-50 rounded-l-lg">
                    Winner
                </div>
                <div className="flex justify-center bg-red-100 col-span-3 border-slate-50 rounded-r-lg">
                    {!!payment && payment.winningBidderEmail}
                </div>
                <h2 className="flex justify-center my-2 col-span-5 border-slate-50 rounded-lg w-4/5 text-3xl ">
                    History
                </h2>
                <div className="flex justify-center bg-white col-span-5 border-slate-50 rounded-lg max-h-60vh">
                    <div className="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
                        <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                            <div className="max-h-60vh">
                                <table className="min-w-full  ">
                                    <thead className="bg-white border-b">
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
                                    <tbody className="">
                                        {!!message &&
                                            message.map((m, index) => (
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
                                                        {m.increaseAmount}
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
                <div className="flex justify-center  col-span-5 border-slate-50 rounded-lg w-4/5 text-3xl my-8">
                    {status !== 'SUCCESS' && status !== 'FINISH' && !!payment
                        ? auth.email === payment.winningBidderEmail && (
                              <Button
                                  onClick={() => handlePayment(payment.bidId)}
                              >
                                  Click to pay
                              </Button>
                          )
                        : auth.email === payment.winningBidderEmail && (
                              <div className="flex-1 justify-center ">
                                  <h2 className="flex justify-center text-green-500 my-2">
                                      Payment successfully completed{' '}
                                  </h2>
                                  <h3 className="flex justify-center text-orange-600 font-bold my-2">
                                      ${!!payment && payment.lastPrice}
                                  </h3>
                              </div>
                          )}
                </div>
            </div>
        </>
    );
}

export default PaymentDetail;
