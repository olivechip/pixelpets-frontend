import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPetById, petAnotherPet } from './redux/store';
import { capitalizeFirstLetter } from './helpers/helpers';

const PetDetail = () => {
    const { petId, petName } = useParams();
    const { user } = useSelector(state => state.user);
    const { selectedPet: pet, loading, error } = useSelector(state => state.pets);
    const dispatch = useDispatch();
        
    useEffect(() => {
        dispatch(fetchPetById(petId));
    }, [ petId, dispatch]);

    const isOwner = user && pet && user.id === pet.owner_id;

    return (
        <div>
            <div className="header">
                <h1>Pet Details</h1>
            </div>

            {loading && <p>Loading pet details...</p>}
            {error && <div className="error">{error}</div>}
            
            {pet && (
                <div className="pet-detail-card">
                    <img src={pet.img_url} alt={`${pet.species}_${pet.color}_${pet.gender}.png`} className="pet-image" />
                    <div className="pet-details">
                        <h3>{pet.name}</h3> 
                        <p>
                            Owner: {" "}
                            {pet.owner_name ? (
                                <Link to={`/users/${pet.owner_id}`}>{pet.owner_name}</Link>
                            ) : (
                                <Link to={"/pound"}>The Pixel Pound</Link>
                            )}{" "}
                            {isOwner && "(me)"}
                        </p><br />
                        <p>Species: {capitalizeFirstLetter(pet.species)}</p>
                        <p>Color: {capitalizeFirstLetter(pet.color)}</p>
                        <p>Gender: {capitalizeFirstLetter(pet.gender)}</p>
                        <p>Birthdate: {pet.created_at ? new Date(pet.created_at).toLocaleDateString() : "Unknown"}</p>
                        <br />
                        <p>Happiness: {pet.happiness}</p>
                        <p>Fullness: {pet.hunger}</p>
                        <p>Popularity: {pet.popularity}</p>
                        <br />
                        <p>Last Played: {pet.last_played? new Date(pet.last_played).toLocaleString(): "Never"}</p>
                        <p>Last Fed: {pet.last_fed ? new Date(pet.last_fed).toLocaleString() : "Never"}</p>

                        {pet.owner_id && !isOwner && (
                            <button onClick={() => dispatch(petAnotherPet(pet.id))}>
                                Pet
                            </button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default PetDetail;