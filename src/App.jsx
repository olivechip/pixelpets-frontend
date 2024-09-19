import { Routes, Route, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, persistor } from './redux/store';
import Home from './Home';
import Register from './Register';
import Login from './Login';
import AccountDetails from './AccountDetails';
// import AccountEdit from './AccountEdit';
import AccountDelete from './AccountDelete';
import Dashboard from './Dashboard';
import UserProfile from './UserProfile';
import PetDetail from './PetDetail';
import Pound from './Pound';
import Adopt from './Adopt';
import Adopted from './Adopted';
import Abandon from './Abandon';
import Abandoned from './Abandoned';
import Navbar from './Navbar';
import Forbidden from './Forbidden';
import NotFound from './NotFound';

function App() {
  const { isLoggedIn } = useSelector(state => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    dispatch(logout());
    persistor.purge();

    // delayed redirect
    setTimeout(() => {
      navigate('/');
    }, 100);
  };

  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout}/>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/account" element={<AccountDetails />} />
        {/* <Route path="/account/edit" element={<AccountEdit />} /> */}
        <Route path="/account/delete" element={<AccountDelete />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/users/:userId" element={<UserProfile />} />
        <Route path="/pets/:petId" element={<PetDetail />} />
        <Route path="/pound" element={<Pound />} />
        <Route path="/pound/adopt" element={<Adopt />} />
        <Route path="/pound/adopted" element={<Adopted />} />
        <Route path="/pound/abandon" element={<Abandon />} />
        <Route path="/pound/abandoned" element={<Abandoned />} />
        {/* ... other routes */}
        <Route path="/403" element={<Forbidden />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
