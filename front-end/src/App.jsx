import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import './App.css';
import AdminProtectedPage from './private/AdminProtectedPage';
import BidRoom from './page/BidRoom';
import BidDetailRoom from './page/BidRoom/BidDetailRoom';
import ChatRoom from './page/ChatRoom';
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
import PaymentPage from './page/ProfilePage/Payment/PaymentPage';
import PaymentDetail from './page/ProfilePage/Payment/PaymentDetail';
import PropertyList from './page/ProfilePage/Properties/PropertyList';
import DetailBidRoom from './page/AdminPage/Bid/DetailBidRoom';
import ErrorPage404 from './page/ErrorPage';
import SignUp from './page/SignUp';
import PropertyDetails from './page/ProfilePage/Properties/PropertyDetails';
import ListBidRoomAdmin from './page/AdminPage/Bid/ListBidRoomAdmin';
import AdminPropertyList from './page/AdminPage/Property/AdminPropertyList';
import AdminPropertyDetails from './page/AdminPage/Property/AdminPropertyDetails';
import FullImageModal from './page/ProfilePage/Properties/Modal/FullImageModal';
import MainPage from './page/HomePage/MainPage';
import ListProperty from './page/HomePage/property/ListProperty';
import DefaultHomePage from './component/layouts/DefaultHomePage';
import DetailProperty from './page/HomePage/property/DetailProperty';
import BidDetail from './page/HomePage/bid/BidDetail';
import Search from './page/HomePage/Search';

function App() {
    const { auth } = useSelector((state) => state.auth);
    console.log('test');
    return (
        <>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/sign-up" element={<SignUp />} />
                <Route path="/error" element={<ErrorPage404 />} />
                <Route element={<DefaultLayout />}>
                    <Route element={<DefaultHomePage />}>
                        <Route path="/list-property">
                            <Route index element={<ListProperty />} />
                            <Route
                                path=":propertyId"
                                element={<DetailProperty />}
                            />
                        </Route>
                        <Route path="bid-room">
                            <Route index element={<BidRoom />} />
                            <Route path=":id" element={<BidDetail />} />
                        </Route>
                        <Route path="/search/:keyword" element={<Search />} />
                        {/* <Route index 
                            <Route path="?page=:page" element={<Search />} />
                        </Route> */}
                    </Route>
                    <Route path="/" element={<MainPage />} />
                    <Route element={<Private />}>
                        {/* <Route path="/" element={<Home />} /> */}
                        <Route path="chat-room" element={<ChatRoom />} />
                        <Route
                            path="bid-room/join/:id"
                            element={<BidDetailRoom />}
                        />
                        <Route path="profile-detail" element={<ProfilePage />}>
                            <Route index element={<ProfileDetail />} />
                            <Route
                                path="property-registration"
                                element={<UpPropertyPage />}
                            />
                            <Route path="Payment">
                                <Route index element={<PaymentPage />} />
                                <Route
                                    path="bidId/:bidId"
                                    element={<PaymentDetail />}
                                />
                            </Route>
                            <Route
                                path="property-list"
                                element={<PropertyList />}
                            />
                            <Route
                                path="propertyDetails/:propertyId"
                                element={<PropertyDetails />}
                            >
                                <Route
                                    path=":imageId"
                                    element={<FullImageModal />}
                                />
                            </Route>
                        </Route>

                        <Route
                            element={
                                <AdminProtectedPage
                                    isAllowed={
                                        !!auth &&
                                        auth.authorities.some(
                                            (autho) =>
                                                autho.authority ===
                                                'ROLE_ADMIN',
                                        )
                                    }
                                />
                            }
                        >
                            <Route path="admin" element={<AdminHomePage />}>
                                <Route index element={<ListBidRoomAdmin />} />
                                <Route
                                    path="create-bid"
                                    element={<BidCreate />}
                                />
                                <Route path="open-bid" element={<OpenBid />} />
                                <Route
                                    path="details-bid/:bidId"
                                    element={<DetailBidRoom />}
                                />
                                <Route
                                    path="properties"
                                    element={<AdminPropertyList />}
                                />

                                <Route
                                    path="properties/:propertyId"
                                    element={<AdminPropertyDetails />}
                                />
                            </Route>
                        </Route>
                        <Route path="forbidden" element={<ForbiddenPage />} />
                    </Route>
                </Route>
                <Route path="*" element={<ErrorPage404 />} />
            </Routes>
        </>
    );
}

export default App;
