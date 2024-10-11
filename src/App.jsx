import { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout, persistor } from './redux/store';

import Admin from './Admin';
import Home from './Home';
import Register from './Register';
import Login from './Login';
import AccountDetails from './AccountDetails';
import AccountEdit from './AccountEdit';
import AccountDelete from './AccountDelete';
import Dashboard from './Dashboard';
import UserProfile from './UserProfile';
import PetDetail from './PetDetail';
import Lab from './Lab';
import PetCreate from './PetCreate';
import PetCreated from './PetCreated';
import PetDelete from './PetDelete';
import PetDeleted from './PetDeleted';
import Pound from './Pound';
import Adopt from './Adopt';
import Adopted from './Adopted';
import Abandon from './Abandon';
import Abandoned from './Abandoned';
import Navbar from './Navbar';
import SearchResults from './SearchResults';
import Forbidden from './Forbidden';
import NotFound from './NotFound';

function App() {
  const { isLoggedIn } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());

    // clear tokens and persist storage
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('expirationTime');
    localStorage.removeItem('refreshTokenExpirationTime');
    persistor.purge();

    // delayed redirect to home
    setTimeout(() => {
        navigate('/');
    }, 100);
  };

  const refreshAccessToken = async () => { 
    try {
      const refreshToken = localStorage.getItem('refreshToken'); 
  
      if (!refreshToken) {
        console.warn('No refresh token found');
        handleLogout();
        return;
      }
      
      const BASE_URL = import.meta.env.VITE_BACKEND_URL;
      const response = await fetch(`${BASE_URL}/auth/refresh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to refresh access token');
      }
  
      const data = await response.json();

      localStorage.setItem('token', data.token); 
      localStorage.setItem('expirationTime', data.expirationTime);
      localStorage.setItem('refreshToken', data.refreshToken); 
      localStorage.setItem('refreshTokenExpirationTime', data.refreshTokenExpirationTime);
    } catch (error) {
      console.error('Error refreshing token:', error);
      handleLogout();
    }
  };

  useEffect(() => {
    const checkTokenExpiration = () => {
      const expirationTime = localStorage.getItem('expirationTime');
      
      if (expirationTime && new Date().getTime() > expirationTime * 1000) { 
        const refreshTokenExpirationTime = localStorage.getItem('refreshTokenExpirationTime');
        
        if (refreshTokenExpirationTime && new Date().getTime() > refreshTokenExpirationTime * 1000) {
          handleLogout(); // Refresh token expired, log out the user
        } else {
          refreshAccessToken();
        }
      }
    };
    
    // checks every 60 minutes, adjust if needed
    const minutes = 60;
    const intervalId = setInterval(checkTokenExpiration, minutes * 60 * 1000);
    return () => clearInterval(intervalId);
  }, [handleLogout]);

  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/admin" element={<Admin />} />
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        {isLoggedIn && (
          <>
            <Route path="/account" element={<AccountDetails />} />
            <Route path="/account/edit" element={<AccountEdit />} />
            <Route path="/account/delete" element={<AccountDelete />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/users/:userId" element={<UserProfile />} />
            <Route path="/pets/:petId" element={<PetDetail />} />
            <Route path="/lab" element={<Lab />} />
            <Route path="/lab/create" element={<PetCreate />} />
            <Route path="/lab/created" element={<PetCreated />} />
            <Route path="/lab/delete" element={<PetDelete />} />
            <Route path="/lab/deleted" element={<PetDeleted />} />
            <Route path="/pound" element={<Pound />} />
            <Route path="/pound/adopt" element={<Adopt />} />
            <Route path="/pound/adopted" element={<Adopted />} />
            <Route path="/pound/abandon" element={<Abandon />} />
            <Route path="/pound/abandoned" element={<Abandoned />} />
            <Route path="/search/:query" element={<SearchResults />} />
          </>
        )}
        {/* ... other routes */}
        <Route path="/403" element={<Forbidden />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
