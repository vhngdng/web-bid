import React from 'react';
import { useGetBidRoomQuery } from '~/app/service/bid.service';
import Loader from '~/Loader';
import classNames from 'classnames/bind';
import styles from './moduleScss/BidRoom.module.scss';
import PrivateRoom from './PrivateRoom';
const cx = classNames.bind(styles);
function BidRoom() {
    const { data, isLoading, isSuccess } = useGetBidRoomQuery();
    // const [active, setActive] = useState(true);
    if (isLoading) return <Loader />;
    if (isSuccess) console.log(data);
    return (
        <>
            <ul className={cx('container')}>
                {data &&
                    data.map((room, index) => (
                        <li
                            key={index}
                            className={cx(
                                'room',
                                room.status === 'ACTIVE' ? '' : 'disabled-link',
                            )}
                        >
                            <PrivateRoom
                                room={room}
                                isActive={room.status === 'ACTIVE'}
                            />
                        </li>
                    ))}
            </ul>
        </>
    );
}

export default BidRoom;
