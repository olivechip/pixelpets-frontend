import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const Abandoned = () => {
    const location = useLocation();
    const { message } = location.state || {}; 

    return (
        <div>
            <h1>Pet Abandoned</h1>
            {message ? (
                <p>{message}</p>
            ) : (
                <p>No pet was abandoned.</p>
            )}
            <div>
                <Link to="/pound">Back to the Pixel Pound</Link><br />
                <Link to="/dashboard">Back to Dashboard</Link>
            </div>
        </div>
    );
};

export default Abandoned;