import { Link } from 'react-router-dom';

const Navbar = ({ isLoggedIn, handleLogout }) => {
  return (
    <nav>Navbar
      <ul>
        <li>
          <Link to="/"><button>Home</button></Link> 
        </li>
        {!isLoggedIn ? (
          <>
            <li>
              <Link to="/login"><button>Login</button></Link>
            </li>
            <li>
              <Link to="/register"><button>Register</button></Link>
            </li>
          </>
        ) : (
          <li>
            <button onClick={handleLogout}>Logout</button> 
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;