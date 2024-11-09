import { useSelector } from 'react-redux';

import LoggedInHome from './LoggedInHome';
import LoggedOutHome from './LoggedOutHome';

import './styles/home.css';

const Home = () => {
    const { user } = useSelector((state) => state.user);
    const isLoggedIn = user;

    return (
        <>{isLoggedIn ? <LoggedInHome user={user} /> : <LoggedOutHome />}</>
    );
};

export default Home;
