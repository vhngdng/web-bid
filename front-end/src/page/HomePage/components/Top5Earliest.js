/* eslint-disable no-extra-boolean-cast */
import React from 'react';
import BidHome from './BidHome';
import { useNavigate } from 'react-router-dom';
import trippleArrow from '~/assets/images/triple-right-arrow.webp';
function Top5Earliest({ top5Earliest }) {
    const navigate = useNavigate();
    return (
        <section className="w-full min-h-full space-y-10 z-0">
            <div className="flex items-center w-full mx-5vw space-x-4">
                <span className="underline underline-offset-auto text-3xl">
                    Opening soon
                </span>
                <div className="h-4 w-4 bg-transparent">
                    <img src={trippleArrow} className="object-fill w-full" />
                </div>
                <div
                    className="text-2xl text-gray-600 cursor-pointer hover:text-blue-500 italic hover:not-italic"
                    onClick={() => navigate('bid-room')}
                >
                    See more
                </div>
            </div>
            <div className="w-full my-5">
                <div className="flex flex-wrap justify-evenly items-strech mx-auto">
                    {top5Earliest.map((bid, key) => (
                        <BidHome bid={bid} key={key} />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Top5Earliest;
