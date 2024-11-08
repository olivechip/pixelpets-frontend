import { Link } from 'react-router-dom';
import './styles/userCard.css';

const UserCard = ({ profile }) => {
    return (
        <div className="user-card">
            <Link to={`/users/${profile.id}`}>
                <div className="user-data-item">
                    <span className="user-data-label">Username:</span> {profile.username}
                </div>
                <div className="user-data-item">
                    <span className="user-data-label">Joined:</span> {new Date(profile.created_at).toLocaleDateString()}
                </div>
            </Link>
        </div>
    );
};

export default UserCard;