import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import './App.css';
import AdminProtectedPage from './private/AdminProtectedPage';
import BidRoom from './page/BidRoom';
import BidDetailRoom from './page/BidRoom/BidDetailRoom';
import ChatRoom from './page/ChatRoom';
import Home from './page/HomePage';
import LoginPage from './page/LoginPage';
import Private from './private/Private';
import AdminHomePage from './page/AdminPage/HomeAdmin';
import BidCreate from './page/AdminPage/Bid/BidCreate';

function App() {
    const { auth } = useSelector((state) => state.auth);

    return (
        <>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route element={<Private />}>
                    <Route path="/" element={<Home />} />
                    <Route path="chat-room" element={<ChatRoom />} />
                    <Route path="bid-room">
                        <Route index element={<BidRoom />} />
                        <Route path=":id" element={<BidDetailRoom />} />
                    </Route>
                    <Route
                        path="admin"
                        element={
                            <AdminProtectedPage
                                isAllowed={
                                    !!auth &&
                                    auth.authorities.includes('ROLE_ADMIN')
                                }
                            />
                        }
                    >
                        <Route index element={<AdminHomePage />} />
                        <Route path="create-bid" element={<BidCreate />} />
                    </Route>
                </Route>
            </Routes>
        </>
    );
}

export default App;
