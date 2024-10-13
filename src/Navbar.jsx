import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, persistor } from './redux/store';

const Navbar = () => {
    const { isLoggedIn, user } = useSelector(state => state.user);
    const [search, setSearch] = useState("");

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
            <div className="navbar-left">
                <div><Link to="/">Pixelpets</Link></div>
                {user && isLoggedIn && (
                    <>
                        <div><Link to="/dashboard">Dashboard</Link></div>
                        <div><Link to="/lab">Pixel Lab</Link></div>
                        <div><Link to="/pound">Pixel Pound</Link></div>
                    </>
                )}
            </div>

            {user && isLoggedIn && (
                <div className="navbar-middle">
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
                </div>
            )}

            <div className="navbar-right">
                {user && isLoggedIn ? (
                    <>
                        {user.admin && (
                            <div><Link to="/admin">Admin</Link></div>
                        )}
                        <div><Link to={`/account`}>{user.username}</Link></div>
                        <div><Link onClick={handleLogout}>Logout</Link></div>
                    </>
                ) : (
                    <>
                        <div><Link to="/login">Login</Link></div>
                        <div><Link to="/register">Register</Link></div>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;