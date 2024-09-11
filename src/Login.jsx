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
                console.log('User logged in successfully:', user);

                // Stores JWT, updates Redux user store, navigate back Home
                localStorage.setItem('token', token);
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
                <br />
                <label htmlFor="password">Password: </label>
                <input name="password" type="password" placeholder='password'/>
                <br />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default Login;