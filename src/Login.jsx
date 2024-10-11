import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from './redux/store';

const Login = () => {
    const [ formData, setFormData ] = useState({ email: "" });
    const [ error, setError ] = useState(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(data => ({
            ...data, [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        const password = e.target.password.value;

        const BASE_URL = import.meta.env.VITE_BACKEND_URL;
        try {
            const response = await fetch(`${BASE_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: formData.email,
                    password
                })
            });

            if (response.ok) {
                const { token, refreshToken, user, expirationTime, refreshTokenExpirationTime } = await response.json(); 
                console.log('User logged in successfully:', user);

                // Stores JWT, updates Redux user store, navigate to Dashboard
                localStorage.setItem('token', token);
                localStorage.setItem('refreshToken', refreshToken);
                localStorage.setItem('expirationTime', expirationTime); 
                localStorage.setItem('refreshTokenExpirationTime', refreshTokenExpirationTime);
                dispatch(login(user));
                navigate('/');
            } else {
                const errorData = await response.json();
                console.error('Login failed:', errorData.error);
                setError(errorData.error);
            }
        } catch (error) {
            console.error('Error during login:', error);
            setError('An error occurred during login. Please try again later.');
        }
    };

    return (
        <div>
            <div className="header">
                <h1>Login</h1>
            </div>
            
            {error && <div className="error">{error}</div>}
            <form className="user-form" onSubmit={handleSubmit}>
                <label htmlFor="email">Email Address:</label>
                <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="email"
                    autoComplete="email"
                    required 
                />
                <br />
                <label htmlFor="password">Password:</label>
                <input 
                    name="password" 
                    type="password" 
                    placeholder="password'"
                    autoComplete="current-password"
                    required 
                />
                <br />
                <button type="submit">Submit</button>
            </form>
        </div>  
    );
};

export default Login;