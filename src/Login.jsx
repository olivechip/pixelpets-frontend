import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from './redux/store';

import './styles/userForm.css';

const Login = () => {
    const [formData, setFormData] = useState({ email: "" });
    const [error, setError] = useState(null);

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
        <div className="login-container">
            <div className="login-white-background">
                <div className="header">
                    <h2>Login</h2>
                </div>

                {error && <div className="error">{error}</div>}
                <form className="user-form" onSubmit={handleSubmit}>
                    <label className="label" htmlFor="email">Email</label>
                    <input
                        className="input"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        autoComplete="email"
                        required
                    />
                    <label className="label" htmlFor="password">Password</label>
                    <input
                        className="input"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                    />
                    <button type="submit" className="login-button">Login</button>
                </form>

                <br />
                <div><Link to="/register">Don't have an account? <br />Register here!</Link></div>
            </div>

            <div className="message-container">
                <div>If using on Render, server needs time to boot up on Register or Login. Thanks for waiting!</div>
            </div>
        </div>
    );
};

export default Login;