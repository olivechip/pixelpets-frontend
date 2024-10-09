import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserById } from './redux/store';

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
        <div>
            <p className="account-message-update">{message}</p>

            <div className="header">
                <h1>Account Details</h1>
            </div>
            
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

                    <div>
                        <Link to={`/account/edit`}><button className="edit-button">Edit Account</button></Link><br />
                        <Link to={`/account/delete`}><button className="delete-button">Delete Account</button></Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AccountDetails;