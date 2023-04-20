/* eslint-disable no-extra-boolean-cast */
import React from 'react';
// import { DOMAIN_URL } from '~/CONST/const';

function List4User({ user, defaultAvatar, index, defaultColor }) {
    return (
        <div>
            <div className="relative rounded-lg">
                <img
                    className={`h-40 w-full rounded-lg shadow-2xl`}
                    src={!!user.avatar ? user.avatar : `${defaultAvatar}`}
                />
                <div
                    className={`absolute top-0 right-0 text-${defaultColor}-800 animate-waving-hand`}
                >
                    Top {index + 2}
                </div>
                <div className={`absolute bottom-0 right-0 text-red-800 pr-2`}>
                    <p className="text-end">Entries: {user.numberEntries}</p>
                    <p className="text-end text-green-800">
                        Win Rate:{' '}
                        {parseFloat(
                            (user.numberWinning / user.numberEntries) * 100,
                        ).toFixed(2)}
                        {' %'}
                    </p>
                </div>
            </div>
            <div className="text-xl font-sans text-teal-500">{user.name}</div>
        </div>
    );
}

export default List4User;
