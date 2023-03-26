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
import OpenBid from './page/AdminPage/Bid/OpenBid';
import UpPropertyPage from './page/ProfilePage/UpPropertyPage';
import ProfileDetail from './page/ProfilePage/ProfileDetail';
import ProfilePage from './page/ProfilePage';
import TransactionPage from './page/ProfilePage/Transaction/TransactionPage';
import TransactionDetail from './page/ProfilePage/Transaction/TransactionDetail';

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
                        <Route path="profile-detail" element={<ProfilePage />}>
                            <Route index element={<ProfileDetail />} />
                            <Route
                                path="upload-property"
                                element={<UpPropertyPage />}
                            />
                            <Route path="transaction">
                                <Route index element={<TransactionPage />} />
                                <Route
                                    path="bidId/:bidId"
                                    element={<TransactionDetail />}
                                />
                            </Route>
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
                        <Route path="forbidden" element={<ForbiddenPage />} />
                    </Route>
                </Route>
            </Routes>
        </>
    );
}

export default App;
