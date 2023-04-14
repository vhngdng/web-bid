import React from 'react';

import ListBidRoom from '../DefaultListBidRoom/ListBidRoom';
function BidRoom() {
    // eslint-disable-nextLine no-unused-vars

    return (
        <>
            <div className="w-fit rounded-lg mx-auto font-mono mb-8  ">
                <div className="w-fit max-h-full ">
                    <div className="w-fit rounded-lg ">
                        <ListBidRoom />
                    </div>
                </div>
            </div>
        </>
    );
}

export default BidRoom;
