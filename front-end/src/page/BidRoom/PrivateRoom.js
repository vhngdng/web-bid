import React from 'react';
import { Link } from 'react-router-dom';
import { useGetParticipantWithBidIdQuery } from '~/app/service/participant.service';
import Loader from '~/Loader';
function PrivateRoom({ room, isActive }) {
    console.log(isActive);
    const { data: participant, isLoading } = useGetParticipantWithBidIdQuery(
        room.id,
    );
    const { property, auctioneer } = room;
    if (isLoading) return <Loader />;
    return (
        <>
            <Link to={isActive && `${room.id}`}>
                <div>{property.name}</div>
                <div>{auctioneer.username}</div>
                <h3>
                    participant :{' '}
                    <span>{participant ? participant.length : 0}</span>
                </h3>
            </Link>
        </>
    );
}

export default PrivateRoom;
