import React from 'react';
import { useGetBidRoomQuery } from '~/app/service/bid.service';
import Loader from '~/Loader';
import formatDateTime from '~/utils/formatDateTime';
import { useNavigate } from 'react-router-dom';
function BidRoom() {
    // eslint-disable-nextLine no-unused-vars
    const { data, isLoading, refetch } = useGetBidRoomQuery();
    const navigate = useNavigate();
    // const [active, setActive] = useState(true);
    if (isLoading) return <Loader />;
    console.log(data);
    const handleEnterRoom = (id) => {
        navigate(`${id}`);
    };
    return (
        <>
            <div className="flex justify-end">
                <button
                    type="button"
                    className="rounded-full textWhite bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br  focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium  text-sm px-5 py-2.5 text-center active:animate-bounce transition-all duration-750 ease-in-out "
                    onClick={() => refetch()}
                >
                    Refresh
                </button>
            </div>

            <div className="overflow-x-auto">
                <div className="minW-screen min-h-screen flex items-center justify-center font-sans overflow-hidden">
                    <div className="w-full lg:w-5/6">
                        <div className="bgWhite shadow-md rounded my-6">
                            <table className="minW-max w-full table-auto">
                                <thead>
                                    <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                                        <th className="py-3 px-6 textLeft">
                                            Id
                                        </th>
                                        <th className="py-3 px-6 textLeft">
                                            Auctioneer
                                        </th>
                                        <th className="py-3 px-6 textLeft">
                                            Participants
                                        </th>
                                        <th className="py-3 px-6 text-center">
                                            Time
                                        </th>
                                        <th className="py-3 px-6 text-center">
                                            Reserve Price
                                        </th>
                                        <th className="py-3 px-6 text-center">
                                            Price Step
                                        </th>
                                        <th className="py-3 px-6 text-center">
                                            Lastest Price
                                        </th>
                                        <th className="py-3 px-6 text-center">
                                            Status
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="text-gray-600 text-sm fontLight">
                                    {data &&
                                        data.map((bid, index) => (
                                            <tr
                                                key={index}
                                                className={` border-b border-gray-300 hover:bg-gray-100
                                                ${
                                                    (index + 1) % 2 &&
                                                    'bg-gray-100'
                                                }
                                                ${
                                                    [
                                                        'ACTIVE',
                                                        'PROCESSING',
                                                    ].includes(bid.status)
                                                        ? 'cursor-pointer'
                                                        : 'pointer-events-none'
                                                }
                                                `}
                                                title={bid.conditionReport}
                                                onClick={() =>
                                                    handleEnterRoom(bid.id)
                                                }
                                            >
                                                <td className="py-3 px-6 textLeft whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div className="mr-2 ">
                                                            {bid.id}
                                                        </div>
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
                                                        {bid.attendees.map(
                                                            (
                                                                attendee,
                                                                index,
                                                            ) => (
                                                                <img
                                                                    key={index}
                                                                    className="w-6 h-6 rounded-full border-gray-200 border transform hover:scale-125"
                                                                    src={
                                                                        attendee.imageId
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
                                                    <div className="flex item-center justify-center text-orange-600">
                                                        {bid.priceStep}
                                                    </div>
                                                </td>
                                                <td className="py-3 px-6 text-center">
                                                    <div className="flex item-center justify-center text-blue-800 hover:animate-spin ">
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
                                                                ? 'bg-yellow-200 text-yellow-600'
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
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default BidRoom;
