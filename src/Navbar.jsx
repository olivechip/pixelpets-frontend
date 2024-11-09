import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, persistor } from './redux/store';
import { LuSearch } from "react-icons/lu";

import Github from './Github';

import './styles/navbar.css';

const Navbar = () => {
    const { isLoggedIn, user } = useSelector(state => state.user);
    const [isExpanded, setIsExpanded] = useState(false);
    const [search, setSearch] = useState("");
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const searchContainerRef = useRef(null);

    const handleChange = (e) => {
        setSearch(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (search.trim() !== "") {
            navigate(`/search/${search}`);
            setSearch("");
            setIsExpanded(false);
        }
    };

    const handleLogout = () => {
        setIsMenuOpen(false);
        dispatch(logout());

        // clear tokens and persist storage
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('expirationTime');
        localStorage.removeItem('refreshTokenExpirationTime');
        persistor.purge();

        // delayed redirect to home
        setTimeout(() => {
            navigate('/');
        }, 100);
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
                setIsExpanded(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <nav className="navbar">
            <div className="navbar-left">
                <div><Link to="/">Pixelpets</Link></div>
            </div>

            <div className="navbar-right">

                <div ref={searchContainerRef} className={`search-container ${isExpanded ? 'expanded' : ''}`}>
                    <form onSubmit={handleSubmit}>
                        {isExpanded && (
                            <input
                                className="search"
                                type="text"
                                value={search}
                                onChange={handleChange}
                                placeholder="Search..."
                            />
                        )}
                        <button
                            type="button"
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="search-icon-button"
                            aria-label="Toggle search"
                        >
                            <LuSearch className="search-icon" />
                        </button>
                    </form>
                </div>

                <button className="hamburger" onClick={toggleMenu}>
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </button>


                <div className={`sliding-menu ${isMenuOpen ? 'open' : ''}`}>
                    <button className="close-button" onClick={toggleMenu}>
                        &times;
                    </button>
                    <ul className={isMenuOpen ? 'show' : ''}>
                        {user && isLoggedIn ? (
                            <>
                                {user.admin && (
                                    <li><Link to="/admin" onClick={toggleMenu}>Admin</Link></li>
                                )}
                                <li><Link to={`/`} onClick={toggleMenu}>Home</Link></li>
                                <li><Link to={`/account`} onClick={toggleMenu}>Account</Link></li>
                                <li><Link to="/dashboard" onClick={toggleMenu}>Dashboard</Link></li>
                                <li><Link to="/lab" onClick={toggleMenu}>Pixel Lab</Link></li>
                                <li><Link to="/pound" onClick={toggleMenu}>Pixel Pound</Link></li>
                                <li><Link onClick={handleLogout}>Logout</Link></li>
                            </>
                        ) : (
                            <>
                                <li><Link to="/login" onClick={toggleMenu}>Login</Link></li>
                                <li><Link to="/register" onClick={toggleMenu}>Register</Link></li>
                            </>
                        )}
                    </ul>
                    <Github />
                </div>

                {/* Overlay for Tint*/}
                {isMenuOpen && <div className="overlay" onClick={toggleMenu}></div>}

            </div>
        </nav>
    );
};

export default Navbar;