import { useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPoundPets, adoptPet } from './redux/store'; 
import { capitalizeFirstLetter } from './helpers/helpers';

const Adopt = () => {
    const { user } = useSelector((state) => state.user);
    const { poundPets, loading, error } = useSelector(state => state.pound);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            dispatch(fetchPoundPets()); 
        }
    }, [dispatch]);

    const handleAdopt = (petId) => {
        const { id, name, color, species } = poundPets.find(pet => pet.id === petId)
        dispatch(adoptPet(id));
        navigate('/pound/adopted', { 
            state: { message: `You have adopted ${name}, the ${capitalizeFirstLetter(color)} ${capitalizeFirstLetter(species)}!` },
            replace: true
        });    
    };

    return (
        <div>
            <h1>Adopt a Pet</h1>

            {loading && <p>Loading pets...</p>} 
            {error && <div className="error">{error}</div>}

            {!loading && typeof(poundPets) === 'object' && poundPets.length > 0 ? (
                <div className="pet-cards-container">
                    {poundPets.map((pet) => (
                        <div key={pet.id} className="pet-card">
                            <Link to={`/pets/${pet.id}`}>
                                <img src={pet.img_url} alt={`${pet.species}_${pet.color}_${pet.gender}.png`} className="pet-image" />
                            </Link>
                            <div className="pet-details">
                                <h3><Link to={`/pets/${pet.id}`}>{pet.name}</Link></h3> 
                                <p>Species: {capitalizeFirstLetter(pet.species)}</p>
                                <p>Color: {capitalizeFirstLetter(pet.color)}</p>
                                <p>Gender: {capitalizeFirstLetter(pet.gender)}</p>
                                <button onClick={() => handleAdopt(pet.id)}>Adopt</button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>There are no pets available for adoption at the moment. Check back later!</p>
            )}
        </div>
    );
};

export default Adopt;