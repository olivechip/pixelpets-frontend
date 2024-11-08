import { Link } from 'react-router-dom';

import './styles/pound.css';

const Pound = () => {
    return (
        <div className="pound-container">
            <div className="pound-white-background">
                <div className="header">
                    <h2>The Pixel Pound</h2>
                    <p>Find a new Pixelpet to adopt or rehome a pet that needs a fresh start.</p>
                </div>

                <img
                    src="/images/tools/pixel_pound.png"
                    className="pound-image"
                    alt="pixel_pound"
                />

                <div className="pound-buttons">
                    <Link to="/pound/adopt" className="pound-button">Adopt</Link>
                    <Link to="/pound/abandon" className="pound-button">Abandon</Link>
                </div>
            </div>
        </div>
    );
};

export default Pound;
