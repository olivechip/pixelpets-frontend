import { Link } from 'react-router-dom';

import './styles/petMiniCard.css';

const PetMiniCard = ({ pet }) => {
    return (
        <div className="pet-mini-card">
            <Link to={`/pets/${pet.id}`}>
                <img src={pet.img_url} alt={`${pet.species}_${pet.color}_${pet.gender}.png`} className="pet-mini-image" />
            </Link>
            <h3 className="pet-mini-name">
                {pet.name}
            </h3>
        </div>
    );
};

export default PetMiniCard;
