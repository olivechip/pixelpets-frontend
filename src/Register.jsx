import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { register } from './redux/store';
import { validateUsername, validateEmail, validatePassword } from './helpers/validationUtils';

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

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
                navigate('/', { state: { message: `Welcome to Pixelpets, ${user.username}!` }} );
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
        <div>
            <div className="header">
                <h1>Register</h1>
            </div>
            
            <div>
                {error && <div className="error">{error}</div>}
                <form className="user-form" onSubmit={handleSubmit}>
                    <label htmlFor="username">Username:</label>
                    <input
                        name="username"
                        type="text"
                        value={formData.username} 
                        onChange={handleChange}
                        placeholder="username"
                        required
                        minLength="3" 
                        maxLength="50"
                    />
                    <br />
                    <label htmlFor="email">Email Address:</label>
                    <input
                        name="email"
                        type="email" 
                        value={formData.email} 
                        onChange={handleChange}
                        placeholder="email"
                        required
                        maxLength="255" 
                    />
                    <br />
                    <label htmlFor="password">Password:</label>
                    <input 
                        name="password" 
                        type="password" 
                        placeholder="password" 
                        required 
                        minLength="8" 
                    />
                    <br />
                    <label htmlFor="confirmPassword">Confirm Password:</label>
                    <input 
                        name="confirmPassword" 
                        type="password" 
                        placeholder="confirm password"
                        required 
                        minLength="8" 
                    />
                    <br />
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default Register;