import { Button } from '@material-tailwind/react';
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import {
    useGetAllBidPreparingToRunQuery,
    useRunBidRoomMutation,
} from '~/app/service/bid.service';
import Loader from '~/Loader';

function OpenBid() {
    const { data, isLoading, isSuccess, refetch } =
        useGetAllBidPreparingToRunQuery();
    const [runBidRoom] = useRunBidRoomMutation();
    useEffect(() => {
        refetch();
    }, [useLocation()]);
    console.log(data);
    if (isLoading) return <Loader />;

    const handleRunBid = async (id) => {
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
    return (
        <>
            <table className="rounded-lg table-fixed border-collapse border-spacing-2 border border-slate-400 bg-white-700 box-sizing: border-box shadow-xl">
                <thead>
                    <tr className="">
                        <th className="border border-slate-300 ">Bid id</th>
                        <th className="border border-slate-300">Auctioneer</th>
                        <th className="border border-slate-300">Day of Sale</th>
                        <th className="border border-slate-300">
                            Reserve Price
                        </th>
                        <th className="border border-slate-300">Price Step</th>
                        <th className="border border-slate-300">Type</th>
                        <th className="border border-slate-300">Property Id</th>
                        <th className="border border-slate-300">
                            Property Name
                        </th>
                        <th className="border border-slate-300">Owner Name</th>
                        <th className="border border-slate-300">Active</th>
                    </tr>
                </thead>
                <tbody>
                    {isSuccess &&
                        data &&
                        data.map((bid, index) => (
                            <tr key={index}>
                                <td className="border border-slate-300 text-center px-1">
                                    {bid.id}
                                </td>
                                <td className="border border-slate-300 text-center px-1">
                                    {bid.auctioneer.username ||
                                        bid.auctioneer.email}
                                </td>
                                <td className="border border-slate-300 text-center px-1">
                                    {bid.dayOfSale}
                                </td>
                                <td className="border border-slate-300 text-center px-1">
                                    {bid.reservePrice}
                                </td>
                                <td className="border border-slate-300 text-center px-1">
                                    {' '}
                                    {bid.priceStep}
                                </td>
                                <td className="border border-slate-300 text-center px-1">
                                    {' '}
                                    {bid.type}
                                </td>
                                <td className="border border-slate-300 text-center px-1">
                                    {' '}
                                    {bid.property.id}
                                </td>
                                <td className="border border-slate-300 text-center px-1">
                                    {' '}
                                    {bid.property.name}
                                </td>
                                <td className="border border-slate-300 text-center px-1">
                                    {' '}
                                    {bid.property.owner.username ||
                                        bid.property.owner.email}
                                </td>
                                <td className="border border-slate-300 text-center px-1">
                                    <Button
                                        onClick={() => handleRunBid(bid.id)}
                                    >
                                        Run
                                    </Button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
            <ToastContainer />
        </>
    );
}

export default OpenBid;
