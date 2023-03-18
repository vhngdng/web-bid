import React from 'react';

function PropertyDetail({ prop }) {
    console.log(prop);
    return (
        <>
            <div>{prop.name}</div>
        </>
    );
}

export default PropertyDetail;
