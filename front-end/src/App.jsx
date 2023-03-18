import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import './App.css';
import AdminProtectedPage from './private/AdminProtectedPage';
import BidRoom from './page/BidRoom';
import BidDetailRoom from './page/BidRoom/BidDetailRoom';
import ChatRoom from './page/ChatRoom';
import Home from './page/HomePage';
import LoginPage from './page/Login/LoginPage';
import Private from './private/Private';
import AdminHomePage from './page/AdminPage/HomeAdmin';
import BidCreate from './page/AdminPage/Bid/BidCreate';
import ForbiddenPage from './page/BidRoom/ForbiddenPage';
import DefaultLayout from './component/layouts/DefaultLayout';
import ProfilePage from './page/ProfilePage';
import OpenBid from './page/AdminPage/Bid/OpenBid';
import UpPropertyPage from './page/ProfilePage/UpPropertyPage';
import ProfileDetail from './page/ProfilePage/ProfileDetail';
import ProfileLayout from './component/layouts/ProfileLayout';

function App() {
    const { auth } = useSelector((state) => state.auth);

    return (
        <>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route element={<Private />}>
                    <Route element={<DefaultLayout />}>
                        <Route path="/" element={<Home />} />
                        <Route path="chat-room" element={<ChatRoom />} />
                        <Route path="bid-room">
                            <Route index element={<BidRoom />} />
                            <Route
                                path=":id"
                                element={<BidDetailRoom />}
                            ></Route>
                        </Route>
                        <Route element={<ProfileLayout />}>
                            <Route
                                path="/profile-page"
                                element={<ProfilePage />}
                            />
                            <Route
                                path="/upload-property"
                                element={<UpPropertyPage />}
                            />
                            <Route
                                path="/profile-detail"
                                element={<ProfileDetail />}
                            />
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
                            <Route path="open-bid" element={<OpenBid />} />
                        </Route>
                    </Route>
                    <Route path="forbidden" element={<ForbiddenPage />} />
                </Route>
            </Routes>
        </>
    );
}

export default App;
