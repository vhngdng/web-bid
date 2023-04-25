/* eslint-disable no-extra-boolean-cast */
import React, { useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';
import List4User from './List4User';
// import { DOMAIN_URL } from '~/CONST/const';
import ferari from '~/assets/images/car-ferrari-portofino-m_splash.jpg';
import ship from '~/assets/images/ship.jpg';
import gymmer from '~/assets/images/gymmer.jpg';
import luudiecphi from '~/assets/images/luudiecphi.webp';
import thor from '~/assets/images/thor.jpg';

const defaultAvatarList = [ship, gymmer, luudiecphi, thor, ferari];
const defaultColor = ['green', 'blue', 'yellow', 'gray'];
function Top5User({ top5User }) {
    // const top4List = top5User.filter((t) => t.id != top5User[0].id);
    // const ref = useRef(null);
    const userRef = useRef([]);
    // const isInView = useInView(userRef.current, { once: true });

    useEffect(() => {
        userRef.current = userRef.current.slice(0, 5);
    }, [top5User]);

    return (
        <div className="">
            {/* {top5User.map((user, index) => (
                <div
                    key={index}
                    className="flex flex-wrap"
                    ref={(element) => (userRef.current[index] = element)}
                    style={{
                        transform: isInView ? 'none' : 'translateX(-200px)',
                        opacity: isInView ? 1 : 0,
                        transition:
                            'all 0.9s cubic-bezier(0.17, 0.37, 0.67, 0.87) 1s',
                    }}
                >
                    <div className="relative">
                        <img
                            className={` w-full object-cover rounded-lg`}
                            src={
                                !!top5User[0]?.avatar
                                    ? top5User[0]?.avatar
                                    : `${ferari}`
                            }
                            style={{
                                boxShadow: isInView
                                    ? '0 50px 25px -24px rgb(0,0,0,0.3)'
                                    : '',
                            }}
                        />
                        <div className="flex flex-wrap justify-between space-y-10">
                            <div className="flex justify-center items-center text-xl font-sans text-teal-500">
                                <p className="pt-4">{top5User[0].name}</p>
                            </div>
                            <div className={`text-red-800 text-4xl pr-2`}>
                                <p className="text-end">
                                    Entries: {top5User[0].numberEntries}
                                </p>
                                <p className="text-end text-green-800">
                                    Win Rate:{' '}
                                    {parseFloat(
                                        (top5User[0].numberWinning /
                                            top5User[0].numberEntries) *
                                            100,
                                    ).toFixed(2)}
                                    {' %'}
                                </p>
                            </div>
                        </div>

                        <div
                            className={`absolute top-0 right-0 text-red-800 text-4xl`}
                        >
                            Top 1
                        </div>
                    </div>
                </div>
            ))} */}
            <div className="py-5 flex flex-wrap justify-evenly w-full">
                {top5User.map((user, index) => (
                    <List4User
                        ref={(element) => (userRef.current[index] = element)}
                        index={index}
                        key={index}
                        user={user}
                        defaultAvatar={defaultAvatarList[index]}
                        defaultColor={defaultColor[index]}
                    />
                ))}
            </div>
        </div>
    );
}

export default Top5User;
