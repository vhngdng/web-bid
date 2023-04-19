/* eslint-disable no-extra-boolean-cast */
import React from 'react';
import { NumericFormat } from 'react-number-format';
import { DOMAIN_URL } from '~/CONST/const';
// import { imageDefault } from '~/assets';
import formatDateTime from '~/utils/formatDateTime';
import Image from '~/assets/images/pikachu.webp';
function BidHome({ bid }) {
    const handlenavigate = () => {
        console.log(bid.id);
    };
    return (
        <div className="w-96 group relative mb-8">
            <div onClick={() => handlenavigate()}>
                <div className="w-full rounded-md bg-transparent group-hover:opacity-75 shadow-[0_50px_25px_-24px_rgb(0,0,0,0.3)]">
                    <img
                        src={
                            !!bid.property.imageId
                                ? `${DOMAIN_URL}api/v1/images/read/${bid.property.imageId}`
                                : Image
                        }
                        alt={bid.property.name}
                        className="w-full rounded-lg"
                    />
                </div>
                <div>
                    <div className="pt-4 flex justify-center items-center">
                        {formatDateTime(bid.dayOfSale).date}
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-2">
                        <div className="grid-span-1 pr-4">
                            <h3 className="text-sm text-gray-700">
                                <div className="text-blue-700">
                                    <span
                                        aria-hidden="true"
                                        className="absolute inset-0"
                                    ></span>
                                    {bid.property.name}
                                </div>
                            </h3>
                            <p className="mt-1 text-sm text-gray-700/90">
                                ({bid.property.category})
                            </p>
                        </div>
                        <div className="grid-span-1 pr-2 ">
                            <p className="text-end text-sm font-medium text-gray-900">
                                <NumericFormat
                                    className=" hover:text-red-rgb hover:scale-125"
                                    value={bid.reservePrice}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    allowLeadingZeros
                                    prefix={'$'}
                                />
                            </p>
                            <p
                                className={`text-sm text-end ${
                                    bid.status === 'ACTIVE'
                                        ? 'text-green-700'
                                        : bid.status === 'DEACTIVE'
                                        ? 'text-red-700'
                                        : 'text-black'
                                }`}
                            >
                                {bid.status}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BidHome;