import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserPets, abandonPet } from './redux/store';
import { capitalizeFirstLetter } from './helpers/helpers';

const Abandon = () => {
    const [ confirmAbandon, setConfirmAbandon ] = useState({});
    const { user } = useSelector((state) => state.user);
    const { pets, loading, error } = useSelector(state => state.pets);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            dispatch(fetchUserPets(user.id));
        }
    }, [user, dispatch]);

    const handleAbandonClick = (petId) => {
        setConfirmAbandon({ ...confirmAbandon, [petId]: true });
    };

    const handleCancelAbandon = (petId) => {
        setConfirmAbandon({ ...confirmAbandon, [petId]: false });
    };

    const handleAbandon = (petId) => {
        const { id, name, species, color, gender } = pets.find(pet => pet.id === petId)
        dispatch(abandonPet(id));
        navigate('/pound/abandoned', { 
            state: { 
                message: `You have abandoned ${name}, the ${capitalizeFirstLetter(color)} ${capitalizeFirstLetter(species)}.`,
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
                <div class="button-container-left">
                    <button onClick={() => navigate(-1)}>Back</button>
                </div>
                <h1>Abandon a Pet</h1>
            </div>

            <div>
                <p>We understand that sometimes circumstances change. <br />
                    If you can no longer care for your Pixelpet, you can leave them here at the Pixel Pound.
                </p>
            </div>

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
                                {confirmAbandon[pet.id] ? ( 
                                    <>
                                        <p style={{ color: "red" }}>Are you sure you want to abandon this pet?</p> 
                                        <button className="cancel-button" onClick={() => handleCancelAbandon(pet.id)}>Cancel</button><br />
                                        <button className="delete-button" onClick={() => handleAbandon(pet.id)}>Confirm Abandon</button>
                                    </>
                                ) : ( 
                                    <button className="delete-button" onClick={() => handleAbandonClick(pet.id)}>Abandon</button> 
                                )}
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