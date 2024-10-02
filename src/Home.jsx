import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

const Home = () => {
    const { isLoggedIn, user } = useSelector(state => state.user);
    const location = useLocation();
    const { message } = location.state || {};

    // Sanity check
    // console.log(isLoggedIn, user, localStorage);

    return (
        <div>
            { isLoggedIn && user ? (
                <>
                    <div className="message">
                        <h1>{message || `Welcome back, ${user.username}!`}</h1>
                    </div>
                    <div> 
                        <Link to="/dashboard">Go to Dashboard</Link>
                    </div>
                </>
            ) : 
            <div> 
                <div className="message">
                    <div>{message}</div>
                </div>
                <h1>Welcome to Pixel Pets!</h1>
                <p>Create your account and start adopting adorable virtual pets!</p>
                <div>
                    <Link to="/login">Login</Link>
                    <br />
                    <Link to="/register">Register</Link>
                </div>
            </div> }                
        </div>
      );
};

export default Home;