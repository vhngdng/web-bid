import React, { useCallback, useEffect, useRef, useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { over } from 'stompjs';
import SockJS from 'sockjs-client';
import { useGetBidRoomWithIdQuery } from '~/app/service/bid.service';
import Loader from '~/Loader';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames/bind';
import styles from './moduleScss/BidDetailRoom.module.scss';
import Modal from 'react-modal';

import { useGetParticipantWithBidIdQuery } from '~/app/service/participant.service';
import {
    joinParticipant,
    leaveParticipant,
} from '~/app/slice/participant.slice';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NotificationTimer from '~/notificationTimer';
import { Button } from '@material-tailwind/react';

var stompClient = null;
var Sock = null;
const cx = classNames.bind(styles);
const customStyles = {
    content: {
        top: '30%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

function BidDetailRoom() {
    const [isOpen, setIsOpen] = useState(false);
    // eslint-disable-next-line no-unused-vars
    const dispatch = useDispatch();
    const [isClose, setIsClose] = useState(false);
    const { auth } = useSelector((state) => state.auth);
    const [participants, setParticipants] = useState([]);
    const [userWinning, setUserWinning] = useState({});
    const [isBidClose, setIsBidClose] = useState(false);
    const [bidRoomStatus, setBidRoomStatus] = useState('');
    const { id } = useParams();
    const {
        data: member,
        isLoading: participantLoading,
        isSuccess: participantSuccess,
    } = useGetParticipantWithBidIdQuery(id);
    const { data, isLoading, isSuccess } = useGetBidRoomWithIdQuery(id);
    const [price, setPrice] = useState(0);
    const [userData, setUserData] = useState({
        username: auth.email,
        nickName: null,
        bidId: null,
        connected: false,
        message: '',
    });
    const ref = useRef();
    useEffect(() => {
        if (isBidClose) {
            navigate('/forbidden');
        }
    }, [isBidClose, data]);

    useEffect(() => {
        const fetParticipant = () => {
            setPrice(data.updatePrice || data.reservePrice);
            // if (data.winningBidder.email) {
            //     setUserWinning({
            //         username: data.winningBidder.email,
            //     });
            // }
            // eslint-disable-next-line no-unused-vars
            if (!participants.length)
                setParticipants(
                    member.filter((m) => m.username !== userData.username),
                );
        };
        if (participantSuccess && isSuccess && !participants.length) {
            fetParticipant(member);
        }
    }, [stompClient]);

    const addEventNotiClose = useCallback(() => {
        toast.success(<NotificationTimer timer={Date.now()} />, {
            position: 'top-center',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: undefined,
        });
    }, []);
    useEffect(() => {
        window.addEventListener('beforeunload', sendCloseSocket);
        return () => {
            window.removeEventListener('beforeunload', sendCloseSocket);
        };
    }, []);
    useEffect(() => {
        if (isSuccess) {
            addEventNotiClose();
            setBidRoomStatus(data.status);
        }
    }, [isSuccess]);
    useEffect(() => {
        if (bidRoomStatus === 'FINISH') {
            sendFinishBidMessage();
        }
    }, [price, userWinning, bidRoomStatus]);
    useEffect(() => {
        if (bidRoomStatus === 'FINISH' || isClose) {
            Sock.close();
        }
    }, [isClose, isBidClose, bidRoomStatus]);

    const sendCloseSocket = useCallback(() => {
        let chatMessage = {
            senderName: userData.username,
            nickName: userData.nickName,
            bid: id,
            message: 'test',
            status: 'LEAVE',
        };
        stompClient.send(`/app/room/${id}`, {}, JSON.stringify(chatMessage));
        setParticipants([]);
        console.log(participants);
        setIsClose(true);
    }, []);
    const navigate = useNavigate();
    if (isLoading || participantLoading) return <Loader />;
    // if (participantSuccess && isSuccess) fetParticipant();

    const closeModal = () => {
        setIsOpen(false);
    };
    const readyToConnect = () => {
        closeModal();
        connect();
    };

    const connect = () => {
        // eslint-disable-next-line no-unused-vars
        Sock = new SockJS('http://localhost:8080/api/v1/bid');
        stompClient = over(Sock);
        // eslint-disable-next-line no-undef
        stompClient.connect({}, onConnected, onError);
    };
    const increasePrice = (increaseAmount) => {
        setPrice((prev) => prev + increaseAmount);
    };
    // eslint-disable-next-line no-unused-vars
    const sendFinishBidMessage = () => {
        console.log(userWinning);
        console.log(price);
        let bidFinishDetail = {
            id: id,
            status: 'FINISH',
            lastPrice: price,
            winningBidderUsername: userWinning.username,
            transactionStatus: 'PENDING',
        };
        stompClient.send(
            `/app/finish/room/${id}`,
            {},
            JSON.stringify(bidFinishDetail),
        );
        setIsBidClose(true);
    };
    const onMessagePublicReceived = (payload) => {
        let payloadData = JSON.parse(payload.body);
        // refetch();
        switch (payloadData.status) {
            case 'JOIN':
                dispatch(joinParticipant(payloadData));
                if (!(payloadData in participants)) {
                    setParticipants((prev) => [...prev, payloadData]);
                }
                break;
            case 'MESSAGE':
                increasePrice(payloadData.increaseAmount);
                setUserWinning({
                    nickName: payloadData.nickName,
                    username: payloadData.senderName,
                });
                break;
            case 'LEAVE':
                setParticipants((prev) =>
                    prev.filter((p) => p.username !== payloadData.username),
                );
                dispatch(leaveParticipant(payloadData));
                break;
            case 'DEACTIVE':
                setBidRoomStatus(payloadData.status);
                setIsBidClose(!isBidClose);
                break;
            case 'PROCESSING':
                setBidRoomStatus(payloadData.status);
                break;
            case 'FINISH':
                console.log(price);
                setBidRoomStatus(payloadData.status);
                break;
        }
    };
    const onConnected = () => {
        setUserData({ ...userData, connected: true });
        stompClient.subscribe(`/room/${id}`, onMessagePublicReceived);
        userJoin();
    };
    const onError = (err) => {
        console.log(err);
        sendCloseSocket();
        navigate('/');
    };
    const userJoin = () => {
        let chatMessage = {
            senderName: userData.username,
            nickName: userData.nickName ? userData.nickName : null,
            bid: id,
            status: 'JOIN',
        };
        stompClient.send(`/app/room/${id}`, {}, JSON.stringify(chatMessage));
    };

    const sendValue = () => {
        let chatMessage = {
            senderName: userData.username,
            nickName: userData.nickName,
            receiverName: 'public',
            bid: id,
            message: 'test',
            status: 'MESSAGE',
            increaseAmount: 2000,
        };
        stompClient.send(`/app/room/${id}`, {}, JSON.stringify(chatMessage));
    };

    // eslint-disable-next-line no-unused-vars

    const handleClose = () => {
        setUserData({
            ...userData,
            nickName: null,
        });
        closeModal();
    };

    if (!['ACTIVE', 'PROCESSING'].includes(data.status)) {
        return <Navigate to="/forbidden" replace="true" />;
    }

    return (
        <>
            {userData.connected ? (
                <div className={cx('bid-container')}>
                    <div className={cx('participant-table')}>
                        <ul>
                            {participants.map((participant, index) => (
                                <li key={index}>
                                    {participant.nickName ||
                                        participant.username}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className={cx('bid-socket')}>
                        <div>{data.property.name}</div>
                        <div>
                            <h3>Highest price of this user</h3>
                            <h3>
                                {userWinning.nickName || userWinning.username}
                            </h3>
                        </div>
                        <div>{price}</div>
                        {bidRoomStatus === 'PROCESSING' && (
                            <Button onClick={() => sendValue()}>send</Button>
                        )}
                        <Button onClick={() => sendCloseSocket()}>Quit</Button>
                    </div>
                </div>
            ) : (
                <>
                    <div className={cx('container')} ref={ref}>
                        BidDetailRoom
                    </div>
                    <Button onClick={() => setIsOpen(!isOpen)}>Connect</Button>
                    <Modal
                        isOpen={isOpen}
                        onRequestClose={closeModal}
                        style={customStyles}
                        contentLabel="Category Name"
                        appElement={ref.current}
                    >
                        <h2>Your name</h2>
                        <input
                            type="text"
                            defaultValue={userData.username}
                            onChange={(e) =>
                                setUserData({
                                    ...userData,
                                    nickName: e.target.value,
                                })
                            }
                        />
                        <Button
                            className="btn btn-outline-success"
                            onClick={() => readyToConnect()}
                        >
                            Confirm
                        </Button>
                        <Button
                            className="btn btn-outline-danger"
                            onClick={() => handleClose()}
                        >
                            Cancel
                        </Button>
                    </Modal>
                </>
            )}
            <ToastContainer />
        </>
    );
}

export default BidDetailRoom;
