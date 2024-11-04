import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { register } from './redux/store';
import { validateUsername, validateEmail, validatePassword } from './helpers/validationUtils';


import './styles/userForm.css';

const Register = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
    });
    const [error, setError] = useState(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(data => ({
            ...data,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        // Input validation 
        const usernameError = validateUsername(formData.username);
        if (usernameError) {
            setError(usernameError);
            return;
        }
        const emailError = validateEmail(formData.email);
        if (emailError) {
            setError(emailError);
            return;
        }
        const passwordError = validatePassword(e.target.password.value, e.target.confirmPassword.value);
        if (passwordError) {
            setError(passwordError);
            return;
        }

        try {
            const BASE_URL = import.meta.env.VITE_BACKEND_URL;
            const response = await fetch(`${BASE_URL}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: formData.username,
                    email: formData.email,
                    password: e.target.password.value
                })
            });

            if (response.ok) {
                const { token, refreshToken, user, expirationTime, refreshTokenExpirationTime } = await response.json();
                console.log('User registered successfully:', user);

                // Stores JWT, updates Redux user store, navigate to Dashboard
                localStorage.setItem('token', token);
                localStorage.setItem('refreshToken', refreshToken);
                localStorage.setItem('expirationTime', expirationTime);
                localStorage.setItem('refreshTokenExpirationTime', refreshTokenExpirationTime);
                dispatch(register(user));
                navigate('/', { state: { message: `Welcome to Pixelpets, ${user.username}!` } });
            } else {
                const errorData = await response.json();
                console.error('Registration failed:', errorData.error);
                setError(errorData.error);
            }
        } catch (error) {
            console.error('Error during registration:', error);
            setError('An error occurred during registration. Please try again later.');
        }
    };

    return (
        <div className="login-container">
            <div className="login-white-background">
                <div className="header">
                    <h2>Register</h2>
                </div>

                {error && <div className="error">{error}</div>}
                <form className="user-form" onSubmit={handleSubmit}>
                    <label className="label" htmlFor="username">Username</label>
                    <input
                        className="input"
                        name="username"
                        type="text"
                        value={formData.username}
                        onChange={handleChange}
                        autoComplete="username"
                        required
                        minLength="3"
                        maxLength="50"
                    />
                    <label className="label" htmlFor="email">Email Address</label>
                    <input
                        className="input"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        autoComplete="email"
                        required
                        maxLength="255"
                    />
                    <label className="label" htmlFor="password">Password</label>
                    <input
                        className="input"
                        name="password"
                        type="password"
                        autoComplete="new-password"
                        required
                        minLength="8"
                    />
                    <label className="label" htmlFor="confirmPassword">Confirm Password</label>
                    <input
                        className="input"
                        name="confirmPassword"
                        type="password"
                        autoComplete="new-password"
                        required
                        minLength="8"
                    />
                    <button type="submit" className="login-button">Register</button>
                </form>

                <br />
                <div><Link to="/login">Already have an account? <br />Login here!</Link></div>
            </div>

            <div className="message-container">
                <div>If using on Render, server needs time to boot up on Register or Login. Thanks for waiting!</div>
            </div>
        </div>
    );
};

export default Register;