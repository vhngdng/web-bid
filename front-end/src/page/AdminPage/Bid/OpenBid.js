import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import {
    useGetAllBidPreparingToRunQuery,
    useRunBidRoomMutation,
    useUpdateStatusBidMutation,
} from '~/app/service/bid.service';
import Loader from '~/Loader';

function OpenBid() {
    const { data, isLoading, isSuccess, refetch } =
        useGetAllBidPreparingToRunQuery();
    const [runBidRoom] = useRunBidRoomMutation();
    const [updateStatusBid] = useUpdateStatusBidMutation();
    useEffect(() => {
        refetch();
    }, [useLocation()]);
    if (isLoading) return <Loader />;
    console.log(data);

    const handleRunBid = async (id) => {
        console.log(data);
        await runBidRoom(id)
            .unwrap()
            .then(() => {
                toast.success('Bid is openning successfully', {
                    position: 'bottom-right',
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: undefined,
                });
            })
            .then(() => {
                refetch();
            })
            .catch((err) => toast.err(err), {
                position: 'bottom-right',
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: undefined,
            });
    };
    const handleUpdate = (id) => {
        updateStatusBid({
            id,
            status: 'ACTIVE',
            dayOfSale: new Date(),
        });
    };
    return (
        <>
            <div className="roounded-lg bg-white/30 my-6">
                <table className="table-fixed border-collapse border-spacing-2 border border-slate-400 bg-transparent box-sizing: border-box shadow-xl">
                    <thead>
                        <tr className="">
                            <th className="border border-slate-300 p-3">
                                Bid id
                            </th>
                            <th className="border border-slate-300 p-3">
                                Auctioneer
                            </th>
                            <th className="border border-slate-300 p-3">
                                Day of Sale
                            </th>
                            <th className="border border-slate-300 p-3">
                                Reserve Price
                            </th>
                            <th className="border border-slate-300 p-3">
                                Price Step
                            </th>
                            <th className="border border-slate-300 p-3">
                                Type
                            </th>
                            <th className="border border-slate-300 p-3">
                                Property Id
                            </th>
                            <th className="border border-slate-300 p-3">
                                Property Name
                            </th>
                            <th className="border border-slate-300 p-3">
                                Owner Name
                            </th>
                            <th className="border border-slate-300 p-3">
                                Active
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {isSuccess &&
                            data &&
                            data.map((bid, index) => (
                                <tr key={index}>
                                    <td className="border border-slate-300 text-center px-3">
                                        {bid.id}
                                    </td>
                                    <td className="border border-slate-300 text-center px-3">
                                        {bid.auctioneer.username ||
                                            bid.auctioneer.email}
                                    </td>
                                    <td className="border border-slate-300 text-center px-3">
                                        {bid.dayOfSale}
                                    </td>
                                    <td className="border border-slate-300 text-center px-3">
                                        {bid.reservePrice}
                                    </td>
                                    <td className="border border-slate-300 text-center px-3">
                                        {' '}
                                        {bid.priceStep}
                                    </td>
                                    <td className="border border-slate-300 text-center px-3">
                                        {' '}
                                        {bid.type}
                                    </td>
                                    <td className="border border-slate-300 text-center px-3">
                                        {' '}
                                        {bid.property.id}
                                    </td>
                                    <td className="border border-slate-300 text-center px-3">
                                        {' '}
                                        {bid.property.name}
                                    </td>
                                    <td className="border border-slate-300 text-center px-3">
                                        {' '}
                                        {bid.property.owner.username ||
                                            bid.property.owner.email}
                                    </td>
                                    <td className="border border-slate-300 text-center px-3">
                                        {!bid.status ? (
                                            <button
                                                type="button"
                                                className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                                onClick={() =>
                                                    handleRunBid(bid.id)
                                                }
                                            >
                                                Auto run
                                            </button>
                                        ) : (
                                            <button
                                                type="button"
                                                className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                                                onClick={() =>
                                                    handleUpdate(bid.id)
                                                }
                                            >
                                                Run manually
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
            <ToastContainer />
        </>
    );
}

export default OpenBid;
