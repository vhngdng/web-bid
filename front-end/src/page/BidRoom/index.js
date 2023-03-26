import React from 'react';
import { useGetBidRoomQuery } from '~/app/service/bid.service';
import Loader from '~/Loader';
import classNames from 'classnames/bind';
import styles from './moduleScss/BidRoom.module.scss';
import PrivateRoom from './PrivateRoom';
import { Button } from '@material-tailwind/react';
const cx = classNames.bind(styles);
function BidRoom() {
    // eslint-disable-next-line no-unused-vars
    const { data, isLoading, isSuccess, refetch } = useGetBidRoomQuery();

    // const [active, setActive] = useState(true);

    if (isLoading) return <Loader />;
    return (
        <>
            <ul className={cx('container')}>
                {data &&
                    data.map((room, index) => (
                        <li
                            key={index}
                            className={cx(
                                'room',
                                ['ACTIVE', 'PROCESSING'].includes(room.status)
                                    ? ''
                                    : 'disabled-link',
                            )}
                        >
                            <PrivateRoom
                                room={room}
                                isActive={['ACTIVE', 'PROCESSING'].includes(
                                    room.status,
                                )}
                            />
                        </li>
                    ))}
            </ul>
            <Button onClick={() => refetch()}>Refresh</Button>
        </>
    );
}

export default BidRoom;
