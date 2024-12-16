import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, persistor } from './redux/store';

import './styles/account.css';

const AccountDelete = () => {
    const { user } = useSelector(state => state.user);
    const [deleteForm, setDeleteForm] = useState(false);
    const [formData, setFormData] = useState({ username: "", email: "" });
    const [error, setError] = useState(null);

    const dispatch = useDispatch();
    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(data => ({
            ...data,
            [name]: value
        }));
    };

    const handleLogout = () => {
        dispatch(logout());

        // clear tokens and persist storage
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('expirationTime');
        localStorage.removeItem('refreshTokenExpirationTime');
        persistor.purge();

        // delayed redirect to home
        setTimeout(() => {
            navigate('/', { state: { message: `Your account has been deleted.` } });
        }, 100);
    };

    const showDeleteForm = () => {
        setDeleteForm(true);
    }

    const handleDeletion = async (e) => {
        e.preventDefault();
        setError(null);

        const password = e.target.password.value;

        const BASE_URL = import.meta.env.VITE_BACKEND_URL;
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${BASE_URL}/users/${user.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    username: formData.username,
                    email: formData.email,
                    password
                })
            });

            if (response.ok) {
                handleLogout();

            } else {
                const errorData = await response.json();
                console.error('Deletion failed:', errorData.error);
                setError(errorData.error);
            }
        } catch (error) {
            console.error('Error during deletion:', error);
            setError('An error occurred during deletion. Please try again later.');
        }
    }

    return (
        <div className="login-container">
            <div className="login-white-background">
                <div className="header">
                    <h2>Delete Account</h2>
                </div>

                {user && (
                    <div>
                        {error && <div className="error">{error}</div>}
                        <p>Account deletion is irreversible. Pets will be sent to the pound.</p>
                        {!deleteForm ? (
                            <button className="login-button" onClick={showDeleteForm}>I understand</button>
                        ) : (
                            <form className="user-form" onSubmit={handleDeletion}>
                                <label className="label" htmlFor="username">Username</label>
                                <input
                                    className="input"
                                    name="username"
                                    type="text"
                                    value={formData.username}
                                    onChange={handleChange}
                                    placeholder="username"
                                    required
                                />
                                <label className="label" htmlFor="email">Email Address</label>
                                <input
                                    className="input"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder='email'
                                    required
                                />
                                <label className="label" htmlFor="password">Password</label>
                                <input
                                    className="input"
                                    name="password"
                                    type="password"
                                    placeholder='password'
                                    required
                                />
                                <button type="submit" className="account-delete-button">Confirm Deletion</button>
                            </form>
                        )}
                        <br />
                    </div>
                )}
            </div>
            <div className="back-link">
                <button className="back-button" onClick={() => navigate(-1)}>Back</button>
            </div>
        </div>
    );
}

export default AccountDelete;