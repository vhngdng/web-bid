/* eslint-disable no-extra-boolean-cast */
/* eslint-disable no-unused-vars */
import React, { useCallback, useEffect, useRef, useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { over } from 'stompjs';
import SockJS from 'sockjs-client';
import { useGetBidRoomWithIdQuery } from '~/app/service/bid.service';
import Loader from '~/Loader';
import { useSelector } from 'react-redux';
import classNames from 'classnames/bind';
import styles from './moduleScss/BidDetailRoom.module.scss';
import Modal from 'react-modal';
import { motion, useAnimate } from 'framer-motion';

import { useGetParticipantWithBidIdQuery } from '~/app/service/participant.service';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NotificationTimer from '~/notificationTimer';
import { Button } from '@material-tailwind/react';
import UserWinningInBidRoom from './UserWinningInBidRoom';
import { dollar, imageDefault } from '~/assets/images';
import AdminSettingInBidRoom from './AdminSettingInBidRoom';
import { DOMAIN_URL } from '~/CONST/const';

var stompClient = null;
// var Sock = null;
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
    const [Sock, setSock] = useState(null);
    const [isClose, setIsClose] = useState(false);
    const { auth } = useSelector((state) => state.auth);
    const [participants, setParticipants] = useState([]);
    const [userWinning, setUserWinning] = useState({});
    const [isBidClose, setIsBidClose] = useState(false);
    const [bidRoomStatus, setBidRoomStatus] = useState('');
    const [isOpenAdminSetting, setIsOpenAdminSetting] = useState(false);
    const [scope, animate] = useAnimate();
    const { id } = useParams();
    const {
        data: member,
        isLoading: participantLoading,
        isSuccess: participantSuccess,
    } = useGetParticipantWithBidIdQuery(id);
    const { data, isLoading, isSuccess, error } = useGetBidRoomWithIdQuery(id);
    const [price, setPrice] = useState(0);
    const [priceStep, setPriceStep] = useState();
    const [userData, setUserData] = useState({
        username: auth.email,
        nickName: null,
        bidId: null,
        connected: false,
        message: '',
    });
    const ref = useRef();
    const animationRefs = useRef([]);
    const moneyRef = useRef(null);

    useEffect(() => {
        console.log('userWining', userWinning);
    }, [userWinning]);
    useEffect(() => {
        animationRefs.current = animationRefs.current.slice(
            0,
            participants.length,
        );
    }, [participants]);
    useEffect(() => {
        if (isBidClose) {
            navigate('/forbidden');
        }
    }, [isBidClose]);

    useEffect(() => {
        const fetParticipant = () => {
            setPrice(data.updatePrice || data.reservePrice);
            setPriceStep(data.priceStep);
            // eslint-disable-next-line no-unused-vars
            if (!participants.length)
                setParticipants(
                    member.filter((m) => m.username !== userData.username),
                );
            console.log(data);
            if (!!userWinning && data.winningBidder) {
                console.log('winning');
                setUserWinning(data.winningBidder);
            }
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
    }, [bidRoomStatus]);
    useEffect(() => {
        if (isClose) {
            navigate('/bid-room');
            Sock.close();
            setSock(null);
        }
    }, [isClose]);
    useEffect(() => {
        if (Sock) {
            stompClient = over(Sock);
            // eslint-disable-next-line no-undef
            stompClient.connect({}, onConnected, onError);
        }
    }, [Sock]);
    const sendCloseSocket = useCallback(() => {
        let chatMessage = {
            senderName: userData.username,
            nickName: userData.nickName,
            bid: id,
            message: 'test',
            status: 'LEAVE',
        };
        console.log(chatMessage.message);
        stompClient.send(`/app/room/${id}`, {}, JSON.stringify(chatMessage));
        setParticipants([]);
        setIsClose(true);
    }, [Sock]);
    const navigate = useNavigate();
    if (isLoading || participantLoading) return <Loader />;
    if (error && error.status === 404) {
        navigate('/error');
    }
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
        let newSock = new SockJS('https://auctionforfun.site/api/v1/ws');
        // eslint-disable-next-line no-unused-vars
        setSock(newSock);
    };
    const increasePrice = (increaseAmount) => {
        setPrice((prev) => prev + increaseAmount);
    };
    // eslint-disable-next-line no-unused-vars
    const sendFinishBidMessage = () => {
        let bidFinishDetail = {
            id: id,
            status: 'FINISH',
            lastPrice: price,
            winningBidderUsername: userWinning.email || userWinning.username,
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
                if (!(payloadData in participants)) {
                    setParticipants((prev) => [...prev, payloadData]);
                }
                break;
            case 'MESSAGE':
                console.log(payloadData.increaseAmount);
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
            increaseAmount: `${priceStep}`,
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

    if (!!data && !['ACTIVE', 'PROCESSING'].includes(data.status)) {
        return <Navigate to="/forbidden" replace="true" />;
    }
    console.log(data);
    const handleClick = (index) => {
        const x = animationRefs.current[index].getBoundingClientRect().left;
        const y = animationRefs.current[index].getBoundingClientRect().bottom;
        const target = moneyRef.current.getBoundingClientRect();
        let xRef = target.left - x;
        let yRef = target.bottom - y;
        animate(
            animationRefs.current[index],
            {
                x: [0, xRef, 0],
                y: [0, yRef, 0],
                opacity: [0, 1, 0],
            },
            {
                duration: 1,
                repeatType: 'loop',
                ease: [0.17, 0.37, 0.63, 0.77],
            },
        );
    };

    const handleSendValue = () => {
        let index = participants.findIndex(
            (participant) => participant.username === userData.username,
        );
        handleClick(index);
        sendValue();
    };
    console.log('participants', participants);
    console.log('moneyref current', moneyRef.current);
    return (
        <>
            {userData.connected ? (
                <section className="bg-gray-200/25 dark:bg-gray-900">
                    <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-6">
                        <div>
                            <div className="grid gap-8 lg:gap-16 grid-cols-8 ">
                                <div className="flex-1 justify-center items-center col-span-2 border-slate-50 rounded-lg">
                                    <h2 className="text-3xl font-sans">
                                        Auctioneer
                                    </h2>
                                    <div className="my-4 flex justify-center items-center">
                                        <img
                                            className=" object-fit h-40 w-40"
                                            src={
                                                !!data.auctioneer.avatar
                                                    ? data.auctioneer.avatar
                                                    : `https://sbcf.fr/wp-content/uploads/2018/03/sbcf-default-avatar.png`
                                            }
                                            alt="IMG"
                                        />
                                    </div>
                                    <div className="text-2xl font-serif text-green-rgb">
                                        {data.auctioneer.username}
                                    </div>
                                    <div className="cursor-pointer text-sm truncate text-purple-500 hover:text-blue-600">
                                        {data.auctioneer.email}
                                    </div>
                                </div>
                                <div className="relative col-span-4 mx-auto mb-8 max-w-screen-sm lg:mb-16 font-sans">
                                    <h2 className="mb-4  tracking-tight  text-gray-900 dark:text-white">
                                        <h3 className="font-extrabold text-3xl">
                                            {!!data && data.property.name}
                                        </h3>
                                        <span className="font-serif text-2xl">
                                            {' '}
                                            {`(Category: ${
                                                !!data && data.property.category
                                            })`}
                                        </span>
                                    </h2>
                                    <div className="flex justify-center items-center">
                                        <img
                                            className=" object-fit h-40 w-40"
                                            src={
                                                !!data.property.imageId
                                                    ? `http://localhost:8080/api/v1/images/read/${data.property.imageId}`
                                                    : `${imageDefault.logo.default}`
                                            }
                                            alt="IMG"
                                        />
                                    </div>
                                    <div className="">
                                        <h2 className="mt-4 text-red-900 text-2xl">
                                            Price
                                        </h2>
                                        <span
                                            ref={moneyRef}
                                            className="mt-4 text-red-900 text-3xl"
                                        >{`${price}`}</span>
                                    </div>
                                </div>
                                {!!userWinning.username && (
                                    <UserWinningInBidRoom
                                        winner={userWinning}
                                    />
                                )}
                            </div>
                        </div>
                        <div className="mx-auto mb-8 max-w-screen-sm lg:mb-16">
                            {auth.email === data.auctioneer.email && (
                                <Button
                                    onClick={() =>
                                        setIsOpenAdminSetting((prev) => !prev)
                                    }
                                >
                                    Setting
                                </Button>
                            )}
                            {bidRoomStatus === 'PROCESSING' &&
                                auth.email !== data.auctioneer.email && (
                                    <Button onClick={() => handleSendValue()}>
                                        Send
                                    </Button>
                                )}
                            <Button onClick={() => sendCloseSocket()}>
                                Quit
                            </Button>
                        </div>
                        <div className="grid gap-8 lg:gap-16 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                            {participants.map((participant, index) => (
                                <div
                                    key={index}
                                    className="relative text-center text-gray-500 dark:text-gray-400"
                                >
                                    <div
                                        className={`absolute top-0 left-1/2 transform -translate-x-1/2  text-green-600 text-4xl animate-waving-hand
                                        ${
                                            !!userWinning &&
                                            userWinning.username ===
                                                participant.username
                                                ? ''
                                                : 'hidden'
                                        }`}
                                    >
                                        &#128081;
                                    </div>

                                    <motion.img
                                        className="mx-auto mb-4 w-36 h-36 rounded-full"
                                        src={
                                            participant.imageId
                                                ? `http://localhost:8080/api/v1/images/read/${participant.imageId}`
                                                : 'https://sbcf.fr/wp-content/uploads/2018/03/sbcf-default-avatar.png'
                                        }
                                        alt="Avatar"
                                        animate={{
                                            opacity: 1,
                                            y: [0, -150, 0],
                                        }}
                                    />
                                    <h3 className="mb-1 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                        <div
                                            className={`text-gray-600 truncate
                                            ${
                                                userWinning.email ===
                                                    participant.username &&
                                                'animate-bounce'
                                            }
                                            `}
                                        >
                                            {participant.nickName ||
                                                participant.username}
                                        </div>
                                    </h3>

                                    {participant.username ===
                                        data.auctioneer.email && (
                                        <p className="text-red-600 text-xl animate-ping">
                                            Admin
                                        </p>
                                    )}
                                    <div
                                        className="absolute bottom-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-fit h-fit"
                                        // onClick={() => handleClick(index)}
                                    >
                                        <motion.div
                                            ref={(element) =>
                                                (animationRefs.current[index] =
                                                    element)
                                            }
                                            initial={{ opacity: 0 }}
                                        >
                                            <img
                                                src={dollar.logo.default}
                                                className="h-20 w-20 object-cover"
                                            />
                                        </motion.div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            ) : (
                <>
                    <div className="flex justify-center text-center" ref={ref}>
                        <Button onClick={() => setIsOpen(!isOpen)}>
                            Connect
                        </Button>
                    </div>
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
                            autoFocus
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
            <AdminSettingInBidRoom
                isOpen={isOpenAdminSetting}
                auctioneer={data.auctioneer}
            />
            <ToastContainer />
        </>
    );
}

export default BidDetailRoom;
