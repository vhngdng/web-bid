/* eslint-disable no-extra-boolean-cast */
import React, { useEffect, useState } from 'react';
import { NumericFormat } from 'react-number-format';
import { useParams } from 'react-router-dom';
import Loader from '~/Loader';
import { useGetGuestDetailBidWithIdQuery } from '~/app/service/bid.service';
import gaiv3 from '~/assets/images/gaiv3.jpg';
import readImage from '~/utils/readImage';
function BidDetail() {
    const { id } = useParams();
    const { data, isLoading } = useGetGuestDetailBidWithIdQuery(id);
    const [bidDetail, setBidDetail] = useState();

    useEffect(() => {
        if (!!data) {
            setBidDetail(data.bid);
        }
    }, [data]);
    console.log('id param', id);
    console.log('bid detail', bidDetail);
    if (isLoading) return <Loader />;
    return (
        <>
            {!!bidDetail && (
                <div className="w-screen min-h-75vh flex justify-center font-serif">
                    <div className="w-3/4 my-6 space-y-3 bg-white">
                        <div className="w-full flex space-x-3">
                            <div className="w-1/2 bg-transparent shadow-2xl">
                                <img
                                    src={gaiv3}
                                    className="w-full object-cover rounded-lg"
                                />
                            </div>
                            <div className="w-1/2 space-y-5 space-x-5">
                                <div className="text-4xl font-extrabold text-center">
                                    {bidDetail.property.name}
                                </div>
                                <div className="text-2xl text-gray-500 text-center">
                                    ({bidDetail.property.category})
                                </div>
                                <div className="text-2xl text-gray-500 text-center">
                                    <p className="italic">Description</p>
                                    <p className="text-black">
                                        {bidDetail.property.description}
                                    </p>
                                </div>
                                <div className="w-2/3 space-y-5 flex-col justify-center">
                                    <div className="flex text-start w-full space-x-10">
                                        <p className="w-1/2">Day of Sale</p>
                                        <p className="italic w-1/2">
                                            {bidDetail.dayOfSale}
                                        </p>
                                    </div>

                                    <div className="flex text-start justify-center items-center w-full space-x-10">
                                        <p>Reserve Price</p>
                                        <NumericFormat
                                            className=" text-center title-font font-medium lg:text-4xl text-red-500"
                                            value={bidDetail.reservePrice}
                                            displayType={'text'}
                                            thousandSeparator={true}
                                            allowLeadingZeros
                                            prefix={'$'}
                                        />
                                    </div>
                                    <div className="flex text-start justify-center items-center w-full space-x-10">
                                        <p>Price Step:</p>
                                        <NumericFormat
                                            className=" text-center title-font font-medium lg:text-4xl text-red-500"
                                            value={bidDetail.priceStep}
                                            displayType={'text'}
                                            thousandSeparator={true}
                                            allowLeadingZeros
                                            prefix={'$'}
                                        />
                                    </div>
                                    <div className="flex text-start justify-center items-center w-full space-x-10">
                                        <p>Last Price:</p>
                                        <NumericFormat
                                            className=" text-center title-font font-medium lg:text-4xl text-red-500"
                                            value={bidDetail.lastPrice}
                                            displayType={'text'}
                                            thousandSeparator={true}
                                            allowLeadingZeros
                                            prefix={'$'}
                                        />
                                    </div>
                                </div>
                                <div className="text-xl text-gray-500 text-center">
                                    <p className="italic">Auctioneer</p>
                                    <div className="flex text-start justify-center items-center w-full space-x-10">
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
                                        <p className="text-black">
                                            {bidDetail.auctioneer.username}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default BidDetail;
