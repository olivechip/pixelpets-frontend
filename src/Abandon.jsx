import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Abandon = () => {
    const { user } = useSelector((state) => state.user);
    const [pets, setPets] = useState([]);

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

        if (user) {
            fetchPets();
        }
    }, [user]);

    return (
        <div>
            <h1>Abandon a Pet</h1>
            <p>We understand that sometimes circumstances change. If you can no longer care for your Pixel Pet, you can leave them here at the Pixel Pound.</p>

            {pets.length > 0 ? (
                <ul>
                    {pets.map((pet) => (
                        <li key={pet.id}>
                            <p>
                                **Name:** {pet.name} <br />
                                **Species:** {pet.species} <br />
                                **Color:** {pet.color} <br />
                                **Gender:** {pet.gender} <br />
                                <Link to={`/pound/abandon/${pet.id}`}>
                                <button>Abandon</button>
                                </Link>
                            </p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>You have no pets to abandon.</p>
            )}
        </div>
    );
};

export default Abandon;