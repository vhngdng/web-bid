import React from 'react';

function UserWinningInBidRoom({ winner }) {
    return (
        <div className=" mx-auto col-span-2 mb-8 max-w-screen-sm lg:mb-16 ">
            <h3 className="mb-4 text-2xl tracking-tight font-extrabold text-gray-600 dark:text-white">
                <span className="text-3xl animate-pulse font-sans">Winner</span>
            </h3>
            <h1 className="mb-4 text-2xl font-extrabold text-red-500 dark:text-white">
                <div className=" mb-3 ">
                    <span className="relative truncate font-sans">
                        <div className=" flex justify-center">
                            <div className=" absolute w-full h-3/4 animate-ping transition ease-in-out bg-cyan-500/75 rounded-full">
                                &nbsp;
                            </div>
                            <div className="absolute w-full h-3/4 animate-ping transition animation-delay-500 ease-in-out bg-yellow-500/75 rounded-full">
                                &nbsp;
                            </div>
                            <div className="absolute w-full h-3/4 animate-ping transition animation-delay-700 ease-in-out bg-orange-500/75 rounded-full">
                                &nbsp;
                            </div>
                            <div className="absolute w-full h-3/4 animate-ping transition animation-delay-1000 ease-in-out bg-pink-500/75 rounded-full">
                                &nbsp;
                            </div>
                        </div>
                        {winner.nickName || winner.username}
                    </span>
                    <div>
                        <img
                            className="mx-auto mb-4 w-36 h-36 rounded-full"
                            src={
                                winner.avatar
                                    ? winner.avatar
                                    : 'https://sbcf.fr/wp-content/uploads/2018/03/sbcf-default-avatar.png'
                            }
                            alt="Avatar"
                        />
                    </div>
                </div>
            </h1>
        </div>
    );
}

export default UserWinningInBidRoom;
