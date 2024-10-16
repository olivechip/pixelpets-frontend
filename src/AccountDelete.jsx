import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, persistor } from './redux/store';


const AccountDelete = () => {
    const { user } = useSelector(state => state.user);
    const [ deleteForm, setDeleteForm ] = useState(false);
    const [ formData, setFormData ] = useState({ username: "", email: "" });
    const [ error, setError ] = useState(null);

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
            navigate('/', { state: { message: `Your account has been deleted.` }});
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

            if (response.ok){
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
        <div>
            <div className="header">
                <div className="button-container-left">
                    <button onClick={() => navigate(-1)}>Back</button>
                </div>
                <h1>Delete Account</h1>
            </div>

            {user && (
                <div>
                    {error && <div className="error">{error}</div>}
                    <p>Account deletion is irreversible. Pets will be sent to the pound.</p>
                    {!deleteForm ? (
                        <button className="delete-button" onClick={showDeleteForm}>Continue</button>
                    ) : (
                        <form className="user-form" onSubmit={handleDeletion}>
                            <label htmlFor="username">Username: </label>
                            <input
                                name="username"
                                type="text"
                                value={formData.username}
                                onChange={handleChange}
                                placeholder="username"
                                required
                            />
                            <br />
                            <label htmlFor="email">Email Address: </label>
                            <input
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder='email'
                                required 
                            />
                            <br />
                            <label htmlFor="password">Password:</label>
                            <input 
                                name="password" 
                                type="password" 
                                placeholder='password' 
                                required 
                            />
                            <br />
                            <button className="delete-button" type="submit">Confirm Deletion</button>
                        </form>
                    )}
                </div>
            )}
        </div>
    );
}

export default AccountDelete;