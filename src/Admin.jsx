import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { capitalizeFirstLetter } from "./helpers/helpers";

const Admin = () => {
    const [ userResults, setUserResults ] = useState([]);
    const [ petResults, setPetResults ] = useState([]);
    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState(null);
    
    useEffect(() => {
        const fetchAdminData = async() => {
            setLoading(true);
            setError(null);

            try {
                const dataResponse = await fetch(`/api/admin`, { 
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!dataResponse.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await dataResponse.json();

                setUserResults(data[0]);
                setPetResults(data[1]);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        fetchAdminData();
    }, []);

    return (
        <div>
            <div className="header">
                <h1>Admin Data</h1>
            </div>

            {loading && <p>Loading results...</p>} 
            {error && <div className="error">{error}</div>}

            {/* Combined Results Section */}
            <div className="results-container">
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
                                        <b>Email: </b>{user.email}
                                    </p>
                                    <p>
                                        <b>Joined: </b>{new Date(user.created_at).toLocaleDateString()}
                                    </p>
                                    <p>
                                        <b>Last Updated: </b>{new Date(user.updated_at).toLocaleDateString()}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </>
                )}
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
                                        <p>
                                            Owner: {" "}
                                            {pet.owner_name ? (
                                                <Link to={`/users/${pet.owner_id}`}>{pet.owner_name}</Link>
                                            ) : (
                                                <Link to={"/pound"}>The Pixel Pound</Link>
                                            )}{" "}
                                        </p><br />
                                        <p>Species: {capitalizeFirstLetter(pet.species)}</p>
                                        <p>Color: {capitalizeFirstLetter(pet.color)}</p>
                                        <p>Gender: {capitalizeFirstLetter(pet.gender)}</p>
                                        <p>Birthdate: {pet.created_at ? new Date(pet.created_at).toLocaleDateString() : "Unknown"}</p>
                                        <br />
                                        <p>Happiness: {pet.happiness}</p>
                                        <p>Fullness: {pet.hunger}</p>
                                        <p>Popularity: {pet.popularity}</p>
                                        <br />
                                        <p>Last Played: {pet.last_played? new Date(pet.last_played).toLocaleString(): "Never"}</p>
                                        <p>Last Fed: {pet.last_fed ? new Date(pet.last_fed).toLocaleString() : "Never"}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default Admin;