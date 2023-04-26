import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useGetAllPaymentQuery } from '~/app/service/payment.service';
import Loader from '~/Loader';

function PaymentPage() {
    const { auth } = useSelector((state) => state.auth);
    const { data: payment, isLoading } = useGetAllPaymentQuery();
    const navigate = useNavigate();
    if (isLoading) return <Loader />;
    console.log(payment);
    console.log(auth);

    const handleNavigateDetail = (id) => {
        console.log(id);
        navigate(`bidId/${id}`);
    };
    return (
        <div className="rounded-lg bg-white/30 p-3  my-6">
            <h1 className="flex justify-center">Payment</h1>
            <div className="flex flex-col">
                <div className=" overflow-x-auto sm:mx-6 lg:mx-8">
                    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                        <div className="overflow-hidden">
                            <table className="min-w-full text-left text-sm font-light ">
                                <thead className="border-b font-medium dark:border-neutral-500">
                                    <tr>
                                        <th scope="col" className="px-6 py-4">
                                            #
                                        </th>
                                        <th scope="col" className="px-6 py-4">
                                            Payment Id
                                        </th>
                                        <th scope="col" className="px-6 py-4">
                                            Bid Id
                                        </th>
                                        <th scope="col" className="px-6 py-4">
                                            Auctioneer
                                        </th>
                                        <th scope="col" className="px-6 py-4">
                                            Winner
                                        </th>
                                        <th scope="col" className="px-6 py-4">
                                            Time
                                        </th>
                                        <th scope="col" className="px-6 py-4">
                                            Status
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {payment &&
                                        payment.map((t, index) => (
                                            <tr
                                                key={index}
                                                className="flex-1 border-b transition duration-300 ease-in-out hover:bg-gray-300 dark:hover:bg-gray-600 cursor-pointer"
                                                onClick={() =>
                                                    handleNavigateDetail(t.id)
                                                }
                                            >
                                                <td className="whitespace-nowrap px-6 py-4 font-medium">
                                                    {index + 1}
                                                </td>
                                                <td className="whitespace-nowrap px-6 py-4">
                                                    {t.id}
                                                </td>
                                                <td className="whitespace-nowrap px-6 py-4">
                                                    {t.bidId}
                                                </td>
                                                <td
                                                    className={`whitespace-nowrap px-6 py-4 ${
                                                        t.auctioneerEmail ===
                                                            auth.email &&
                                                        `text-indigo-500`
                                                    }`}
                                                >
                                                    {t.auctioneerEmail}
                                                </td>
                                                <td
                                                    className={`whitespace-nowrap px-6 py-4 ${
                                                        t.winningBidderEmail ===
                                                            auth.email &&
                                                        `text-indigo-500`
                                                    }`}
                                                >
                                                    {t.winningBidderEmail}
                                                </td>
                                                <td className="whitespace-nowrap px-6 py-4">
                                                    {t.createdAt}
                                                </td>
                                                <td
                                                    className={`whitespace-nowrap px-6 py-4 
                                                ${
                                                    t.status === 'SUCCESS'
                                                        ? 'text-green-400'
                                                        : 'text-pink-700'
                                                }`}
                                                >
                                                    {t.status}
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
    );
}

export default PaymentPage;
