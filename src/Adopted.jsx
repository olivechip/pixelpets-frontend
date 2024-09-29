import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const Adopted = () => {
    const location = useLocation();
    const { message } = location.state || {}; 

    return (
        <div>
            <h1>Pet Adopted!</h1>
            {/* import happy png */}
            {message ? (
                <p>{message}</p>
            ) : (
                <p>No pet was adopted.</p>
            )}
            <div>
                <Link to="/pound">Back to the Pixel Pound</Link><br />
                <Link to="/dashboard">Back to Dashboard</Link>
            </div>
        </div>
    );
};

export default Adopted;