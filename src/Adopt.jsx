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
        const { id, name, species, color, gender } = poundPets.find(pet => pet.id === petId)
        dispatch(adoptPet(id));
        console.log(id, name, species, color, gender)
        navigate('/pound/adopted', { 
            state: { 
                message: `You have successfully adopted ${name}, the ${capitalizeFirstLetter(color)} ${capitalizeFirstLetter(species)}!`,
                pet: {
                    species: species,
                    color: color,
                    gender: gender
                }
            },
            replace: true
        });    
    };

    return (
        <div>
            <div className="header">
                <div className="button-container-left">
                    <button onClick={() => navigate(-1)}>Back</button>
                </div>
                <h1>Adopt a Pet</h1>
            </div>

            <div>
                <p>These Pixelpets are ready for a fresh start and a loving new home! <br /> 
                    (No, they don't chew furniture or computer cords, we checked.)
                </p>
            </div>
            
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
                                <button className="confirm-button" onClick={() => handleAdopt(pet.id)}>Adopt Me!</button>
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