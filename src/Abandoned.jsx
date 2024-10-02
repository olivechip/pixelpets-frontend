import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const Abandoned = () => {
    const location = useLocation();
    const { message, pet } = location.state || {}; 

    return (
        <div>
            <div className="header">
                <h1>Pet Abandoned</h1>
            </div>

            {message ? (
                <>
                    <div className="message">{message}</div>
                    <img 
                            className="dynamic-image" 
                            src={`/src/assets/pixelpets/imgs/${pet.species}/sad_${pet.gender}_${pet.color}_${pet.species}.png`} 
                            alt={`sad_${pet.gender}_${pet.color}_${pet.species}.png`}
                    />
                </>
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