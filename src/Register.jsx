import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { register } from './redux/store';

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

        const password = e.target.password.value;

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
                const { token, user } = await response.json();
                console.log('User registered successfully:', user);

                // Stores JWT, updates Redux user store, navigate to Dashboard
                localStorage.setItem('token', token);
                dispatch(register(user));
                navigate('/dashboard', { state: { message: `Welcome to Pixelpets, ${user.username}!` }} );

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
            <h1>Register</h1>
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
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default Register;