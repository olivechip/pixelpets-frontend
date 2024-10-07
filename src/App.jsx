import { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

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

  

  const refreshAccessToken = async () => { 
    try {
      const refreshToken = localStorage.getItem('refreshToken'); 
  
      if (!refreshToken) {
        console.warn('No refresh token found');
        handleLogout();
        return;
      }
  
      const response = await fetch('/api/auth/refresh', { // Replace with your refresh token endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken }),
      });
  
      if (!response.ok) {
        const errorData = await response.json(); // Get error message from the server
        throw new Error(errorData.message || 'Failed to refresh access token');
      }
  
      const data = await response.json();

      localStorage.setItem('token', data.token); 
    } catch (error) {
      console.error('Error refreshing token:', error);
      handleLogout();
    }
  };
  
  useEffect(() => {
    const checkTokenExpiration = () => {
      const expirationTime = localStorage.getItem('expirationTime');
  
      // No need for jwt_decode here
      if (expirationTime && new Date().getTime() > expirationTime) { 
        refreshAccessToken();
      }
    };
    
    // checks every minute
    const intervalId = setInterval(checkTokenExpiration, 60000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <Navbar />

      <Routes>
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
