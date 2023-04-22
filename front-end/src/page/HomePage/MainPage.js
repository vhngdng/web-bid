/* eslint-disable no-unused-vars */
/* eslint-disable no-extra-boolean-cast */
import React, { useEffect, useState } from 'react';
import Loader from '~/Loader';
import { useGetHomeDetailsQuery } from '~/app/service/bid.service';
import Top5Earliest from './components/Top5Earliest';
import Top5User from './components/Top5User';
import { Helmet } from 'react-helmet';
import Top5Famous from './components/Top5Famous';
// import Tutorial from './Tutorial';
import ListProperty from './property/ListProperty';

function MainPage() {
    const { data, isLoading } = useGetHomeDetailsQuery();
    const [top5Earliest, setTop5Earliest] = useState([]);
    const [top5Famous, setTop5Famous] = useState([]);
    const [top5User, setTop5User] = useState([]);
    useEffect(() => {
        if (!!data) {
            setTop5Earliest([...data.bidEarliestTop5]);
            setTop5User([...data.userRateTop5]);
            setTop5Famous([...data.bidFamousTop5]);
            console.log('data from home', data);
        }
    }, [data]);
    if (isLoading) return <Loader />;
    console.log('data from home', data);
    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Auctionforfun Home</title>
                <meta name="description" content="Home" />
            </Helmet>
            <div className="w-full inline-block">
                {/* <div className="h-75vh space-y-10">
                    <Tutorial />
                </div> */}
                <div className="flex justify-center items-center">
                    <div className="w-4/5">
                        <div className="space-y-10">
                            {top5Earliest.length > 0 && (
                                <Top5Earliest top5Earliest={top5Earliest} />
                            )}
                        </div>
                        <div className="space-y-10">
                            <div className="my-10">
                                <div className="font-sans font-semibold text-2xl text-blue-rgb">
                                    Top 5 User
                                </div>
                                {top5User.length > 0 && (
                                    <Top5User top5User={top5User} />
                                )}
                            </div>
                        </div>
                        <div className="space-y-10">
                            <Top5Famous top5Famous={top5Famous} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default MainPage;
