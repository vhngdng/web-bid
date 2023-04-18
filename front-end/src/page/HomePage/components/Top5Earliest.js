/* eslint-disable no-extra-boolean-cast */
import React from 'react';
import BidHome from './BidHome';
function Top5Earliest({ top5Earliest }) {
    console.log('top 5', top5Earliest);
    return (
        <>
            <section className="w-full min-h-full my-4 mx-4 px-md shadow-[0_50px_25px_-24px_rgb(0,0,0,0.3)]">
                <div className="flex justify-center items-center  min-h-full py-4 text-4xl font-extrabold">
                    Openning soon
                </div>
                <div className="w-full ">
                    <div className="grid grid-cols-8 md:grid-cols-3 gap-6 md:gap-3">
                        {top5Earliest.map((bid, key) => (
                            <BidHome bid={bid} key={key} />
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}

export default Top5Earliest;
