import { Link, useNavigate } from 'react-router-dom';

const Forbidden = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); 
  };

  return (
    <div className="forbidden-page">
      <h1>Access Forbidden</h1>
      <p>You don't have permission to access this page.</p>
      <div>
        <Link to="" onClick={handleGoBack}>Go Back</Link>
        <br />
        <Link to="/">Go to Home Page</Link>
      </div>
    </div>
  );
};

export default Forbidden;