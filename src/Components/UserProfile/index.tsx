
import './style.css'; 
import { useUser } from '../../context/UserContext';
import Navbar from '../Navbar';
import { gql, useQuery } from '@apollo/client';

const FETCH_USER_DATA = gql`
    query User($id: ID!) {
        user(_id: $id) {
            email
            firstName
            lastName
            username
        }
    }
`

type User = {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    // age: number;
    // createdAt: string;
    // ownedGames: { name: string; description: string; imageUrl: string }[];
    // cart: { name: string; imageUrl: string }[];
    // preferences: { name: string }[];
}
const UserProfile = () => {
    const {userId} = useUser();
    if (!userId) return <div>Please log in to view your profile.</div>

    const {loading, error, data} = useQuery(FETCH_USER_DATA, {variables: {
        id: userId
    }})
    if (loading) return <div>Loading...</div>
    if (error) return <div>Error: {error.message}</div>
    const user: User = data?.user;
    console.log(user);
    // const user = {
    //     username: 'john_doe',
    //     firstName: 'John',
    //     lastName: 'Doe',
    //     email: 'johndoe@example.com',
    //     age: 28,
    //     createdAt: '2022-08-15T14:30:00Z',
    //     ownedGames: [
    //         { name: 'Game 1', description: 'An exciting action game.', imageUrl: 'https://via.placeholder.com/200x150?text=Game+1' },
    //         { name: 'Game 2', description: 'A thrilling adventure game.', imageUrl: 'https://via.placeholder.com/200x150?text=Game+2' },
    //         { name: 'Game 3', description: 'A fun and casual game.', imageUrl: 'https://via.placeholder.com/200x150?text=Game+3' }
    //     ],
    //     cart: [
    //         { name: 'Game 4', imageUrl: 'https://via.placeholder.com/200x150?text=Game+4' },
    //         { name: 'Game 5', imageUrl: 'https://via.placeholder.com/200x150?text=Game+5' }
    //     ],
    //     preferences: [
    //         { name: 'Action' },
    //         { name: 'Adventure' },
    //         { name: 'RPG' }
    //     ]
    // };

    return (
        <>
            <Navbar />
            <div className="profile-container">
                <div className="profile-header">
                    <div className="profile-banner">
                        {/* Optional banner image */}
                    </div>
                    <div className="profile-info">
                        <img src="/path-to-default-avatar.jpg" alt="avatar" className="profile-avatar" />
                        <div className="profile-details">
                            <h1>{user.firstName} {user.lastName}</h1>
                            <p className="username">@{user.username}</p>
                            <p className="username">{user.email}</p>
                            <p className="bio">Bio: Avid gamer and game collector!</p>
                            {/* <p className="joined">Joined: {new Date(user.createdAt).toLocaleDateString()}</p> */}
                        </div>
                    </div>
                </div>

                {/* <div className="profile-section">
                    <div className="preferences-header">Preferences</div>
                    <ul className="preferences-list">
                        {user.preferences.length > 0 ? (
                            user.preferences.map((category, index) => (
                                <li key={index} className="preference-item">{category.name}</li>
                            ))
                        ) : (
                            <p>No preferences selected.</p>
                        )}
                    </ul>
                </div> */}
            </div>
        </>
    );
}

export default UserProfile;
