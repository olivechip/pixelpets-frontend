import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPetById, petAnotherPet } from './redux/store';

const PetDetail = () => {
    const { petId } = useParams();
    const { user } = useSelector(state => state.user);
    const { selectedPet: pet, loading, error } = useSelector(state => state.pets);
    const dispatch = useDispatch();
        
    console.log(user, petId, pet)
    useEffect(() => {
        dispatch(fetchPetById(petId));
    }, [ petId, dispatch]);

    const isOwner = user && pet && user.id === pet.owner_id;

    return (
        <div>
            <h1>Pet Details</h1>

            {loading && <p>Loading pet details...</p>}
            {error && <div className="error">{error}</div>}
            
            {pet && (
                <>
                    <p>
                        <b>Owned By: </b> 
                        {pet.owner_name ? ( 
                            <Link to={`/users/${pet.owner_id}`}>{pet.owner_name}</Link> 
                        ) : ( 
                            <Link to={'/pound'}>The Pixel Pound</Link> 
                        )} 
                        {isOwner && " (me)"}
                    </p>
                    <p>
                        <b>Pet Info</b> <br />
                        **Name:** {pet.name} <br />
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
                    {pet.owner_id && !isOwner && (
                        <button onClick={() => dispatch(petAnotherPet(pet.id))}>Pet</button> 
                    )}
                </>
            )}
        </div>
    );
};

export default PetDetail;