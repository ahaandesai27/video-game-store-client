import './style.css'; 
import { useUser } from '../../context/UserContext';
import { gql, useQuery, useMutation } from '@apollo/client';
import { useState } from 'react';

const FETCH_CATEGORIES = gql`
    query Categories {
        categories {
            _id
            name
        }
    }
`;

const ADD_PREFERENCES = gql`
    mutation AddCategories($userId: ID!, $categoryIds: [ID]!) {
        addPreferences(userId: $userId, categoryIds: $categoryIds) {
            _id
        }
    }
`;

type Category = {
    _id: string;
    name: string;
};

type CategoryBarProps = {
    category: Category;
    checked: boolean;
    onToggle: (categoryId: string) => void;
};

const CategoryBar = ({ category, checked, onToggle }: CategoryBarProps) => {
    const handleChange = () => {
        onToggle(category._id);
    };

    return (
        <div className="category-bar">
            <div>{category.name}</div>
            <input 
                type="checkbox" 
                checked={checked} 
                onChange={handleChange} 
            />
        </div>
    );
};

const EditPreferences = () => {
    const { userPreferences, userId } = useUser(); // Get userPreferences and userId from context
    const { loading, error, data } = useQuery(FETCH_CATEGORIES);
    const [addPreferencesMutation] = useMutation(ADD_PREFERENCES);
    const [selectedCategories, setSelectedCategories] = useState<string[]>(userPreferences || []);

    const handleToggle = (categoryId: string) => {
        setSelectedCategories((prev) =>
            prev.includes(categoryId)
                ? prev.filter((id) => id !== categoryId) // Remove if already selected
                : [...prev, categoryId] // Add if not selected
        );
    };
    const savePreferences = async () => {
        try {
            const { data } = await addPreferencesMutation({
                variables: {
                    userId,
                    categoryIds: selectedCategories,
                },
            });
            alert("Saved successfully!");
        } catch (error) {
            console.log(error);
            alert("Failed to save preferences");
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    const categories: Category[] = data?.categories || [];

    return (
        <div>
            <div className="preferences-header">Edit Preferences</div>
            <div>
                {categories.map((c) => {
                    const isChecked = selectedCategories.includes(c._id);
                    return (
                        <CategoryBar 
                            category={c} 
                            checked={isChecked} 
                            onToggle={handleToggle} 
                            key={c._id} 
                        />
                    );
                })}
            </div>
            <div className="w-full text-center mx-auto">
                <button
                    className="bg-purple-600 text-white font-bold py-2 px-4 rounded"
                    onClick={savePreferences}
                >
                    Save Preferences
                </button>
            </div>
        </div>
    );
};

export default EditPreferences;
