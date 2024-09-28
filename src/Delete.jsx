import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserPets, deletePet } from './redux/store';

const Delete = () => {
    const { user } = useSelector((state) => state.user);
    const { pets, loading, error } = useSelector(state => state.pets);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            dispatch(fetchUserPets(user.id));
        }
    }, [user, dispatch]);

    const handleDelete = (petId) => {
        const { id, name, color, species } = pets.find(pet => pet.id === petId);
        dispatch(deletePet(id));
        navigate('/lab/deleted', { // Adjust route as needed
            state: { message: `You have deleted ${name}, the ${color} ${species}.` },
            replace: true
        });
    };

    return (
        <div>
            <h1>Delete a Pet</h1>
            <p>
                Sometimes experiments don't go as planned. 
                If you need to delete a Pixelpet, you can do so here.
            </p>

            {loading && <p>Loading your pets...</p>}
            {error && <div className="error">{error}</div>}

            {!loading && pets.length > 0 ? (
                <ul>
                    {pets.map((pet) => (
                        <li key={pet.id}>
                            <p>
                                **Name:** <Link to={`/pets/${pet.id}`}>{pet.name}</Link> <br />
                                **Species:** {pet.species} <br />
                                **Color:** {pet.color} <br />
                                **Gender:** {pet.gender} <br />
                                <button onClick={() => handleDelete(pet.id)}>Delete</button>
                            </p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>You have no pets to delete.</p>
            )}
        </div>
    );
};

export default Delete;