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
                console.log(`this is id: `, user.id, 'this is token: ', token)
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
                        <li key={pet.id}>{pet.name}</li>
                    ))}
                </ul>
            ) : (
                <p>You have no pets yet. Visit the <Link to="/pound">Pound</Link> to adopt one!</p>
            )}
        </div>
    );
}

export default Dashboard;