import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { over } from 'stompjs';
import SockJS from 'sockjs-client';
import { useGetBidRoomWithIdQuery } from '~/app/service/bid.service';
import Loader from '~/Loader';
import { useSelector } from 'react-redux';
import classNames from 'classnames/bind';
import styles from './moduleScss/BidDetailRoom.module.scss';
import Modal from 'react-modal';

import { useGetParticipantWithBidIdQuery } from '~/app/service/participant.service';
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
    const [isClose, setIsClose] = useState(false);
    const { auth } = useSelector((state) => state.auth);
    const [participants, setParticipants] = useState([]);
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
        const fetParticipant = () => {
            setPrice(data.updatePrice || data.reservePrice);
            // eslint-disable-next-line no-unused-vars

            setParticipants([...member]);
        };
        if (participantSuccess && isSuccess && !participants.length) {
            fetParticipant(member);
        }
    }, [stompClient]);

    useEffect(() => {
        if (isClose) {
            Sock.close();
        }
    }, [isClose]);
    const navigate = useNavigate();
    const connect = useCallback(() => {
        // eslint-disable-next-line no-unused-vars
        Sock = new SockJS('http://localhost:8080/api/v1/bid');
        stompClient = over(Sock);
        // eslint-disable-next-line no-undef
        stompClient.connect({}, onConnected, onError);
    });
    const increasePrice = useCallback((increaseAmount) => {
        setPrice((prev) => prev + increaseAmount);
        console.log('price increase');
        console.log(increaseAmount);
    });
    const onMessagePublicReceived = useCallback((payload) => {
        let payloadData = JSON.parse(payload.body);

        // refetch();
        switch (payloadData.status) {
            case 'JOIN':
                if (!(payloadData in participants)) {
                    setParticipants((prev) => [...prev, payloadData]);
                }
                break;
            case 'MESSAGE':
                increasePrice(payloadData.increaseAmount);
                break;
            case 'LEAVE':
                console.log('leave');
                setParticipants((prev) =>
                    prev.filter((p) => p.username !== payloadData.username),
                );
                break;
        }
    });
    const onConnected = useCallback(() => {
        setUserData({ ...userData, connected: true });
        stompClient.subscribe(`/room/${id}`, onMessagePublicReceived);
        userJoin();
    }, [id, stompClient, userData]);
    const onError = useCallback(
        (err) => {
            console.log(err);
            sendCloseSocket();
            navigate('/');
        },
        [id, stompClient, userData],
    );

    const userJoin = useCallback(() => {
        console.log('chuan bi push');
        let chatMessage = {
            senderName: userData.username,
            nickName: userData.nickName ? userData.nickName : null,
            bid: id,
            status: 'JOIN',
        };
        stompClient.send(`/app/room/${id}`, {}, JSON.stringify(chatMessage));
    }, [id, stompClient, userData]);

    const sendValue = useCallback(() => {
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
    }, [id, stompClient, userData]);
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
    }, [id, stompClient, userData]);

    if (isLoading || participantLoading) return <Loader />;
    // if (participantSuccess && isSuccess) fetParticipant();

    const closeModal = () => {
        setIsOpen(false);
    };
    const readyToConnect = () => {
        closeModal();
        connect();
    };

    const handleClose = () => {
        setUserData({
            ...userData,
            nickName: null,
        });
        closeModal();
    };
    return (
        <>
            {userData.connected && participants ? (
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
                        <div>{price}</div>
                        <button onClick={() => sendValue()}>send</button>
                        <button onClick={() => sendCloseSocket()}>Quit</button>
                    </div>
                </div>
            ) : (
                <>
                    <div className={cx('container')} ref={ref}>
                        BidDetailRoom
                    </div>
                    <button onClick={() => setIsOpen(!isOpen)}>Connect</button>
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
                        <button
                            className="btn btn-outline-success"
                            onClick={() => readyToConnect()}
                        >
                            Confirm
                        </button>
                        <button
                            className="btn btn-outline-danger"
                            onClick={() => handleClose()}
                        >
                            Cancel
                        </button>
                    </Modal>
                </>
            )}
        </>
    );
}

export default BidDetailRoom;
