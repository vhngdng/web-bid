import React from 'react';
import { useNavigate } from 'react-router-dom';
function Home() {
    const navigate = useNavigate();

    const handleRedirectToChatRoom = () => {
        navigate('/chat-room');
    };
    return (
        <div>
            <h1>Home</h1>
            <button type="button" onClick={handleRedirectToChatRoom}>
                <span>Join ChatRoom</span>
            </button>
            <button type="button" onClick={() => navigate('/bid-room')}>
                <span>Join BidRoom</span>
            </button>
        </div>
    );
}

export default Home;
