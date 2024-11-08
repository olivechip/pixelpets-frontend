import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserById, fetchUserPets } from './redux/store';

import UserCard from './UserCard';
import PetMiniCard from './PetMiniCard';

import './styles/userProfile.css';

const UserProfile = () => {
    const { user } = useSelector(state => state.user);
    const { userId } = useParams();
    const { profile, loading, error } = useSelector(state => state.userProfile);
    const { pets } = useSelector(state => state.pets);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [currentPetIndex, setCurrentPetIndex] = useState(0);

    // Effect to fetch user and pets when component mounts
    useEffect(() => {
        dispatch(fetchUserById(userId));
        dispatch(fetchUserPets(userId));
    }, [userId, dispatch]);

    // Handlers for slider navigation
    const handlePrev = () => {
        if (currentPetIndex > 0) {
            setCurrentPetIndex(currentPetIndex - 1);
        }
    };

    const handleNext = () => {
        if (currentPetIndex < pets.length - 1) {
            setCurrentPetIndex(currentPetIndex + 1);
        }
    };

    return (
        <div className="user-profile-container">
            <div className="user-profile-white-background">
                <div className="header">
                    <h2>User Profile</h2>
                </div>

                {loading && <p>Loading user profile...</p>}
                {error && <div className="error">{error}</div>}

                {profile && (
                    <>
                        <UserCard profile={profile} />

                        <h4>Owned Pets</h4>
                        {pets.length > 0 ? (
                            <div className="pet-slider">
                                <button onClick={handlePrev} disabled={pets.length <= 1 || currentPetIndex === 0}>
                                    &lt;
                                </button>

                                <PetMiniCard pet={pets[currentPetIndex]} />

                                <button onClick={handleNext} disabled={pets.length <= 1 || currentPetIndex === pets.length - 1}>
                                    &gt;
                                </button>
                            </div>
                        ) : (
                            <p>How sad... this user has no pets.</p>
                        )}
                    </>
                )}
                <button className="back-button" onClick={() => navigate(-1)}>
                    Back
                </button>
            </div>
        </div>
    );
};

export default UserProfile;
