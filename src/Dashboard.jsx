import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserPets, playWithPet, feedPet } from './redux/store';
import { capitalizeFirstLetter } from './helpers/helpers';

const Dashboard = () => {
    const location = useLocation();
    const { message } = location.state || {};
    const { user } = useSelector(state => state.user);
    const { pets, loading, error } = useSelector(state => state.pets);
    const dispatch = useDispatch();

    useEffect(() => {
        if (user) {
            dispatch(fetchUserPets(user.id));
        }
    }, [user, dispatch]);

    return (
        <div>
            <div className="header">
                <h1>Dashboard</h1>
            </div>

            {loading && <p>Loading pets...</p>}
            {error && <div className="error">{error}</div>}

            { message ? (
                <div>{message}</div>
            ) : null }

            {!loading && pets.length > 0 ? (
            <div className="pet-cards-container">
                {pets.map((pet) => (
                    <div key={pet.id} className="pet-card">
                        <Link to={`/pets/${pet.id}`}>
                            <img src={pet.img_url} alt={`${pet.species}_${pet.color}_${pet.gender}.png`} className="pet-image" />
                        </Link>
                        <div className="pet-details">
                            <h3><Link to={`/pets/${pet.id}`}>{pet.name}</Link></h3>
                            <p>Species: {capitalizeFirstLetter(pet.species)}</p>
                            <p>Color: {capitalizeFirstLetter(pet.color)}</p>
                            <p>Gender: {capitalizeFirstLetter(pet.gender)}</p>
                            <br />
                            {/* <h4>Stats</h4> */}
                            <p>Happiness: {pet.happiness}</p>
                            <p>Fullness: {pet.hunger}</p>
                            <p>Popularity: {pet.popularity}</p>

                            {/* Irrelevant at the moment */}
                            {/* <p>Last Played: {pet.last_played? new Date(pet.last_played).toLocaleString(): "Never"}</p>
                            <p>Last Fed: {pet.last_fed ? new Date(pet.last_fed).toLocaleString() : "Never"}</p> */}

                            <button onClick={() =>dispatch(playWithPet({ petId: pet.id, userId: user.id }))}>Play</button>{" "}
                            <button onClick={() =>dispatch(feedPet({ petId: pet.id, userId: user.id }))}>Feed</button>{" "}
                        </div>
                    </div>
                ))}
            </div>
            ) : (
            <p>
                You have no pets. <br />
                
                Visit the <Link to="/lab">Lab</Link> to generate one,
                or the <Link to="/pound">Pound</Link> to adopt one!
            </p>
            )}
        </div>
    );
};

export default Dashboard;