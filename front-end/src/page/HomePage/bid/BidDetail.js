/* eslint-disable no-extra-boolean-cast */
import React, { useEffect, useState } from 'react';
import { NumericFormat } from 'react-number-format';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '~/Loader';
import { useGetGuestDetailBidWithIdQuery } from '~/app/service/bid.service';
import gaiv3 from '~/assets/images/gaiv3.jpg';
import formatDateTime from '~/utils/formatDateTime';
import readImage from '~/utils/readImage';
function BidDetail() {
    const { id } = useParams();
    const { data, isLoading } = useGetGuestDetailBidWithIdQuery(id);
    const [bidDetail, setBidDetail] = useState();
    const navigate = useNavigate();
    useEffect(() => {
        if (!!data) {
            setBidDetail(data.bid);
        }
    }, [data]);
    console.log('bid detail', bidDetail);
    if (isLoading) return <Loader />;
    return (
        <>
            {!!bidDetail && (
                <div className="w-full min-h-80vh flex justify-center h-full box-border">
                    <div className="w-5/6 my-6 space-y-10">
                        <div className="w-full flex space-x-3">
                            <div className="w-1/3 h-50vh px-3">
                                <img
                                    onClick={() =>
                                        navigate(
                                            `/list-property/${bidDetail.property.id}`,
                                        )
                                    }
                                    src={
                                        !!bidDetail.property.imageId
                                            ? readImage(
                                                  bidDetail.property.imageId,
                                              )
                                            : gaiv3
                                    }
                                    className="cursor-pointer w-full h-full object-cover rounded-lg shadow-2xl"
                                />
                            </div>
                            <div className="w-1/3 space-y-5 px-3">
                                <div className="text-4xl font-extrabold text-center">
                                    {bidDetail.property.name}
                                </div>
                                <div className="text-2xl text-gray-700 text-center">
                                    ({bidDetail.property.category})
                                </div>
                                <div className="text-2xl font-extrabold text-center text-gray-600">
                                    Room Id: #{bidDetail.id}
                                </div>
                                <div className="flex justify-center items-center w-full space-x-10">
                                    <div className="w-full flex">
                                        <div className="w-1/2" />
                                        <div className="w-1/2">Day of Sale</div>
                                    </div>
                                    <div className="w-full">
                                        <p className="italic">
                                            {!!bidDetail.dayOfSale &&
                                                formatDateTime(
                                                    bidDetail.dayOfSale,
                                                ).date}
                                        </p>
                                    </div>
                                </div>
                                <div className="text-2xl text-gray-700 text-center space-y-2">
                                    <p className="italic">Description</p>
                                    <p className="text-black text-base italic">
                                        {!!bidDetail.property.description
                                            ? bidDetail.property.description
                                            : 'No description'}
                                    </p>
                                </div>
                            </div>
                            <div className="w-1/3 space-y-5 flex flex-col justify-center items-center px-3">
                                <div className="w-full space-x-10 flex">
                                    <div className="w-full flex">
                                        <div className="w-1/2">
                                            Reserve Price:
                                        </div>
                                    </div>
                                    <div className="w-full flex">
                                        <NumericFormat
                                            className="title-font font-medium lg:text-4xl text-red-500"
                                            value={bidDetail.reservePrice}
                                            displayType={'text'}
                                            thousandSeparator={true}
                                            allowLeadingZeros
                                            prefix={'$'}
                                        />
                                    </div>
                                </div>
                                <div className="w-full space-x-10 flex">
                                    <div className="w-full flex">
                                        <div className="w-1/2">Price Step:</div>
                                    </div>
                                    <div className="w-full">
                                        <NumericFormat
                                            className="title-font font-medium lg:text-4xl text-red-500"
                                            value={bidDetail.priceStep}
                                            displayType={'text'}
                                            thousandSeparator={true}
                                            allowLeadingZeros
                                            prefix={'$'}
                                        />
                                    </div>
                                </div>
                                <div className="w-full space-x-10 flex">
                                    <div className="w-full flex">
                                        <div className="w-1/2">Last Step:</div>
                                    </div>
                                    <div className="w-full">
                                        <NumericFormat
                                            className="title-font font-medium lg:text-4xl text-red-500"
                                            value={bidDetail.lastPrice}
                                            displayType={'text'}
                                            thousandSeparator={true}
                                            allowLeadingZeros
                                            prefix={'$'}
                                        />
                                    </div>
                                </div>

                                <div className="text-xl text-gray-700">
                                    <p className="italic text-center">
                                        Auctioneer
                                    </p>
                                    <div className="flex justify-center items-center w-full space-x-10">
                                        <div className="w-12">
                                            <img
                                                src={
                                                    !!bidDetail.auctioneer
                                                        .avatar
                                                        ? readImage(
                                                              bidDetail
                                                                  .auctioneer
                                                                  .avatar,
                                                          )
                                                        : 'https://sbcf.fr/wp-content/uploads/2018/03/sbcf-default-avatar.png'
                                                }
                                                className="w-full object-cover rounded-full"
                                            />
                                        </div>
                                        <p className="text-black text-base">
                                            {bidDetail.auctioneer.username}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="text-center">
                            <button
                                onClick={() =>
                                    navigate(`/bid-room/join/${bidDetail.id}`)
                                }
                                className={`shadow-2xl ${
                                    ['ACTIVE', 'PROCESSING'].includes(
                                        bidDetail.status,
                                    )
                                        ? 'px-8 py-3 text-white bg-blue-500 rounded'
                                        : 'px-8 py-3 text-white bg-gray-300 rounded focus:outline-none'
                                }`}
                                disabled={
                                    !['ACTIVE', 'PROCESSING'].includes(
                                        bidDetail.status,
                                    )
                                }
                            >
                                Join room
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default BidDetail;
