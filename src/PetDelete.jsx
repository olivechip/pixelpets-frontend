import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserPets, deletePet } from './redux/store';
import { capitalizeFirstLetter } from './helpers/helpers';

const PetDelete = () => {
    const [ confirmDelete, setConfirmDelete ] = useState({});
    const { user } = useSelector((state) => state.user);
    const { pets, loading, error } = useSelector(state => state.pets);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            dispatch(fetchUserPets(user.id));
        }
    }, [user, dispatch]);

    const handleDeleteClick = (petId) => {
        setConfirmDelete({ ...confirmDelete, [petId]: true });
    };

    const handleCancelDelete = (petId) => {
        setConfirmDelete({ ...confirmDelete, [petId]: false });
    };
    const handleDelete = (petId) => {
        const { id, name, color, species } = pets.find(pet => pet.id === petId);
        dispatch(deletePet(id));
        navigate('/lab/deleted', {
            state: { message: `You have deleted ${name}, the ${color} ${species}.` },
            replace: true
        });
    };

    return (
        <div>
            <h1>Delete a Pet</h1>
            <div>
                <p>Deleting a Pixelpet is a permanent and irreversible action.</p>
                <p>Please consider putting your pet up for adoption at the <Link to="/pound">Pixel Pound</Link> instead, where it can find a new loving home.</p>
                <p>If you're absolutely certain you want to proceed with deletion, you can do so here.</p>
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
                                {confirmDelete[pet.id] ? ( 
                                    <>
                                        <p style={{ color: "red" }}>Are you sure you want to delete this pet?</p> 
                                        <button style={{ margin: 0 }} onClick={() => handleCancelDelete(pet.id)}>Cancel</button><br />
                                        <button onClick={() => handleDelete(pet.id)}>Confirm Delete</button>
                                    </>
                                ) : ( 
                                    <button onClick={() => handleDeleteClick(pet.id)}>Delete</button> 
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>You have no pets to delete.</p>
            )}
        </div>
    );
};

export default PetDelete;