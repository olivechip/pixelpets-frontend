import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { update } from './redux/store';
import { validateUsername, validateEmail, validatePassword } from './helpers/validationUtils';

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
                navigate(`/account`, { state: { message: `Your account has been updated.` }});
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
        <div>
            <div className="header">
                <div className="button-container-left">
                    <button onClick={() => navigate(-1)}>Back</button>
                </div>
                <h1>Edit Account Details</h1>
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
                        autoComplete="username"
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
                        autoComplete="email"
                        required
                        maxLength="255"
                    />
                    <br />
                    <label htmlFor="newPassword">New Password:</label>
                    <input
                        name="newPassword"
                        type="password"
                        placeholder="new password"
                        autoComplete="new-password"
                        minLength="8" 
                    />
                    <br />
                    <label htmlFor="confirmPassword">Confirm New Password:</label>
                    <input
                        name="confirmPassword"
                        type="password"
                        placeholder="confirm new password"
                        autoComplete="new-password"
                        minLength="8" 
                    />
                    <br />
                    <label htmlFor="currentPassword">Current Password:</label>
                    <input
                        name="currentPassword"
                        type="password"
                        placeholder="current password"
                        autoComplete="current-password"
                        required
                    />
                    <br />
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default AccountEdit;