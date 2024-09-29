import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserById, fetchUserPets, petAnotherPet } from './redux/store';
import { capitalizeFirstLetter } from './helpers/helpers';

const UserProfile = () => {
    const { user } = useSelector(state => state.user);
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
                    <h1>Owned Pets</h1>
                    {pets.length > 0 ? (
                        <div className="pet-cards-container">
                            {pets.map((pet) => {
                                const isOwner = user && user.id === pet.owner_id;
                                return (
                                    <div key={pet.id} className="pet-card">
                                        <Link to={`/pets/${pet.id}`}>
                                            <img
                                                src={pet.img_url}
                                                alt={`${pet.species}_${pet.color}_${pet.gender}.png`}
                                                className="pet-image"
                                            />
                                        </Link>
                                        <div className="pet-details">
                                            <h3><Link to={`/pets/${pet.id}`}>{pet.name}</Link></h3>
                                            <p>Species: {capitalizeFirstLetter(pet.species)}</p>
                                            <p>Color: {capitalizeFirstLetter(pet.color)}</p>
                                            <p>Gender: {capitalizeFirstLetter(pet.gender)}</p>
                                            <br />
                                            {/* <h4>Stats</h4> */}
                                            <p>Happiness: {pet.happiness}</p>
                                            <p>Hunger: {pet.hunger}</p>
                                            <p>Popularity: {pet.popularity}</p>

                                            {/* Irrelevant at the moment */}
                                            {/* <p>Last Played: {pet.last_played? new Date(pet.last_played).toLocaleString(): "Never"}</p>
                                            <p>Last Fed: {pet.last_fed ? new Date(pet.last_fed).toLocaleString() : "Never"}</p> */}

                                            {pet.owner_id && !isOwner && (
                                                <button onClick={() => dispatch(petAnotherPet(pet.id))}>
                                                    Pet
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        ) : (
                        <p>How sad... this user has no pets.</p>
                    )}
                </>
            )}
        </div>
    );
};

export default UserProfile;