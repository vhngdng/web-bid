import React from 'react';
import { ClipLoader } from 'react-spinners';

function Loader() {
    return (
        <ClipLoader
            color="#123abc"
            loading="true"
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
            className="sweet-loading"
        />
    );
}

export default Loader;
