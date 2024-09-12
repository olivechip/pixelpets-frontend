import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPoundPets, adoptPet } from './redux/store'; 

const Adopt = () => {
    const { user } = useSelector((state) => state.user);
    const { poundPets, loading, error } = useSelector(state => state.pound);
    const dispatch = useDispatch();

    useEffect(() => {
        if (user) {
            dispatch(fetchPoundPets()); 
        }
    }, [dispatch]);

    const handleAdopt = (petId) => {
        dispatch(adoptPet(petId));
        // implement navigattion to success page
    };

    return (
        <div>
            <h1>Adopt a Pet</h1>

            {loading && <p>Loading pets...</p>} 
            {error && <div className="error">{error}</div>}

            {!loading && poundPets.length > 0 ? (
                <ul>
                    {poundPets.map((pet) => (
                        <li key={pet.id}>
                            <p>
                                **Name:** {pet.name} <br />
                                **Species:** {pet.species} <br />
                                **Color:** {pet.color} <br />
                                **Gender:** {pet.gender} <br />
                                <button onClick={() => handleAdopt(pet.id)}>Adopt</button>
                            </p> 
                        </li>
                    ))}
                </ul>
            ) : (
                <p>There are no pets available for adoption at the moment. Check back later!</p>
            )}
        </div>
    );
};

export default Adopt;