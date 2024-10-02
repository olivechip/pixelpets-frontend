import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Navbar = ({ isLoggedIn, handleLogout }) => {
    const { user } = useSelector(state => state.user);
    return (
        <nav>
            <Link to="/" className="logo-link"><img className="logo-img" src="/src/assets/logo/small_logo.png"></img></Link>
            <ul className="navbar-left">
                <li>
                    <Link to="/">Pixelpets</Link> 
                </li>
                {isLoggedIn && (
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
            {!isLoggedIn ? (
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