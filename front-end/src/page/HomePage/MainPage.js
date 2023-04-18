/* eslint-disable no-extra-boolean-cast */
import React, { useEffect, useState } from 'react';
import Loader from '~/Loader';
import { useGetHomeDetailsQuery } from '~/app/service/bid.service';
import Top5Property from './components/Top5Property';
import Top5Earliest from './components/Top5Earliest';

function MainPage() {
    const { data, isLoading } = useGetHomeDetailsQuery();
    const [top5Property, setTop5Property] = useState([]);
    const [top5Earliest, setTop5Earliest] = useState([]);
    const [top5Famous, setTop5Famous] = useState([]);
    const [top5User, setTop5User] = useState([]);
    useEffect(() => {
        if (!!data) {
            setTop5Earliest([...data.bidEarliestTop5]);
            setTop5Property([...data.propertyTop5]);
            setTop5User([...data.userRateTop5]);
            setTop5Famous([...data.bidFamousTop5]);
        }
    }, [data]);
    if (isLoading) return <Loader />;
    return (
        <div className="w-4/5">
            <div className="h-full ">
                {top5Earliest.length > 0 && (
                    <Top5Earliest top5Earliest={top5Earliest} />
                )}
                <Top5Property top5Property={top5Property} />
            </div>
        </div>
    );
}

export default MainPage;
