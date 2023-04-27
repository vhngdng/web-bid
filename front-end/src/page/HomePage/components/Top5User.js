/* eslint-disable no-extra-boolean-cast */
import React, { useRef } from 'react';
// import { DOMAIN_URL } from '~/CONST/const';
import ferari from '~/assets/images/car-ferrari-portofino-m_splash.jpg';
import ship from '~/assets/images/ship.jpg';
import gymmer from '~/assets/images/gymmer.jpg';
import luudiecphi from '~/assets/images/luudiecphi.webp';
import thor from '~/assets/images/thor.jpg';
import List5User from './List5User';
import { useInView } from 'framer-motion';

const defaultAvatarList = [ship, gymmer, luudiecphi, thor, ferari];
const defaultColor = ['green', 'blue', 'yellow', 'gray'];
function Top5User({ top5User }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    return (
        <div className="">
            <div
                className="py-5 flex flex-wrap justify-evenly w-full"
                ref={ref}
                style={{
                    transform: isInView ? 'none' : 'translateY(-200px)',
                    opacity: isInView ? 1 : 0,
                    transition:
                        'all 0.9s cubic-bezier(0.17, 0.37, 0.67, 0.87) 1s',
                }}
            >
                {top5User.map((user, index) => (
                    <List5User
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
