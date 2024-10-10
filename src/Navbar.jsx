import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, persistor } from './redux/store';

const Navbar = () => {
    const {  isLoggedIn, user } = useSelector(state => state.user);
    const [ search, setSearch ] = useState("");

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setSearch(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate(`/search/${search}`);
    }

    const handleLogout = () => {
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

    return (
        <nav>
            <Link to="/" className="logo-link"><img className="logo-img" src="/images/logo/small_logo.png"></img></Link>
            <ul className="navbar-left">
                <li>
                    <Link to="/">Pixelpets</Link> 
                </li>
                {user && isLoggedIn && (
                    <>
                        <li>
                            <Link to="/dashboard">Dashboard</Link> 
                        </li>
                        <li>
                            <Link to="/lab">Pixel Lab</Link> 
                        </li>
                        <li>
                            <Link to="/pound">Pixel Pound</Link> 
                        </li>
                    </>
                )}
            </ul>
            {!user || !isLoggedIn ? (
            <ul className="navbar-right">
                <li>
                    <Link to="/login">Login</Link>
                </li>
                <li>
                    <Link to="/register">Register</Link>
                </li>
            </ul>
            ) : (
            <ul className="navbar-right">
                <li>
                    <form onSubmit={handleSubmit}>
                        <div className="search-box">
                            <input
                                className="search"
                                type="text" 
                                name="search"
                                value={search}
                                onChange={handleChange}
                                placeholder="Search Pixelpets"
                            />
                            <button type="submit">
                                <i className="fas fa-search"></i>
                            </button>
                        </div>
                    </form>
                </li>
                <li>
                    <Link to={`/account`}>{user.username}</Link> 
                </li>
                <li>
                    <Link onClick={handleLogout}>Logout</Link> 
                </li>
            </ul>
            )}
        </nav>
    );
};

export default Navbar;