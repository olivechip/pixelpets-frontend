import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // For routing
import Animal from './Animal';
import Home from './Home';
import Register from './Register';
import Login from './Login';
import './App.css'

function App() {
  const [ isLoggedIn, setIsLoggedIn ] = useState(false);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home isLoggedIn={ isLoggedIn } />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          {/* ... other routes */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
