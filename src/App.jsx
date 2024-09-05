import { Routes, Route, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, persistor } from './redux/store';
import Home from './Home';
import Register from './Register';
import Login from './Login';
import Navbar from './Navbar';
import NotFound from './NotFound';

function App() {
  const { isLoggedIn } = useSelector(state => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    dispatch(logout());
    persistor.purge();
    navigate('/');
  };

  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout}/>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        {/* ... other routes */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
