import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import './styles/error.css';

const NotFound = () => {
    const { user } = useSelector(state => state.user);

    const navigate = useNavigate();

    return (
        <div className="error-container">
            <div className="error-white-background">
                <div className="header">
                    <h2>Oops! Page Not Found</h2>
                </div>

                <p>The page you're looking for doesn't seem to exist.</p>

                <div className="action-links">
                    <Link to="/" className="action-link">Go to Home Page</Link>
                </div>

            </div>
            <button className="back-button" onClick={() => navigate(-1)}>
                Back
            </button>
        </div>
    );
};

export default NotFound;
