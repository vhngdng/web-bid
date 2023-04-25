/* eslint-disable no-extra-boolean-cast */
import React from 'react';
// import { DOMAIN_URL } from '~/CONST/const';

function List4User({ user, defaultAvatar }) {
    return (
        <div className="rounded-lg h-40vh w-1/6 bg-[rgb(189,211,213)] p-3">
            <div className="h-2/3 w-full">
                <img
                    className={`w-full h-full rounded-lg shadow-2xl object-cover`}
                    src={!!user.avatar ? user.avatar : `${defaultAvatar}`}
                />
            </div>
            <div className="text-xl text-teal-500 truncate">{user.name}</div>
            <div className={`text-red-800 pr-2`}>
                <p className="">Entries: {user.numberEntries}</p>
                <p className="text-green-800">
                    Win Rate:{' '}
                    {parseFloat(
                        (user.numberWinning / user.numberEntries) * 100,
                    ).toFixed(2)}
                    {' %'}
                </p>
            </div>
        </div>
    );
}

export default List4User;
