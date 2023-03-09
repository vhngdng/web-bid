import React from 'react';
import { Link } from 'react-router-dom';

function AdminHomePage() {
    return (
        <>
            <div>
                <Link to="create-bid">
                    <button>Create Bid Room</button>
                </Link>
            </div>
        </>
    );
}

export default AdminHomePage;
