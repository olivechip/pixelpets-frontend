import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom';
import { capitalizeFirstLetter } from './helpers/helpers';

const SearchResults = () => {
    const { query } = useParams();
    const [ petResults, setPetResults ] = useState(null);
    const [ userResults, setUserResults ] = useState(null);
    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState(null);
    
    useEffect(() => {
        const fetchSearchResults = async() => {
            setLoading(true);
            setError(null);

            try {
                const token = localStorage.getItem('token');
                
                const petResponse = await fetch(`/api/pets/search`, { 
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({ keyword: query }),
                });
                
                const userResponse = await fetch(`/api/users/search`, { 
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({ keyword: query }),
                });

                if (!petResponse.ok || !userResponse.ok) {
                    throw new Error('Network response was not ok');
                }

                const petData = await petResponse.json();
                const userData = await userResponse.json();

                setPetResults(petData);
                setUserResults(userData);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };
    fetchSearchResults();
    }, [query]);
    
    return (
        <div>
            <div className="header">
                <h1>Search Results</h1>
            </div>

            {loading && <p>Loading results...</p>} 
            {error && <div className="error">{error}</div>}

            {/* Combined Results Section */}
            <div className="results-container">
            {/* Pet Results */}
            {!loading && petResults !== null && petResults.length > 0 && (
                <>
                    <h2>Pets</h2>
                    <div className="pet-cards-container">
                        {petResults.map(pet => (
                            <div key={pet.id} className="pet-card"> 
                                <Link to={`/pets/${pet.id}`}>
                                    <img src={pet.img_url} alt={`${pet.species}_${pet.color}_${pet.gender}.png`} className="pet-image" />
                                </Link>
                                <div className="pet-details">
                                    <h3><Link to={`/pets/${pet.id}`}>{pet.name}</Link></h3>
                                    <p>Species: {capitalizeFirstLetter(pet.species)}</p>
                                    <p>Color: {capitalizeFirstLetter(pet.color)}</p>
                                    <p>Gender: {capitalizeFirstLetter(pet.gender)}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}

            {/* User Results */}
            {!loading && userResults !== null && userResults.length > 0 && (
                <>
                    <h2>Users</h2>
                    <div className="user-results">
                        {userResults.map(user => (
                            <div key={user.id} className="user-card">
                                <p>
                                    <b>Username: </b>
                                    <Link to={`/users/${user.id}`}>
                                        {user.username}
                                    </Link>
                                </p>
                                <p>
                                    <b>Joined: </b>{new Date(user.created_at).toLocaleDateString()}
                                </p>
                            </div>
                        ))}
                    </div>
                </>
            )}

            {/* No Results Message */}
            {!loading && (!petResults || petResults.length === 0) && (!userResults || userResults.length === 0) && (
                <p>No results found for your search term.</p>
            )}
        </div>
        </div>
    );
}

export default SearchResults;