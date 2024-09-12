import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserPets, abandonPet } from './redux/store';

const Abandon = () => {
    const { user } = useSelector((state) => state.user);
    const { pets, loading, error } = useSelector(state => state.pets);
    const dispatch = useDispatch();

    useEffect(() => {
        if (user) {
            dispatch(fetchUserPets(user.id));
        }
    }, [user, dispatch]);

    const handleAbandon = (petId) => {
        dispatch(abandonPet(petId));
        // implement navigattion to success page
    };

    return (
        <div>
            <h1>Abandon a Pet</h1>
            <p>We understand that sometimes circumstances change. If you can no longer care for your Pixel Pet, you can leave them here at the Pixel Pound.</p>

            {loading && <p>Loading your pets...</p>} 
            {error && <div className="error">{error}</div>}

            {!loading && pets.length > 0 ? (
                <ul>
                    {pets.map((pet) => (
                        <li key={pet.id}>
                            <p>
                                **Name:** {pet.name} <br />
                                **Species:** {pet.species} <br />
                                **Color:** {pet.color} <br />
                                **Gender:** {pet.gender} <br />
                                <button onClick={() => handleAbandon(pet.id)}>Abandon</button>
                            </p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>You have no pets to abandon.</p>
            )}
        </div>
    );
};

export default Abandon;