import { useLocation, Link } from 'react-router-dom';

const PetCreated = () => {
    const location = useLocation();
    const { message } = location.state || {}; // Access the message from navigation state

    return (
        <div>
            <h1>Pet Created!</h1>

            {message ? (
                <p>{message}</p> 
            ) : (
                <p>No pet was generated.</p> 
            )}
            <div>

                <Link to="/lab">Back to the Pixel Lab</Link><br />
                <Link to="/dashboard">Back to Dashboard</Link>
            </div>
        </div>
    );
};

export default PetCreated;