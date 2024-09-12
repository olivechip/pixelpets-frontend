import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { fetchUserPets, playWithPet, feedPet } from './redux/store';

const Dashboard = () => {
    const { user } = useSelector(state => state.user);
    const { pets, loading, error } = useSelector(state => state.pets);
    const dispatch = useDispatch();
    const location = useLocation();
    const { message } = location.state || {};

    useEffect(() => {
        if (user) {
            dispatch(fetchUserPets(user.id));
        }
    }, [user, dispatch]);

    return (
        <div>
            <h1>Dashboard</h1>
            <div>
                <Link to="/pound">Pound</Link>
            </div>

            {loading && <p>Loading pets...</p>}
            {error && <div className="error">{error}</div>}

            { message ? (
                <div className="error">{message}</div>
            ) : null }

            {!loading && pets.length > 0 ? (
                <ul>
                    {pets.map(pet => (
                        <li key={pet.id}>
                            <p> 
                                **Name:** {pet.name} <br />
                                **Species:** {pet.species} <br />
                                **Color:** {pet.color} <br />
                                **Gender:** {pet.gender} <br />
                                **Happiness:** {pet.happiness} <br />
                                **Hunger:** {pet.hunger} <br />
                                **Last Played:** {pet.last_played ? new Date(pet.last_played).toLocaleString() : 'Never'} <br />
                                **Last Fed:** {pet.last_fed ? new Date(pet.last_fed).toLocaleString() : 'Never'} <br />
                                <button onClick={() => dispatch(playWithPet(pet.id))}>Play</button> <br />
                                <button onClick={() => dispatch(feedPet(pet.id))}>Feed</button> <br />
                            </p> 
                        </li>
                    ))}
                </ul>
            ) : (
                <p>You have no pets yet. Visit the <Link to="/pound">Pound</Link> to adopt one!</p>
            )}
        </div>
    );
};

export default Dashboard;