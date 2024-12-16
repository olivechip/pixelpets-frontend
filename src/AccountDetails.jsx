import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserById } from './redux/store';

import './styles/account.css';

const AccountDetails = () => {
    const { user } = useSelector(state => state.user);
    const { profile, loading, error } = useSelector(state => state.userProfile);
    const location = useLocation();
    const { message } = location.state || {};

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUserById(user.id))
    }, []);

    return (
        <div className="account-container">
            <div className="account-white-background">
                <div className="header">
                    <h2>Account Details</h2>
                </div>

                <p className="account-message-update">{message}</p>

                {loading && <p>Loading account details...</p>}
                {error && <div className="error">{error}</div>}

                {profile && (
                    <div>
                        <p>
                            <b>Username:</b> {profile.username}
                        </p>

                        <p>
                            <b>Email:</b> {profile.email}
                        </p>

                        <p>
                            <b>Joined:</b> {new Date(profile.created_at).toLocaleDateString()}
                        </p>

                        <p>
                            <b>Last Updated:</b> {new Date(profile.updated_at).toLocaleDateString()}
                        </p>
                    </div>
                )}
                <div className="account-buttons">
                    <Link to={"/account/edit"} className="account-button">Edit Account</Link>
                    <Link to={"/account/delete"} className="account-button">Delete Account</Link>
                </div>
            </div>
        </div>
    );
};

export default AccountDetails;