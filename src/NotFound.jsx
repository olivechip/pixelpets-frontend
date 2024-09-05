import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="not-found-page">
            <h1>Oops! Page Not Found</h1>
            <p>The page you're looking for doesn't seem to exist.</p>
            <div>
                <Link to="/">Go back to the Home Page</Link>
            </div>
        </div>
    );
};

export default NotFound;