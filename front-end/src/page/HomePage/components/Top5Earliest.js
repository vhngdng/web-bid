/* eslint-disable no-extra-boolean-cast */
import React from 'react';
import BidHome from './BidHome';
function Top5Earliest({ top5Earliest }) {
    console.log('top 5', top5Earliest);
    return (
        <section className="w-full min-h-full shadow-[0_50px_25px_-24px_rgb(0,0,0,0.3)] space-y-5">
            <div className="flex justify-center items-center min-h-full text-4xl font-sans font-black">
                Openning soon
            </div>
            <div className="w-full ">
                <div className="flex flex-wrap justify-evenly items-strech">
                    {top5Earliest.map((bid, key) => (
                        <BidHome bid={bid} key={key} />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Top5Earliest;
