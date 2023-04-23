/* eslint-disable no-extra-boolean-cast */
import React from 'react';
import BidHome from './BidHome';
import { useNavigate } from 'react-router-dom';
function Top5Earliest({ top5Earliest }) {
    const navigate = useNavigate();
    return (
        <section className="w-full min-h-full shadow-[0_50px_25px_-24px_rgb(0,0,0,0.3)] space-y-5 z-0">
            <div className="flex justify-center items-center min-h-full text-4xl font-sans font-black">
                Opening soon
            </div>
            <div className="w-full ">
                <div className="flex flex-wrap justify-evenly items-strech">
                    {top5Earliest.map((bid, key) => (
                        <BidHome bid={bid} key={key} />
                    ))}
                </div>
            </div>

            <div className="space-y-10 h-24">
                <div className="flex justify-center items-center ">
                    <div
                        onClick={() => navigate('bid-room')}
                        className="h-fit cursor-pointer bg-gray-200/40 hover:bg-blue-400 mt-4 text-blue-400 hover:text-gray-400 rounded-full py-2 px-4 hover:shadow-2xl hover:scale-110 "
                    >
                        See More
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Top5Earliest;
