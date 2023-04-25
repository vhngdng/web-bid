import React from 'react';
import backgroundImage from '~/assets/images/background-auction.jpg';
function BackgroundImage({ children }) {
    return (
        <div
            className={`relative inline-block h-screen bg-opacity-10 w-full bg-no-repeat bg-cover bg-center shadow-gray-900 shadow-md z-0`}
            style={{ backgroundImage: `url(${backgroundImage})` }}
        >
            {/* <div className="absolute inset-0 w-full h-full bg-white bg-opacity-20 z-0 pointer-events-none"></div> */}
            {children}
        </div>
    );
}

export default BackgroundImage;
