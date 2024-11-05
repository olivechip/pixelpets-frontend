import { Link } from 'react-router-dom';
import { capitalizeFirstLetter } from './helpers/helpers';

import './styles/petData.css';

const PetData = ({ pet, isOwner }) => {
    return (
        <div className="pet-data-card">
            <div className="pet-attributes">
                <div className="data-item">
                    <span className="data-label">Owner:</span>{" "}
                    {pet.owner_name ? (
                        <Link to={`/users/${pet.owner_id}`}>{pet.owner_name}</Link>
                    ) : (
                        <Link to={"/pound"}>The Pixel Pound</Link>
                    )}{" "}
                    {isOwner && "(me)"}
                </div>
                <div className="data-item">
                    <span className="data-label">Species:</span> {capitalizeFirstLetter(pet.species)}
                </div>
                <div className="color-gender-row">
                    <div className="data-item">
                        <span className="data-label">Color:</span> {capitalizeFirstLetter(pet.color)}
                    </div>
                    <div className="data-item">
                        <span className="data-label">Gender:</span> {capitalizeFirstLetter(pet.gender)}
                    </div>
                </div>
                <div className="data-item">
                    <span className="data-label">Birthdate:</span> {pet.created_at ? new Date(pet.created_at).toLocaleDateString() : "Unknown"}
                </div>
            </div>
        </div>
    );
};

export default PetData;
