import { useState } from "react";
import { Link } from "react-router-dom";
import './styles/github.css';

const Github = () => {
    const [showLinks, setShowLinks] = useState(false);

    const handleShowLinks = () => {
        setShowLinks(true);
    };

    const handleHideLinks = () => {
        setShowLinks(false);
    };

    return (
        <div className="github-wrapper">
            {!showLinks ? (
                <button className="github-check-button" onClick={handleShowLinks}>
                    Check Out My Work!
                </button>
            ) : (
                <div className="github-wrapper">
                    {/* <button className="github-back-button" onClick={handleHideLinks}>
                        Back
                    </button> */}
                    <div className="github-link-container">
                        <button className="github-button" onClick={handleHideLinks}>
                            <Link to="https://github.com/olivechip/pixelpets-frontend" onClick={handleHideLinks} target="_blank" rel="noopener noreferrer">
                                <span>Front End</span>
                            </Link>
                        </button>
                        <button className="github-button" onClick={handleHideLinks}>
                            <Link to="https://github.com/olivechip/pixelpets-backend" onClick={handleHideLinks} target="_blank" rel="noopener noreferrer">
                                <span>Back End</span>
                            </Link>
                        </button>
                    </div>

                </div>
            )}
        </div>

    );
}

export default Github;
