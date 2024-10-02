import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const Adopted = () => {
    const location = useLocation();
    const { message, pet } = location.state || {}; 

    console.log(message, pet)
    return (
        <div>
            <div className="header">
                <h1>Pet Adopted!</h1>
            </div>
            
            {message ? (
                <>
                    <div className="message">{message}</div>
                    <img 
                            className="dynamic-image" 
                            src={`/src/assets/pixelpets/imgs/${pet.species}/happy_${pet.gender}_${pet.color}_${pet.species}.png`} 
                            alt={`happy_${pet.gender}_${pet.color}_${pet.species}.png`}
                    />
                </>
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