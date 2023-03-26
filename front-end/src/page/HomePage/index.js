import { Button } from '@material-tailwind/react';
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
function Home() {
    const { auth } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    const handleRedirectToChatRoom = () => {
        navigate('/chat-room');
    };
    const handleRedirectToAdminPage = () => {
        navigate('/admin');
    };
    const handleRedirectToProfile = () => {
        navigate('/profile-detail');
    };
    return (
        <div>
            <h1>Home</h1>
            <Button type="button" onClick={handleRedirectToChatRoom}>
                <span>Join ChatRoom</span>
            </Button>
            <Button type="button" onClick={() => navigate('/bid-room')}>
                <span>Join BidRoom</span>
            </Button>
            {auth.authorities.find((n) => n.authority === 'ROLE_ADMIN') ? (
                <Button onClick={handleRedirectToAdminPage}>
                    Go to Admin page
                </Button>
            ) : (
                <Button onClick={handleRedirectToProfile}>
                    Go to Your Profile page
                </Button>
            )}
        </div>
    );
}

export default Home;
