import { Link } from 'react-router-dom';
import { LuHeart, LuUtensils, LuThumbsUp } from "react-icons/lu";

import './styles/petCard.css';

const PetCard = ({ pet }) => {
    return (
        <div className="pet-card">
            <Link to={`/pets/${pet.id}`}>
                <img src={pet.img_url} alt={`${pet.species}_${pet.color}_${pet.gender}.png`} className="pet-image" />
            </Link>
            <h3 className="pet-name">
                {pet.name}
            </h3>

            <div className="pet-status">
                <span className="status-item">
                    <LuHeart className="heart-icon" />{pet.happiness}%
                </span>
                <span className="status-item">
                    <LuUtensils className="utensils-icon" />{pet.hunger}%
                </span>
                <span className="status-item">
                    <LuThumbsUp className="thumbs-icon" />{pet.popularity}
                </span>
            </div>

        </div>
    );
};

export default PetCard;
