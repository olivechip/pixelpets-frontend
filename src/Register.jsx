import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register } from './redux/store';

const Register = () => {
    const { user } = useSelector(state => state.user);
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

        const password = e.target.password.value;
        const confirmPassword = e.target.confirmPassword.value;

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            const response = await fetch('/api/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: formData.username,
                    email: formData.email,
                    password
                })
            });

            if (response.ok) {
                const { token, refreshToken, user } = await response.json();
                console.log('User registered successfully:', user);

                // Stores JWT, updates Redux user store, navigate to Dashboard
                localStorage.setItem('token', token);
                localStorage.setItem('refreshToken', refreshToken);
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
                <form onSubmit={handleSubmit}>
                    <label htmlFor="username">Username: </label>
                    <input
                        name="username"
                        type="text"
                        value={formData.username}
                        onChange={handleChange}
                        placeholder="username"
                    />
                    <br />
                    <label htmlFor="email">Email Address: </label>
                    <input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="email"
                    />
                    <br />
                    <label htmlFor="password">Password: </label>
                    <input name="password" type="password" placeholder="password" />
                    <br />
                    <label htmlFor="confirmPassword">Confirm Password: </label>
                    <input name="confirmPassword" type="password" placeholder="confirm password" />
                    <br />
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default Register;