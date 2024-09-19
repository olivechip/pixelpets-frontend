import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserById, fetchUserPets } from './redux/store';

const UserProfile = () => {
    const { userId } = useParams();
    const { profile, loading, error } = useSelector(state => state.userProfile);
    const { pets } = useSelector(state => state.pets);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUserById(userId))
        dispatch(fetchUserPets(userId));
    }, [userId, dispatch]);

    return (
        <div>
            <h1>User Profile</h1>

            {loading && <p>Loading user profile...</p>}
            {error && <div className="error">{error}</div>}

            {profile && (
                <>
                    <p>
                        <b>Username:</b> {profile.username}
                    </p>
                    <p>
                        <b>Joined:</b> {new Date(profile.created_at).toLocaleDateString()}
                    </p>

                    {/* Pets Owned Info */}
                    <h2>Pets</h2>
                    {pets.length > 0 ? (
                    <ul>
                        {pets.map(pet => (
                            <li key={pet.id}>
                                <p> 
                                    <b>Pet Info</b> <br />
                                    **Name:** <Link to={`/pets/${pet.id}`}>{pet.name}</Link> <br />
                                    **Species:** {pet.species} <br />
                                    **Color:** {pet.color} <br />
                                    **Gender:** {pet.gender} <br />
                                </p>
                                <p>
                                    <b>Stats</b> <br />
                                    **Happiness:** {pet.happiness} <br />
                                    **Hunger:** {pet.hunger} <br />
                                    **Popularity:** {pet.popularity} <br />
                                    **Last Played:** {pet.last_played ? new Date(pet.last_played).toLocaleString() : 'Never'} <br />
                                    **Last Fed:** {pet.last_fed ? new Date(pet.last_fed).toLocaleString() : 'Never'} <br />
                                </p> 
                            </li>
                        ))}
                    </ul>
                    ) : (
                        <p>How sad... this user has no pets.</p>
                    )}
                </>
            )}
        </div>
    );
};

export default UserProfile;