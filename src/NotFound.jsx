import { Link, useNavigate } from 'react-router-dom';

const NotFound = () => {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <div className="not-found-page">
            <div className="header">
                <h1>Oops! Page Not Found</h1>
            </div>
            
            <p>The page you're looking for doesn't seem to exist.</p>
            <div>
                <Link to="" onClick={handleGoBack}>Go Back</Link>
                    <br />
                <Link to="/">Go to Home Page</Link>
            </div>
        </div>
    );
};

export default NotFound;