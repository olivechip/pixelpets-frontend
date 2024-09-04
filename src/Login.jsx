import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLogin, setUser }) => {
    const [ formData, setFormData ] = useState({ email: "" });
    const [ error, setError ] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(data => ({
            ...data, [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const password = e.target.password.value;
        try {
            const response = await fetch('/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: formData.email,
                    password
                })
            });

            if (response.ok){
                const { token, user } = await response.json();
                console.log('User logged in successfully:', user, token);

                // Stores the token (e.g., in local storage)
                localStorage.setItem('token', token);

                // Update application state (call onLogin prop)
                onLogin();

                // Update user state (adds user object to state)
                setUser();

                // Redirect to the home page ('/')
                navigate('/');
            } else {
                const errorData = await response.json();
                console.error('Login failed:', errorData.error);
                setError(errorData.error);
              }
            } catch (error) {
                console.error('Error during login:', error);
                setError('An error occurred during login. Please try again later.'); // Generic error message
            }
    };

    return (
        <div>
            <h1>Login</h1>
            {error && <div className="error">{error}</div>}
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email Address: </label>
                <input 
                    name="email" 
                    type="email" 
                    value={formData.email} 
                    onChange={handleChange} 
                    placeholder='email'
                />
                <label htmlFor="password">Password: </label>
                <input name="password" type="password" placeholder='password'/>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default Login;