import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import './styles/error.css';

const ForbiddenPage = () => {
  const { user } = useSelector(state => state.user);

  return (
    <div className="error-container">
      <div className="error-white-background">
        <div className="header">
          <h1>Access Forbidden</h1>
        </div>

        <p>You don't have permission to access this page.</p>

        <div className="action-links">
          <Link to="/" className="action-link">Go to Home Page</Link>
        </div>

        {!user ? (
          <div className="auth-buttons">
            <Link to="/login" className="auth-button">Login</Link>
            <Link to="/register" className="auth-button">Register</Link>
          </div>
        ) : null
        }
      </div>
    </div>
  );
};

export default ForbiddenPage;
