/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetTransactionByIdQuery } from '~/app/service/transaction.service';
import Loader from '~/Loader';

function TransactionDetail() {
    const { bidId } = useParams();
    const { auth } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const {
        data: transaction,
        isLoading,
        isSuccess,
    } = useGetTransactionByIdQuery(bidId);
    const [isAdmin, setIsAdmin] = useState();
    useEffect(() => {
        if (isSuccess) {
            console.log(isSuccess);
            transaction.auctioneerEmail === auth.email
                ? setIsAdmin(true)
                : setIsAdmin(false);
        }
        // else {
        //     navigate('/profile-detail/transaction');
        // }
    }, [isSuccess]);
    console.log('bidId', bidId);
    if (isLoading) return <Loader />;
    console.log(transaction);
    console.log('is admin', isAdmin);

    return (
        <>
            <div className="grid grid-cols-2 gap-2 border-1 rounded-lg">
                <div className="h-auto max-w-full border rounded-lg">01</div>
                <div className="h-auto max-w-full border rounded-lg">02</div>
                <div className="h-auto max-w-full border rounded-lg">03</div>
                <div className="h-auto max-w-full border rounded-lg">04</div>
            </div>
        </>
    );
}

export default TransactionDetail;
