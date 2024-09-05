import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Home = () => {
    const { isLoggedIn, user } = useSelector(state => state.user);

    console.log(isLoggedIn, user);
    return (
        <div>
            {isLoggedIn && user ? ( 
                <div> 
                    {/* Content for logged-in users */}
                    <h1>Welcome back, {user.username}!</h1>
                    {/* ... other content for authenticated users */}
                </div>
            ) : ( 
                <div> {/* Make sure this div has content */}
                    <h1>Welcome to Pixel Pets!</h1>
                    <p>Create your account and start adopting adorable virtual pets!</p>
                    <div>
                        <Link to="/register">Register</Link>
                        <Link to="/login">Login</Link>
                    </div>
                </div>
            )}
        </div>
      );
};

export default Home;