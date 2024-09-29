import { useLocation, Link } from 'react-router-dom';

const PetDeleted = () => {
    const location = useLocation();
    const { message } = location.state || {}; 

    return (
        <div>
            <h1>Pet Deleted</h1>

            {message ? (
                <>
                    <p>{message}</p>
                    <img src={"/src/assets/blood_splat.png"} style={{ width: '300px', height: '300px' }} alt="Deleted" />                </>
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

export default PetDeleted;