/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { over } from 'stompjs';
import SockJS from 'sockjs-client';
import { useGetAllPublicChatQuery } from '~/app/service/message.service';
import Loader from '~/Loader';
import { useSelector } from 'react-redux';
import classNames from 'classnames/bind';
import styles from './ChatRoom.module.scss';
import { useNavigate } from 'react-router-dom';
import { DOMAIN_URL } from '~/CONST/const';
var stompClient = null;
const cx = classNames.bind(styles);
function ChatRoom() {
    const { data, isLoading, error, isSuccess } = useGetAllPublicChatQuery();

    const auth = useSelector((state) => state.auth);
    const [publicChats, setPublicChats] = useState([]);
    const [privateChats, setPrivateChats] = useState(new Map());
    const [tab, setTab] = useState('BID-ROOM');
    const [userData, setUserData] = useState({
        username: auth.auth.email,
        receivername: '',
        connected: false,
        message: '',
    });
    useEffect(() => {
        if (isSuccess) {
            console.log(data);
            setPublicChats([...data]);
        }
    }, [userData.connected, data]);

    const navigate = useNavigate();

    if (isLoading) return <Loader />;

    const connect = () => {
        let Sock = new SockJS('htts://auctionforfun.site/ws');
        stompClient = over(Sock);
        // eslint-disable-next-line no-undef
        stompClient.connect({}, onConnected, onError);
    };

    const onConnected = () => {
        setUserData({ ...userData, connected: true });
        stompClient.subscribe('/public', onMessagePublicReceived);
        stompClient.subscribe(
            `/user/${userData.username}/private`,
            onPrivateMessage,
        );
        userJoin();
    };

    const userJoin = () => {
        let chatMessage = {
            senderName: userData.username,
            status: 'JOIN',
        };
        stompClient.send('/app/bid-room', {}, JSON.stringify(chatMessage));
        console.log('chuan bi push');
    };

    const onMessagePublicReceived = (payload) => {
        let payloadData = JSON.parse(payload.body);
        switch (payloadData.status) {
            case 'JOIN':
                if (!privateChats.get(payloadData.senderName)) {
                    privateChats.set(payloadData.senderName, []);
                    setPrivateChats(new Map(privateChats));
                }
                break;
            case 'MESSAGE':
                console.log('publics chat');
                publicChats.push(payloadData);
                setPublicChats([...publicChats]);
                break;
        }
    };

    const onPrivateMessage = (payload) => {
        let payloadData = JSON.parse(payload.body);
        if (privateChats.get(payloadData.senderName)) {
            privateChats.get(payloadData.senderName).push(payloadData);
            setPrivateChats(new Map(privateChats));
        } else {
            let list = [];
            list.push(payloadData);
            privateChats.set(payloadData.senderName, list);
            setPrivateChats(new Map(privateChats));
        }
    };

    const onError = (err) => {
        console.log(err);
        console.log('call method onError');
        navigate('/');
    };

    const handleMessage = (event) => {
        const { value } = event.target;
        setUserData({ ...userData, message: value });
    };

    const sendValue = () => {
        if (stompClient && userData.message !== '') {
            let chatMessage = {
                senderName: userData.username,
                receiverName: 'public',
                message: userData.message,
                status: 'MESSAGE',
            };
            console.log('ban vao bid-room');
            stompClient.send('/app/bid-room', {}, JSON.stringify(chatMessage));
            setUserData({ ...userData, message: '' });
        }
    };

    const sendPrivateValue = () => {
        if (stompClient && userData.message !== '') {
            let chatMessage = {
                senderName: userData.username,
                receivername: tab,
                message: userData.message,
                status: 'MESSAGE',
            };
            if (userData.username !== tab) {
                privateChats.get(tab).push(chatMessage);
                setPrivateChats(new Map(privateChats));
            }
            stompClient.send(
                `/app/${tab}/private-message`,
                {},
                JSON.stringify(chatMessage),
            );
        }
    };

    const handleUsername = (event) => {
        const { value } = event.target;
        setUserData({ ...userData, username: value });
    };

    const registerUser = () => {
        connect();
    };
    return (
        <div className={cx('container')}>
            {userData.connected ? (
                <div className={cx('chat-box')}>
                    <div className={cx('member-list')}>
                        <ul>
                            <li
                                onClick={() => {
                                    setTab('BID-ROOM');
                                }}
                                className={cx(
                                    'member',
                                    tab === 'BID-ROOM' && 'active',
                                )}
                            >
                                Chatroom
                            </li>
                            {[...privateChats.keys()]
                                .filter((name) => name !== userData.username)
                                .map((name, index) => (
                                    <li
                                        onClick={() => {
                                            setTab(name);
                                        }}
                                        className={cx(
                                            'member',
                                            tab === name && 'active',
                                        )}
                                        key={index}
                                    >
                                        {name}
                                    </li>
                                ))}
                        </ul>
                    </div>
                    {tab === 'BID-ROOM' && (
                        <div className={cx('chat-content')}>
                            <ul className={cx('chat-messages')}>
                                {publicChats.map((chat, index) => (
                                    <li
                                        className={cx(
                                            'message',
                                            chat.senderName ===
                                                userData.username && 'self',
                                        )}
                                        key={index}
                                    >
                                        {chat.senderName !==
                                            userData.username && (
                                            <div className={cx('avatar')}>
                                                {chat.senderName}
                                            </div>
                                        )}
                                        <div className={cx('message-data')}>
                                            {chat.message}
                                        </div>
                                        {chat.senderName ===
                                            userData.username && (
                                            <div className={cx('avatar self')}>
                                                {chat.senderName}
                                            </div>
                                        )}
                                    </li>
                                ))}
                            </ul>

                            <div className={cx('send-message')}>
                                <input
                                    type="text"
                                    className={cx('input-message')}
                                    placeholder="enter the message"
                                    value={userData.message}
                                    onChange={handleMessage}
                                />
                                <button
                                    type="button"
                                    className={cx('send-button')}
                                    onClick={sendValue}
                                >
                                    send
                                </button>
                            </div>
                        </div>
                    )}
                    {tab !== 'BID-ROOM' && (
                        <div className={cx('chat-content')}>
                            <ul className="chat-messages">
                                {[...privateChats.get(tab)].map(
                                    (chat, index) => (
                                        <li
                                            className={`message ${
                                                chat.senderName ===
                                                    userData.username && 'self'
                                            }`}
                                            key={index}
                                        >
                                            {chat.senderName !==
                                                userData.username && (
                                                <div className="avatar">
                                                    {chat.senderName}
                                                </div>
                                            )}
                                            <div className="message-data">
                                                {chat.message}
                                            </div>
                                            {chat.senderName ===
                                                userData.username && (
                                                <div className="avatar self">
                                                    {chat.senderName}
                                                </div>
                                            )}
                                        </li>
                                    ),
                                )}
                            </ul>

                            <div className="send-message">
                                <input
                                    type="text"
                                    className="input-message"
                                    placeholder="enter the message"
                                    value={userData.message}
                                    onChange={handleMessage}
                                />
                                <button
                                    type="button"
                                    className="send-button"
                                    onClick={sendPrivateValue}
                                >
                                    send
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <div className="register">
                    <input
                        id="user-name"
                        placeholder="Enter your name"
                        name="userName"
                        value={userData.username}
                        onChange={handleUsername}
                    />
                    <button type="button" onClick={registerUser}>
                        connect
                    </button>
                </div>
            )}
        </div>
    );
}

export default ChatRoom;
