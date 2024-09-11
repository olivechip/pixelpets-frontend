import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Adopt = () => {
    const [pets, setPets] = useState([]);

    useEffect(() => {
        const fetchPoundPets = async () => {
            try {
                const response = await fetch('/api/pound');

                if (response.ok) {
                    const data = await response.json();
                    setPets(data);
                } else {
                    console.error('Error fetching pound pets:', response.status, response.statusText);
                }
            } catch (error) {
                console.error('Error fetching pound pets:', error);
            }
        };

        fetchPoundPets();
    }, []);

    return (
        <div>
            <h1>Adopt a Pet</h1>
            {pets.length > 0 ? (
                <ul>
                {pets.map(pet => (
                    <li key={pet.id}>
                        <p>
                            **Name:** {pet.name} <br />
                            **Species:** {pet.species} <br />
                            **Color:** {pet.color} <br />
                            **Gender:** {pet.gender} <br />
                            <Link to={`/pets/${pet.id}/adopt`}> {/* Link to adopt this specific pet */}
                            <button>Adopt</button>
                            </Link>
                        </p> 
                    </li>
                ))}
                </ul>
            ) : (
                <p>There are no pets available for adoption at the moment. Check back later!</p>
            )}
        </div>
    );
};

export default Adopt;