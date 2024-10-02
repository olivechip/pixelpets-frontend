import { useLocation, Link } from 'react-router-dom';

const PetDeleted = () => {
    const location = useLocation();
    const { message } = location.state || {}; 

    return (
        <div>
            <div className="header">
                <h1>Pet Deleted</h1>
            </div>
            
            {message ? (
                <>
                    <div className="message">{message}</div>
                    <img src={"/src/assets/deleted_zap.png"} style={{ width: '500px', height: '500px' }} alt="Deleted" />
                </>
            ) : (
                <>
                    <p>No pet was deleted.</p>
                    <img src={"/src/assets/deleted_not.png"} style={{ width: '500px', height: '500px' }} alt="Deleted" />
                </>
            )}

            <div>
                <Link to="/lab">Back to the Pixel Lab</Link><br />
                <Link to="/dashboard">Back to Dashboard</Link>
            </div>
        </div>
    );
};

export default PetDeleted;