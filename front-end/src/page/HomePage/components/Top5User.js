/* eslint-disable no-extra-boolean-cast */
import React, { useRef } from 'react';
import { useInView } from 'framer-motion';
import List4User from './List4User';
import { DOMAIN_URL } from '~/CONST/const';
import ferari from '~/assets/images/car-ferrari-portofino-m_splash.jpg';
import ship from '~/assets/images/ship.jpg';
import gymmer from '~/assets/images/gymmer.jpg';
import luudiecphi from '~/assets/images/luudiecphi.webp';
import thor from '~/assets/images/thor.jpg';

const defaultAvatarList = [ship, gymmer, luudiecphi, thor];
const defaultColor = ['green', 'blue', 'yellow', 'gray'];
function Top5User({ top5User }) {
    console.log('user', top5User);
    const top4List = top5User.filter((t) => t.id != top5User[0].id);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: false });
    return (
        <div className="min-h-80 flex flex-wrap justify-between ">
            <div className="flex flex-wrap w-4/6">
                <div
                    ref={ref}
                    className={`relative w-full bg-white bg-opacity-20 bg-no-repeat bg-cover bg-center`}
                    style={{
                        backgroundImage: `url(${
                            !!top5User[0]?.avatar
                                ? `${DOMAIN_URL}api/v1/images/read/${top5User[0]?.avatar}`
                                : `${ferari}`
                        })`,
                        transform: isInView ? 'none' : 'translateX(-200px)',
                        opacity: isInView ? 1 : 0,
                        transition:
                            'all 0.9s cubic-bezier(0.17, 0.37, 0.67, 0.87) 1s',
                        boxShadow: isInView
                            ? '0 50px 25px -24px rgb(0,0,0,0.3)'
                            : '',
                    }}
                >
                    <div
                        className={`absolute top-0 right-0 text-red-800 text-4xl`}
                    >
                        Top 1
                    </div>
                    <div
                        className={`absolute bottom-0 right-0 text-red-800 text-4xl pr-2`}
                    >
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
            </div>

            <div className="w-1/5 inline-block space-y-2">
                {top4List.map((user, index) => (
                    <List4User
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
