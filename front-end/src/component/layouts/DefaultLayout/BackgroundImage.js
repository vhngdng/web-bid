import React from 'react';
import backgroundImage from '~/assets/images/bg-pinky.png';
function BackgroundImage({ children }) {
    return (
        <div
            className={`inline-block min-h-screen max-h-full bg-opacity-20 w-full bg-no-repeat bg-cover bg-center `}
            style={{ backgroundImage: `url(${backgroundImage})` }}
        >
            {children}
        </div>
    );
}

export default BackgroundImage;
