import { Link } from 'react-router-dom';

const Home = ({ isLoggedIn, user }) => {

    console.log(isLoggedIn);
    console.log(user); //fix this, returns undefined, possiblly prop drilling issue from App?

    return (
        <div>
            {isLoggedIn ? ( 
                <div> 
                    {/* Content for logged-in users */}
                    <h1>Welcome back, 'user.username'!</h1>
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