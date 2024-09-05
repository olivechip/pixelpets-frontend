import { Link } from 'react-router-dom';

const Navbar = ({ isLoggedIn, handleLogout }) => {
  return (
    <nav>
        <ul className="navbar-left">
            <li>
                <Link to="/">Home</Link> 
            </li>
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
                <Link onClick={handleLogout}>Logout</Link> 
            </li>
        </ul>
        )}
    </nav>
  );
};

export default Navbar;