/* eslint-disable no-extra-boolean-cast */
import React from 'react';
import { NumericFormat } from 'react-number-format';
import { DOMAIN_URL } from '~/CONST/const';
import { imageDefault } from '~/assets';
import formatDateTime from '~/utils/formatDateTime';

function BidHome({ bid }) {
    console.log('bid', bid);
    const handlenavigate = () => {
        console.log(bid.id);
    };
    return (
        <div className=" my-4 mx-auto">
            <div>{bid.id}</div>
            <div className="group relative">
                <div
                    className="cursor-pointer "
                    onClick={() => handlenavigate()}
                >
                    <div className="min-h-80 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                        <img
                            src={
                                !!bid.property.imageId
                                    ? `${DOMAIN_URL}api/v1/images/read/${bid.property.imageId}`
                                    : `${imageDefault.logo.default}`
                            }
                            alt={bid.property.name}
                            className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                        />
                    </div>
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
