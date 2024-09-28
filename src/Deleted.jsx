import { useLocation, Link } from 'react-router-dom';

const Deleted = () => {
    const location = useLocation();
    const { message } = location.state || {}; 

    return (
        <div>
            <h1>Pet Deleted</h1>
            {message ? (
                <p>{message}</p>
            ) : (
                <p>No pet was deleted.</p>
            )}
            <div>
                <Link to="/lab">Back to the Pixel Lab</Link><br />
                <Link to="/dashboard">Back to Dashboard</Link>
            </div>
        </div>
    );
};

export default Deleted;