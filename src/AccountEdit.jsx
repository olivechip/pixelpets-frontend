// import { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
// import { fetchUserById, updateUserProfile } from './redux/store'; 

// const AccountEdit = () => {
//     const { userId } = useParams();
//     const { user } = useSelector(state => state.user);
//     const { profile, loading, error } = useSelector(state => state.userProfile);
//     const dispatch = useDispatch();
//     const navigate = useNavigate();

//     const [updatedProfile, setUpdatedProfile] = useState({});

//     useEffect(() => {
//         dispatch(fetchUserById(userId))
//     }, [userId, dispatch]);

//     useEffect(() => {
//         if (profile) {
//             setUpdatedProfile({ ...profile });
//         }
//     }, [profile]);

//     const handleChange = (e) => {
//         setUpdatedProfile({ ...updatedProfile, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         // Add validation here (e.g., check if currentPassword is correct)

//         try {
//             await dispatch(updateUserProfile(updatedProfile)).unwrap(); // Use .unwrap() to handle potential errors from the thunk
//             navigate(`/users/${userId}`); // Redirect to the user profile after successful update
//         } catch (error) {
//             // Handle errors from the thunk (e.g., display an error message)
//             console.error('Error updating profile:', error);
//         }
//     };

//     return (
//         <div>
//             <h1>Edit Profile</h1>

//             {loading && <p>Loading user profile...</p>}
//             {error && <div className="error">{error}</div>}

//             {profile && (
//                 <form onSubmit={handleSubmit}>
//                     {/* ... Form fields (username, email, new password, current password) ... */}
//                     <button type="submit">Confirm Changes</button>
//                 </form>
//             )}
//         </div>
//     );
// };

// export default AccountEdit;