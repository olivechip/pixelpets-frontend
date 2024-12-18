import { useLocation, Link } from 'react-router-dom';

const Adopted = () => {
    const location = useLocation();
    const { message, pet } = location.state || {};

    return (
        <div className="pound-container">
            <div className="pound-white-background">
                <div className="header">
                    <h2>Pet Adopted!</h2>
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
                    <p>No pet was adopted.</p>
                )}
                <p><Link to="/dashboard">View in Dashboard</Link></p>
            </div>

            <div className="back-link">
                <Link to="/pound" className="back-button">Back to the Pixel Pound</Link>
            </div>
        </div>
    );
};

export default Adopted;
