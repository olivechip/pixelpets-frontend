import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import Tutorial from './Tutorial';
import PetMiniCard from './PetMiniCard';
import './styles/home.css';

const Home = () => {
    const { isLoggedIn, user } = useSelector(state => state.user);
    const location = useLocation();
    const { message } = location.state || {};

    const [featuredPets, setFeaturedPets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [petCurrentIndex, setPetCurrentIndex] = useState(0);
    const [featureCurrentIndex, setFeatureCurrentIndex] = useState(0);

    // App features for navigation
    const features = [
        { title: 'Adopt / Create', description: 'Choose your perfect Pixelpet companion!' },
        { title: 'Nurture', description: 'Feed, play, and care for your pet to help it grow!' },
        { title: 'Compete', description: 'Enter contests and climb the leaderboards!' },
    ];

    // Fetch Featured Pets
    useEffect(() => {
        const fetchFeaturedPets = async () => {
            setLoading(true);
            setError(null);

            const BASE_URL = import.meta.env.VITE_BACKEND_URL;
            try {
                const response = await fetch(`${BASE_URL}/pets/featured`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();

                // Shuffle the pets and select 3 random ones
                const shuffledPets = data.sort(() => Math.random() - 0.5);
                setFeaturedPets(shuffledPets.slice(0, 3));  // Save 3 pets
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchFeaturedPets();
    }, []);

    // Navigate through Featured Pets
    const handlePetNext = () => {
        setPetCurrentIndex((prevIndex) => (prevIndex + 1) % featuredPets.length);
    };

    const handlePetPrev = () => {
        setPetCurrentIndex((prevIndex) => (prevIndex - 1 + featuredPets.length) % featuredPets.length);
    };

    // Navigate through App Features with continuous loop
    const handleFeatureNext = () => {
        setFeatureCurrentIndex((prevIndex) => (prevIndex + 1) % features.length);
    };

    const handleFeaturePrev = () => {
        setFeatureCurrentIndex((prevIndex) => (prevIndex - 1 + features.length) % features.length);
    };

    // Automatically cycle through features every 5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            handleFeatureNext();
        }, 5000);

        // Cleanup interval on component unmount
        return () => clearInterval(interval);
    }, [featureCurrentIndex]);

    return (
        <div className="home-container">
            <div className="home-white-background">
                {isLoggedIn && user ? (
                    <>
                        <div className="welcome-message header">
                            <h1>{message || `Welcome back, ${user.username}!`}</h1>
                        </div>

                        <Tutorial />

                        <div>
                            <Link to="/dashboard">Go to Dashboard</Link>
                        </div>
                    </>
                ) : (
                    <>
                        <p className="account-message">{message}</p>

                        <div className="header">
                            <h2>Welcome to Pixelpets</h2>
                            <p>Adopt, nurture, and compete with adorable virtual pets!</p>
                        </div>

                        {/* Featured Pets Section */}
                        <div className="featured">
                            <h4>Featured Pets</h4>
                            {loading && <p>Loading featured pets...</p>}
                            {error && <div className="error">{error}</div>}

                            <div className="featured-pet-slider">
                                <button onClick={handlePetPrev} disabled={featuredPets.length <= 1}>
                                    &lt;
                                </button>

                                {/* Show only the current featured pet */}
                                {featuredPets.length > 0 && <PetMiniCard pet={featuredPets[petCurrentIndex]} />}

                                <button onClick={handlePetNext} disabled={featuredPets.length <= 1}>
                                    &gt;
                                </button>
                            </div>
                        </div>

                        {/* App Features Section */}
                        <div className="how-it-works">
                            <div className="features-slider">
                                <button
                                    className="feature-slider-button"
                                    onClick={handleFeaturePrev}
                                    disabled={features.length <= 1}
                                >
                                    &lt;
                                </button>

                                <div className="features-card">
                                    <h4>{features[featureCurrentIndex].title}</h4>
                                    <p>{features[featureCurrentIndex].description}</p>
                                </div>

                                <button
                                    className="feature-slider-button"
                                    onClick={handleFeatureNext}
                                    disabled={features.length <= 1}
                                >
                                    &gt;
                                </button>
                            </div>
                        </div>

                        <div className="ready-to-start">
                            <h4>Ready to Start Your Pixelpets Adventure?</h4>
                            <div className="auth-buttons">
                                <Link to="/login" className="auth-button">Login</Link>
                                <Link to="/register" className="auth-button">Register</Link>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Home;
