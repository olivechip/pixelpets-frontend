import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserPets, adoptPet } from './redux/store';
import { capitalizeFirstLetter } from './helpers/helpers';

import PetMiniCard from './PetMiniCard';

import './styles/pound.css';

const Adopt = () => {
    const [currentPetIndex, setCurrentPetIndex] = useState(0);
    const [confirmAdopt, setConfirmAdopt] = useState(false);
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

    const handleAdoptClick = (petId) => {
        setConfirmAdopt(true);
    };

    const handleCancelAdopt = () => {
        setConfirmAdopt(false);
    };

    const handleAdopt = (petId) => {
        const pet = pets.find(pet => pet.id === petId);
        if (pet) {
            const { id, name, species, color, gender } = pet;
            dispatch(adoptPet(id)); // Assuming you have an adoptPet action
            navigate('/pound/adopted', {
                state: {
                    message: `You have adopted ${name}, the ${capitalizeFirstLetter(color)} ${capitalizeFirstLetter(species)}.`,
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
                    <h2>Adopt a Pixelpet</h2>
                    <p>If you want to give a Pixelpet a forever home, you can adopt them from the Pixel Pound.</p>
                </div>

                {loading && <p>Loading pets...</p>}
                {error && <div className="error">{error}</div>}

                {!loading && pets.length > 0 ? (
                    <div className="pet-slider">
                        <button onClick={handlePrevPet} disabled={pets.length <= 1 || confirmAdopt === true}>
                            &lt;
                        </button>

                        <PetMiniCard pet={pets[currentPetIndex]} />

                        <button onClick={handleNextPet} disabled={pets.length <= 1 || confirmAdopt === true}>
                            &gt;
                        </button>
                    </div>
                ) : (
                    <p>You have no pets to adopt.</p>
                )}

                {confirmAdopt ? (
                    <p className='are-you-sure-confirm'>Are you sure?</p>
                ) : null}

                <div className="pound-buttons">
                    {confirmAdopt ? (
                        <>
                            <button
                                className="pound-button"
                                onClick={handleCancelAdopt}
                            >
                                Cancel
                            </button>
                            <button
                                className="confirm-button"
                                onClick={() => handleAdopt(pets[currentPetIndex]?.id)}
                            >
                                Adopt
                            </button>
                        </>
                    ) : (
                        <button
                            className="pound-button"
                            onClick={() => handleAdoptClick(pets[currentPetIndex]?.id)}
                            disabled={!pets[currentPetIndex]}
                        >
                            Adopt
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

export default Adopt;
