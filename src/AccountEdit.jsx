import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { update } from './redux/store';
import { validateUsername, validateEmail, validatePassword } from './helpers/validationUtils';

import './styles/account.css';

const AccountEdit = () => {
    const { user } = useSelector(state => state.user);
    const [formData, setFormData] = useState({
        username: user ? user.username : "",
        email: user ? user.email : "",
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

        const newPassword = e.target.newPassword.value;
        const confirmPassword = e.target.confirmPassword.value;
        const currentPassword = e.target.currentPassword.value;

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
        if (newPassword) {
            const passwordError = validatePassword(newPassword, confirmPassword);
            if (passwordError) {
                setError(passwordError);
                return;
            }
        }

        const BASE_URL = import.meta.env.VITE_BACKEND_URL;
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${BASE_URL}/users/${user.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    ...formData,
                    newPassword: newPassword !== "" ? newPassword : undefined,
                    currentPassword
                })
            });

            if (response.ok) {
                const updatedUser = await response.json();
                console.log('Profile updated successfully:', updatedUser);

                dispatch(update(updatedUser));
                navigate(`/account`, { state: { message: `Your account has been updated.` } });
            } else {
                const errorData = await response.json();
                console.error('Profile update failed:', errorData.error);
                setError(errorData.error);
            }
        } catch (error) {
            console.error('Error during profile update:', error);
            setError('An error occurred during profile update. Please try again later.');
        }
    };

    return (
        <div className="login-container">
            <div className="login-white-background">
                <div className="header">
                    <h2>Edit Account</h2>
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
                    <label className="label" htmlFor="newPassword">New Password</label>
                    <input
                        className="input"
                        name="newPassword"
                        type="password"
                        autoComplete="new-password"
                        minLength="8"
                    />
                    <label className="label" htmlFor="confirmPassword">Confirm New Password</label>
                    <input
                        className="input"
                        name="confirmPassword"
                        type="password"
                        autoComplete="new-password"
                        minLength="8"
                    />
                    <label className="label" htmlFor="currentPassword">Current Password</label>
                    <input
                        className="input"
                        name="currentPassword"
                        type="password"
                        autoComplete="current-password"
                        required
                    />
                    <button type="submit" className="login-button">Update</button>
                </form>

                <br />
            </div>
            <div className="back-link">
                <button className="back-button" onClick={() => navigate(-1)}>Back</button>
            </div>
        </div>
    );
};

export default AccountEdit;