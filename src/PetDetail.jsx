import { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPetById, petAnotherPet } from './redux/store';

import PetData from './PetData';

import './styles/petDetail.css';

const PetDetail = () => {
    const { petId } = useParams();
    const { user } = useSelector(state => state.user);
    const { selectedPet: pet, loading, error } = useSelector(state => state.pets);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchPetById(petId));
    }, [petId, dispatch]);

    const isOwner = user && pet && user.id === pet.owner_id;

    return (
        <>
            <div className="pet-detail-container">
                <div className="pet-detail-white-background">
                    <div className="header">
                        <h2>Pet Details</h2>
                    </div>

                    {loading && <p>Loading pet details...</p>}
                    {error && <div className="error">{error}</div>}

                    {pet && (
                        <>
                            <PetData pet={pet} isOwner={isOwner} />

                            {!isOwner && pet.owner_id && (
                                <div className="pet-actions">
                                    <button
                                        onClick={() => dispatch(petAnotherPet(pet.id))}
                                        className="action-button"
                                    >
                                        Pet
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>

            <button className="back-button" onClick={() => navigate(-1)}>
                Back
            </button>
        </>
    );
};

export default PetDetail;
