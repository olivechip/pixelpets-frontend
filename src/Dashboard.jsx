import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserPets, playWithPet, feedPet } from './redux/store';

import PetCard from './PetCard';

import './styles/dashboard.css';

const Dashboard = () => {
    const location = useLocation();
    const { message } = location.state || {};
    const { user } = useSelector(state => state.user);
    const { pets, loading, error } = useSelector(state => state.pets);
    const dispatch = useDispatch();

    const [currentPetIndex, setCurrentPetIndex] = useState(0);

    useEffect(() => {
        if (user) {
            dispatch(fetchUserPets(user.id));
        }
    }, [user, dispatch]);

    const handleNext = () => {
        setCurrentPetIndex((prevIndex) => (prevIndex + 1) % pets.length);
    };

    const handlePrev = () => {
        setCurrentPetIndex((prevIndex) =>
            (prevIndex - 1 + pets.length) % pets.length
        );
    };

    return (
        <div className="dashboard-container">
            <div className="dashboard-white-background">
                <div className="header">
                    <h2>Dashboard</h2>
                </div>

                {loading && <p>Loading pets...</p>}
                {error && <div className="error">{error}</div>}

                {pets.length > 0 ? (
                    <div className="pet-slider">
                        <button onClick={handlePrev} disabled={pets.length <= 1}>
                            &lt;
                        </button>

                        <PetCard pet={pets[currentPetIndex]} />

                        <button onClick={handleNext} disabled={pets.length <= 1}>
                            &gt;
                        </button>
                    </div>
                ) : (
                    <p>
                        You have no pets.
                        Visit the <Link to="/lab">Pixel Lab</Link> to create one, or the <Link to="/pound">Pixel Pound</Link> to adopt one!
                    </p>
                )}

                {pets.length > 0 && (
                    <div className="pet-actions">
                        <button
                            onClick={() => dispatch(playWithPet({ petId: pets[currentPetIndex].id, userId: user.id }))}
                            className="action-button"
                        >
                            Play
                        </button>
                        <button
                            onClick={() => dispatch(feedPet({ petId: pets[currentPetIndex].id, userId: user.id }))}
                            className="action-button"
                        >
                            Feed
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;