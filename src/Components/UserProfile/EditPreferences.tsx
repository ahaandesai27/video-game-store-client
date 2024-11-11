import './style.css'; 
import { useUser } from '../../context/UserContext';
import { gql, useQuery } from '@apollo/client';
import { useState, useEffect } from 'react';

const FETCH_CATEGORIES = gql`
    query Categories {
        categories {
            _id
            name
        }
    }
`

type Category = {
    _id: string;
    name: string;
    checked: boolean;
}


type CategoryBarProps = {
    category: Category;
    checked: boolean;
};

const CategoryBar = ({ category, checked }: CategoryBarProps) => {
    const handleChange = () => {
        // handle change logic here
    };

    console.log(checked);

    return (
        <div className='category-bar'>
            <div>{category.name}</div>
            <input 
                type='checkbox' 
                checked={checked} 
                onChange={handleChange} 
            />
        </div>
    );
};

const EditPreferences = () => {
    const {loading, error, data} = useQuery(FETCH_CATEGORIES);
    if (loading) return <div>Loading...</div>
    if (error) return <div>Error: {error.message}</div>
    const categories: Category[] = data?.categories;
    const {userPreferences} = useUser();
    return <div>
        <div className="preferences-header">Edit Preferences</div>
        <div>
            {categories.map(c => {
                const isChecked: boolean | null = userPreferences && c._id in userPreferences;
                return <CategoryBar 
                    category={c} 
                    checked={isChecked} 
                    key={c._id} 
                />
            })}
        </div>
    </div>
}
export default EditPreferences;