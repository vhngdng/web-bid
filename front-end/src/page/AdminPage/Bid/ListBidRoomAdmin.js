import React from 'react';
import ListBidRoom from '~/page/DefaultListBidRoom/ListBidRoom';

function ListBidRoomAdmin() {
    return (
        <div className="rounded-lg mb-8">
            <div className="max-h-full w-70vw">
                <ListBidRoom isAdmin={true} />
            </div>
        </div>
    );
}

export default ListBidRoomAdmin;
