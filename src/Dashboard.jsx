import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const { user } = useSelector(state => state.user);
    const [ pets, setPets ] = useState([]);

    useEffect(() => {
        const fetchPets = async () => {
            if (user && user.id) {
                const token = localStorage.getItem('token');
                try {
                    const response = await fetch(`/api/users/${user.id}/pets`, {
                        headers: {
                            'Authorization': `${token}`
                        }
                    });
                    if (response.ok) {
                        const data = await response.json();
                        setPets(data);
                    } else {
                        console.error('Error fetching pets:', response.status, response.statusText);
                    }
                } catch (error) {
                    console.error('Error fetching pets:', error);
                }
            }
        };

        if (user) { // Only fetch pets if the user is logged in
            fetchPets();
        }
    }, [user]);

    return (
        <div>
            <h1>Dashboard</h1>
            <div>
                <Link to="/pound">Pound</Link>
            </div>

            {pets.length > 0 ? (
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
                                **Last Fed:** {pet.last_fed ? new Date(pet.last_fed).toLocaleString() : 'Never'} 
                            </p> 
                        </li>
                    ))}
                </ul>
            ) : (
                <p>You have no pets yet. Visit the <Link to="/pound">Pound</Link> to adopt one!</p>
            )}
        </div>
    );
}

export default Dashboard;