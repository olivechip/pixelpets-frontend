import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Home = () => {
    const { isLoggedIn, user } = useSelector(state => state.user);
    
    // Sanity check
    // console.log(isLoggedIn, user, localStorage);

    return (
        <div>
            {isLoggedIn && user ? ( 
                <div> 
                    <h1>Welcome back, {user.username}!</h1>
                    <Link to="/dashboard">Go to Dashboard</Link>
                </div>
            ) : ( 
                <div> 
                    <h1>Welcome to Pixel Pets!</h1>
                    <p>Create your account and start adopting adorable virtual pets!</p>
                    <div>
                        <Link to="/login">Login</Link>
                        <br />
                        <Link to="/register">Register</Link>
                    </div>
                </div>
            )}
        </div>
      );
};

export default Home;