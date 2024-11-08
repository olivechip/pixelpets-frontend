import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const Abandoned = () => {
    const location = useLocation();
    const { message, pet } = location.state || {};

    return (
        <div className="pound-container">
            <div className="pound-white-background">
                <div className="header">
                    <h2>Pet Abandoned</h2>
                </div>

                {message ? (
                    <>
                        <div>{message}</div>
                        <img
                            className="dynamic-image"
                            src={`/images/pixelpets/${pet.species}/sad_${pet.gender}_${pet.color}_${pet.species}.png`}
                            alt={`sad_${pet.gender}_${pet.color}_${pet.species}.png`}
                        />
                    </>
                ) : (
                    <p>No pet was abandoned.</p>
                )}

                <div className="pound-buttons">
                    <Link to="/dashboard" className="pound-button back-to-dashboard">Back to Dashboard</Link>
                </div>
            </div>
            <div className="back-link">
                <Link to="/pound" className="back-button">Back to the Pixel Pound</Link>
            </div>
        </div>
    );
};

export default Abandoned;
