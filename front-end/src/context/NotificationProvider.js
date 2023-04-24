import React, { createContext, useState } from 'react';

export const NotificationContext = createContext({});

function NotificationProvider({ children }) {
    const [newNoti, setNewNoti] = useState(new Map());
    return (
        <NotificationContext.Provider value={{ newNoti, setNewNoti }}>
            {children}
        </NotificationContext.Provider>
    );
}

export default NotificationProvider;
