import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserPets, abandonPet } from './redux/store';
import { capitalizeFirstLetter } from './helpers/helpers';

const Abandon = () => {
    const { user } = useSelector((state) => state.user);
    const { pets, loading, error } = useSelector(state => state.pets);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            dispatch(fetchUserPets(user.id));
        }
    }, [user, dispatch]);

    const handleAbandon = (petId) => {
        const { id, name, color, species } = pets.find(pet => pet.id === petId)
        dispatch(abandonPet(id));
        navigate('/pound/abandoned', { 
            state: { message: `You have abandoned ${name}, the ${capitalizeFirstLetter(color)} ${capitalizeFirstLetter(species)}.` },
            replace: true
        });
    };

    return (
        <div>
            <h1>Abandon a Pet</h1>
            <p>We understand that sometimes circumstances change. If you can no longer care for your Pixel Pet, you can leave them here at the Pixel Pound.</p>

            {loading && <p>Loading your pets...</p>} 
            {error && <div className="error">{error}</div>}

            {!loading && pets.length > 0 ? (
                <div className="pet-cards-container"> 
                    {pets.map((pet) => (
                        <div key={pet.id} className="pet-card"> 
                            <Link to={`/pets/${pet.id}`}> 
                                <img src={pet.img_url} alt="" className="pet-image" />
                            </Link>
                            <div className="pet-details">
                                <h3><Link to={`/pets/${pet.id}`}>{pet.name}</Link></h3> 
                                <p>Species: {capitalizeFirstLetter(pet.species)}</p>
                                <p>Color: {capitalizeFirstLetter(pet.color)}</p> 
                                <p>Gender: {capitalizeFirstLetter(pet.gender)}</p>
                                <button onClick={() => handleAbandon(pet.id)}>Abandon</button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>You have no pets to abandon.</p>
            )}
        </div>
    );
};

export default Abandon;