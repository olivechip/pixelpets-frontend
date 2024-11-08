import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserPets, abandonPet } from './redux/store';
import { capitalizeFirstLetter } from './helpers/helpers';

import PetMiniCard from './PetMiniCard';

import './styles/pound.css';

const Abandon = () => {
    const [currentPetIndex, setCurrentPetIndex] = useState(0);
    const [confirmAbandon, setConfirmAbandon] = useState(false);
    const { user } = useSelector((state) => state.user);
    const { pets, loading, error } = useSelector(state => state.pets);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            dispatch(fetchUserPets(user.id));
        }
    }, [user, dispatch]);

    const handlePrevPet = () => {
        setCurrentPetIndex((prevIndex) =>
            prevIndex === 0 ? pets.length - 1 : prevIndex - 1
        );
    };

    const handleNextPet = () => {
        setCurrentPetIndex((prevIndex) =>
            prevIndex === pets.length - 1 ? 0 : prevIndex + 1
        );
    };

    const handleAbandonClick = (petId) => {
        setConfirmAbandon(true);
    };

    const handleCancelAbandon = () => {
        setConfirmAbandon(false);
    };

    const handleAbandon = (petId) => {
        const pet = pets.find(pet => pet.id === petId);
        if (pet) {
            const { id, name, species, color, gender } = pet;
            dispatch(abandonPet(id));
            navigate('/pound/abandoned', {
                state: {
                    message: `You have abandoned ${name}, the ${capitalizeFirstLetter(color)} ${capitalizeFirstLetter(species)}.`,
                    pet: { species, color, gender }
                },
                replace: true
            });
        }
    };

    return (
        <div className="pound-container">
            <div className="pound-white-background">
                <div className="header">
                    <h2>Abandon a Pixelpet</h2>
                    <p>If you can't care for your Pixelpet, you can leave them at the Pixel Pound.</p>
                </div>

                {loading && <p>Loading your pets...</p>}
                {error && <div className="error">{error}</div>}

                {!loading && pets.length > 0 ? (
                    <div className="pet-slider">
                        <button onClick={handlePrevPet} disabled={pets.length <= 1 || confirmAbandon === true}>
                            &lt;
                        </button>

                        <PetMiniCard pet={pets[currentPetIndex]} />

                        <button onClick={handleNextPet} disabled={pets.length <= 1 || confirmAbandon === true}>
                            &gt;
                        </button>
                    </div>
                ) : (
                    <p>You have no pets to abandon.</p>
                )}

                {confirmAbandon ? (
                    <p className='are-you-sure-delete'>Are you sure?</p>
                ) : null}

                <div className="pound-buttons">
                    {confirmAbandon ? (
                        <>
                            <button
                                className="pound-button"
                                onClick={handleCancelAbandon}
                            >
                                Cancel
                            </button>
                            <button
                                className="delete-button"
                                onClick={() => handleAbandon(pets[currentPetIndex]?.id)}
                            >
                                Abandon
                            </button>
                        </>

                    ) : (
                        <button
                            className="pound-button"
                            onClick={() => handleAbandonClick(pets[currentPetIndex]?.id)}
                            disabled={!pets[currentPetIndex]}
                        >
                            Abandon
                        </button>
                    )}
                </div>

                <div className="back-link">
                    <button className="back-button" onClick={() => navigate(-1)}>Back</button>
                </div>
            </div>
        </div>
    );
};

export default Abandon;
