import { Button } from '@material-tailwind/react';
import React from 'react';
import { Link } from 'react-router-dom';

function ForbiddenPage() {
    return (
        <>
            <div>The Bid Room is Closed</div>
            <Link to={'/'}>
                <Button>Back To Main</Button>
            </Link>
        </>
    );
}

export default ForbiddenPage;
