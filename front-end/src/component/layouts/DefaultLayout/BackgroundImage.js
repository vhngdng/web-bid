import React from 'react';
import backgroundImage from '~/assets/images/bg-pinky.png';
function BackgroundImage({ children }) {
    return (
        <div
            className={`bg-opacity-20 h-full w-full bg-no-repeat bg-cover bg-center bg-url(${backgroundImage})`}
            style={{ backgroundImage: `url(${backgroundImage})` }}
        >
            {children}
        </div>
    );
}

export default BackgroundImage;
