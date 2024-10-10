import { useLocation, Link } from 'react-router-dom';

const PetCreated = () => {
    const location = useLocation();
    const { message, pet } = location.state || {}; // Access the message from navigation state

    return (
        <div>
            <div className="header">
                <h1>Pet Created!</h1>
            </div>
            
            {message ? (
                <>
                    <div>{message}</div>
                    <img 
                        className="dynamic-image" 
                        src={`/images/pixelpets/${pet.species}/happy_${pet.gender}_${pet.color}_${pet.species}.png`} 
                        alt={`happy_${pet.gender}_${pet.color}_${pet.species}.png`}
                    />
                </>
            ) : (
                <p>No pet was created.</p> 
            )}
            <div>

                <Link to="/lab">Back to the Pixel Lab</Link><br />
                <Link to="/dashboard">Back to Dashboard</Link>
            </div>
        </div>
    );
};

export default PetCreated;