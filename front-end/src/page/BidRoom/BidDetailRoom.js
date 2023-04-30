/* eslint-disable no-extra-boolean-cast */
/* eslint-disable no-unused-vars */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { over } from 'stompjs';
import SockJS from 'sockjs-client';
import { useGetBidRoomWithIdQuery } from '~/app/service/bid.service';
import Loader from '~/Loader';
import { useSelector } from 'react-redux';
import classNames from 'classnames/bind';
import styles from './moduleScss/BidDetailRoom.module.scss';
import Modal from 'react-modal';
import {
    AnimatePresence,
    motion,
    useAnimate,
    useAnimationControls,
    useMotionValue,
    useTransform,
} from 'framer-motion';

import { useGetParticipantWithBidIdQuery } from '~/app/service/participant.service';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NotificationTimer from '~/notificationTimer';
import { Button } from '@material-tailwind/react';
import { dollar, imageDefault } from '~/assets';
import AdminSettingInBidRoom from './AdminSettingInBidRoom';
import { DOMAIN_URL } from '~/CONST/const';
import { ProSidebarProvider } from 'react-pro-sidebar';
import BidDetailSideBar from './component/BidDetailSideBar';
import BidRoomInformation from './component/BidRoomInformation';
import BidDetail from '../HomePage/bid/BidDetail';
import readImage from '~/utils/readImage';

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
    const [isAdmin, setIsAdmin] = useState(false);
    const [scope, animate] = useAnimate();
    const [message, setMessage] = useState();
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
    const moneyPingRef = useRef(null);
    const controls = useAnimationControls();

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
        toast.success(
            <NotificationTimer
                timer={Date.now()}
                message="The bid is successfully closed"
            />,
            {
                position: 'top-center',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: undefined,
            },
        );
    }, []);
    const handleReceiveMessage = () => {
        switch (message.status) {
            case 'JOIN':
                if (!(message in participants)) {
                    console.log('roi vao day');
                    setParticipants((prev) => [...prev, message]);
                }
                break;
            case 'MESSAGE':
                console.log(message.increaseAmount);
                increasePrice(message.increaseAmount);
                setUserWinning({
                    nickName: message.nickName,
                    username: message.senderName,
                });
                break;
            case 'LEAVE':
                setParticipants((prev) =>
                    prev.filter((p) => p.username !== message.username),
                );
                break;
            case 'DEACTIVE':
                setBidRoomStatus(message.status);
                setIsBidClose(!isBidClose);
                break;
            case 'PROCESSING':
                setBidRoomStatus(message.status);
                break;
            case 'FINISH':
                console.log(price);
                setBidRoomStatus(message.status);
                break;
        }
    };
    useEffect(() => {
        window.addEventListener('beforeunload', sendCloseSocket);
        return () => {
            window.removeEventListener('beforeunload', sendCloseSocket);
        };
    }, []);
    useEffect(() => {
        if (!!message) {
            handleReceiveMessage();
        }
    }, [message]);
    useEffect(() => {
        if (isSuccess) {
            addEventNotiClose();
            setBidRoomStatus(data.status);
        }
        !!data && auth.email === data.auctioneer.email && setIsAdmin(true);
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
        let newSock = new SockJS(DOMAIN_URL + 'api/v1/ws', undefined, {
            // eslint-disable-next-line no-undef
            transports: ['xhr-polling', 'xdr-polling', 'jsonp-polling'],
        });
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
        setMessage(payloadData);
        // refetch();
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

    const handleSendValue = () => {
        let index = participants.findIndex(
            (participant) => participant.username === userData.username,
        );
        sendValue();
        controls.start({
            y: [-50, 0],
            scale: [1.25, 1],
            opacity: [1, 0],
            transition: {
                duration: 0.5,
                ease: 'linear',
            },
        });
    };

    return (
        <>
            {!!data && userData.connected ? (
                <>
                    <section className="dark:bg-gray-900 rounded-lg shadow-[0_25px_25px_-24px_rgb(0,0,0,0.3)] space-y-10 my-10">
                        <div className="py-8 px-4 mx-auto max-w-full text-center lg:py-16 lg:px-6">
                            <BidRoomInformation
                                bidRoomInfo={!!data && data}
                                sendValue={handleSendValue}
                                sendClose={sendCloseSocket}
                                price={price}
                                moneyRef={moneyRef}
                                moneyPingRef={moneyPingRef}
                                controls={controls}
                                logInEmail={auth.email}
                            />
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
                                                !!participant.imageId
                                                    ? readImage(
                                                          participant.imageId,
                                                      )
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
                                                    (animationRefs.current[
                                                        index
                                                    ] = element)
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
                    <ProSidebarProvider>
                        <BidDetailSideBar
                            isAdmin={isAdmin}
                            setIsOpenAdminSetting={setIsOpenAdminSetting}
                            id={id}
                            bidRoomStatus={bidRoomStatus}
                            sendFinishBidMessage={sendFinishBidMessage}
                            userWinning={userWinning}
                        />
                    </ProSidebarProvider>
                </>
            ) : (
                <>
                    <div
                        className="flex justify-center text-center h-fit mt-10"
                        ref={ref}
                    >
                        <button
                            className="text-white rounded-lg text-sm px-5 py-2.5 text-center mb-2 font-medium shadow-lg dark:shadow-lg focus:outline-none bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-blue-300 dark:focus:ring-blue-800 shadow-blue-500/50 dark:shadow-blue-800/80"
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            Connect
                        </button>
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
                sendFinishBidMessage={sendFinishBidMessage}
                userWinning={userWinning}
            />
            <ToastContainer />
        </>
    );
}

export default BidDetailRoom;
