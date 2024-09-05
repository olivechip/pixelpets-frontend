import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // For routing
import Home from './Home';
import Register from './Register';
import Login from './Login';
import './App.css'

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          {/* ... other routes */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
