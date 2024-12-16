import './style.css'; 
import { useUser } from '../../context/UserContext';
import Navbar from '../Navbar';
import { gql, useQuery } from '@apollo/client';
import { useState } from 'react';
import EditPreferences from './EditPreferences';
import LoadingPage from '../Utils/Loading';
import ErrorPage from '../Utils/Error';

const FETCH_USER_DATA = gql`
    query User($id: ID!) {
    user(_id: $id) {
        username
        about
        age
        createdAt
        email
        firstName
        lastName
        preferences {
        name  
        }
    }
}
`

type User = {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    about: string;
    age: number;
    createdAt: Date;
    preferences: {
        name: string;
    }[]
}


const UserProfile = () => {
    const { userId } = useUser();
    const [isEditingPreferences, setIsEditingPreferences] = useState(false);

    if (!userId) return <div>Please log in to view your profile.</div>;

    const { loading, error, data } = useQuery(FETCH_USER_DATA, {
        variables: { id: userId },
    });
    if (loading) return <LoadingPage />;
    if (error) return <ErrorPage />;
    const user: User = data?.user;;

    const handleEditPreferencesClick = () => {
        setIsEditingPreferences(true);
    };

    return (
        <>
            <Navbar />
            <div className="profile-container">
                {isEditingPreferences ? (
                    <EditPreferences />
                ) : (
                    <>
                        <div className="profile-header">
                            <div className="profile-info">
                                <div className="profile-details">
                                    <h1 style={{ fontWeight: '600' }}>
                                        {user.firstName} {user.lastName}
                                    </h1>
                                    <p className="username">@{user.username}</p>
                                </div>
                            </div>
                        </div>

                        <div className="about">
                            <div className="about-header">About</div>
                            <textarea className="about-text" defaultValue={user.about} readOnly />
                        </div>

                        <div className="profile-section">
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
                        </div>

                        <div className="w-full text-center mx-auto">
                            <button
                                className="bg-purple-600 text-white font-bold py-2 px-4 rounded"
                                onClick={handleEditPreferencesClick}
                            >
                                Edit Preferences
                            </button>
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default UserProfile;
