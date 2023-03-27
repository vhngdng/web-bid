/* eslint-disable no-unused-vars */
import { Button } from '@material-tailwind/react';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetAllMessageFromSuccessBidQuery } from '~/app/service/message.service';
import {
    useGetTransactionByIdQuery,
    useUpdateTransactionStatusMutation,
} from '~/app/service/transaction.service';
import Loader from '~/Loader';

function TransactionDetail() {
    const { bidId } = useParams();
    const { auth } = useSelector((state) => state.auth);
    const [updateTransactionStatus] = useUpdateTransactionStatusMutation();
    const { data: message, isLoading: messageLoading } =
        useGetAllMessageFromSuccessBidQuery(bidId);
    const navigate = useNavigate();
    const {
        data: transaction,
        isLoading,
        isSuccess,
    } = useGetTransactionByIdQuery(bidId);
    const [isAdmin, setIsAdmin] = useState();
    const [status, setStatus] = useState();

    useEffect(() => {
        if (isSuccess) {
            setStatus(transaction.status);
        }
    }, [transaction]);

    useEffect(() => {
        if (isSuccess) {
            console.log(isSuccess);
            transaction.auctioneerEmail === auth.email
                ? setIsAdmin(true)
                : setIsAdmin(false);
        }
        // else {
        //     navigate('/profile-detail/transaction');
        // }
    }, [isSuccess]);
    console.log('bidId', bidId);
    if (isLoading || messageLoading) return <Loader />;
    console.log(transaction);
    console.log('is admin', isAdmin);
    console.log(message);
    const handlePayment = (bidId) => {
        updateTransactionStatus({
            status: 'SUCCESS',
            bidId,
        });
        setStatus('SUCCESS');
    };
    return (
        <>
            <div className="grid grid-cols-5 border-1 gap-1">
                <div className="flex justify-center my-2 col-span-5 border-slate-50 rounded-lg w-4/5 text-3xl">
                    Transaction
                </div>
                <div className="flex justify-center bg-blue-100 col-span-2 border-slate-50 rounded-l-lg">
                    Transaction ID
                </div>
                <div className="flex justify-center bg-red-100 col-span-3 border-slate-50 rounded-r-lg">
                    {transaction.id}
                </div>
                <div className="flex justify-center bg-blue-100 col-span-2 border-slate-50 rounded-l-lg">
                    Bid ID
                </div>
                <div className="flex justify-center bg-red-100 col-span-3 border-slate-50 rounded-r-lg">
                    {transaction.bidId}
                </div>
                <div className="flex justify-center bg-blue-100 col-span-2 border-slate-50 rounded-l-lg">
                    Created At
                </div>
                <div className="flex justify-center bg-red-100 col-span-3 border-slate-50 rounded-r-lg">
                    {transaction.createdAt}
                </div>
                <div className="flex justify-center bg-blue-100 col-span-2 border-slate-50 rounded-l-lg">
                    Status
                </div>
                <div
                    className={`flex justify-center bg-red-100 col-span-3 border-slate-50 rounded-r-lg
                    ${status === 'SUCCESS' && 'text-green-500'}
                    `}
                >
                    {status}
                </div>
                <div className="flex justify-center bg-blue-100 col-span-2 border-slate-50 rounded-l-lg">
                    Winner
                </div>
                <div className="flex justify-center bg-red-100 col-span-3 border-slate-50 rounded-r-lg">
                    {transaction.winningBidderEmail}
                </div>
                <h2 className="flex justify-center my-2 col-span-5 border-slate-50 rounded-lg w-4/5 text-3xl ">
                    History
                </h2>
                <div className="flex justify-center bg-white col-span-5 border-slate-50 rounded-lg overflow-y-scroll max-h-80">
                    <div className="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
                        <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                            <div className="overflow-hidden">
                                <table className="min-w-full">
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
                                    <tbody>
                                        {message.map((m, index) => (
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
                    {status !== 'SUCCESS'
                        ? auth.email === transaction.winningBidderEmail && (
                              <Button
                                  onClick={() =>
                                      handlePayment(transaction.bidId)
                                  }
                              >
                                  Click to pay
                              </Button>
                          )
                        : auth.email === transaction.winningBidderEmail && (
                              <div className="flex-1 justify-center ">
                                  <h2 className="flex justify-center text-green-500 my-2">
                                      Payment successfully completed{' '}
                                  </h2>
                                  <h3 className="flex justify-center text-orange-600 font-bold my-2">
                                      ${transaction.lastPrice}
                                  </h3>
                              </div>
                          )}
                </div>
            </div>
        </>
    );
}

export default TransactionDetail;
