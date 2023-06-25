/* eslint-disable no-extra-boolean-cast */
import React from 'react';
import { NumericFormat } from 'react-number-format';
import { DOMAIN_URL } from '~/CONST/const';
// import { imageDefault } from '~/assets';
import formatDateTime from '~/utils/formatDateTime';
import Image from '~/assets/images/pikachu.webp';
import { useNavigate } from 'react-router-dom';
function BidHome({ bid }) {
    const navigate = useNavigate();
    const handlenavigate = () => {
        navigate(`bid-room/${bid.id}`);
    };
    return (
        <div className="w-96 group relative mb-8 shadow-xl">
            <div className="w-full px-4 py-4 bg-[rgb(182,207,201)] rounded-t-lg h-full hover:ring hover:ring-[rgb(182,207,201)] hover:ring-offset-0">
                <div className="w-full rounded-md bg-transparent group-hover:opacity-75 shadow-[0_50px_25px_-24px_rgb(0,0,0,0.3)]">
                    <div className="w-full h-30vh" onClick={handlenavigate}>
                        <img
                            src={
                                !!bid.property.imageProperty
                                    ? `${DOMAIN_URL}api/v1/images/read/${bid.property.imageProperty}`
                                    : Image
                            }
                            alt={bid.property.name}
                            className="w-full h-full object-cover object-center rounded-lg cursor-pointer z-0"
                        />
                    </div>
                </div>
                <div>
                    <div className="pt-4 flex justify-center items-center">
                        {!!bid.dayOfSale && formatDateTime(bid.dayOfSale).date}
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-2">
                        <div className="grid-span-1 pr-4">
                            <h3 className="text-sm text-gray-700">
                                <div className="text-blue-700">
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
                                        : 'text-orange-700'
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
