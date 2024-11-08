import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'

import UserCard from './UserCard';
import PetMiniCard from './PetMiniCard';

import './styles/searchResults.css';

const SearchResults = () => {
    const { query } = useParams();
    const [petResults, setPetResults] = useState([]);
    const [userResults, setUserResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentUserIndex, setCurrentUserIndex] = useState(0);
    const [currentPetIndex, setCurrentPetIndex] = useState(0);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchSearchResults = async () => {
            setLoading(true);
            setError(null);

            try {
                const token = localStorage.getItem('token');
                const BASE_URL = import.meta.env.VITE_BACKEND_URL;
                const response = await fetch(`${BASE_URL}/search`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({ keyword: query }),
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setUserResults(data[0] || []);
                setPetResults(data[1] || []);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        fetchSearchResults();
    }, [query]);

    // Handlers for user slider navigation
    const handlePrevUser = () => {
        setCurrentUserIndex((prevIndex) => (prevIndex === 0 ? userResults.length - 1 : prevIndex - 1));
    };

    const handleNextUser = () => {
        setCurrentUserIndex((prevIndex) => (prevIndex === userResults.length - 1 ? 0 : prevIndex + 1));
    };

    // Handlers for pet slider navigation
    const handlePrevPet = () => {
        setCurrentPetIndex((prevIndex) => (prevIndex === 0 ? petResults.length - 1 : prevIndex - 1));
    };

    const handleNextPet = () => {
        setCurrentPetIndex((prevIndex) => (prevIndex === petResults.length - 1 ? 0 : prevIndex + 1));
    };

    return (
        <div className="search-results-container">
            <div className="search-results-white-background">
                <div className="search-results-header">
                    <h2>Search Results</h2>
                    <p>for '{query}'...</p>
                </div>

                {loading && <p>Loading results...</p>}
                {error && <div className="error">{error.message}</div>}

                <div className="results-container">

                    {/* User Slider */}
                    {!loading && userResults.length > 0 ? (
                        <>
                            <h4>Users</h4>
                            <div className="user-slider">
                                <button onClick={handlePrevUser}>
                                    &lt;
                                </button>

                                <UserCard profile={userResults[currentUserIndex]} />

                                <button onClick={handleNextUser}>
                                    &gt;
                                </button>
                            </div>
                        </>
                    ) : (
                        !loading && <p>No users found.</p>
                    )}

                    {/* Pet Slider */}
                    {!loading && petResults.length > 0 ? (
                        <>
                            <h4>Pets</h4>
                            <div className="pet-slider">
                                <button onClick={handlePrevPet}>
                                    &lt;
                                </button>

                                <PetMiniCard pet={petResults[currentPetIndex]} />

                                <button onClick={handleNextPet}>
                                    &gt;
                                </button>
                            </div>
                        </>
                    ) : (
                        !loading && <p>No pets found.</p>
                    )}
                    <button className="back-button" onClick={() => navigate(-1)}>
                        Back
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SearchResults;
