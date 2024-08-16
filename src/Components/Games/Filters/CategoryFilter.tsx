import { useQuery, gql } from "@apollo/client";
import React, { useState } from "react";

type DropdownProps = {
    setFilter: (value: string) => void;
};

type Category = {
    name: string
    _id: string
}

const GET_CATEGORIES = gql`
    query Categories {
        categories {
            name
            _id
        }
    }
`

const Filter: React.FC<DropdownProps> = ({setFilter}) => {
    const [isOpen, setIsOpen] = useState(false);
    
    const {loading, error, data} = useQuery(GET_CATEGORIES);

    if (loading) return <p>Loading...</p>
    if (error) return <p>An error occured</p>
    return (
        <div className={`collapse collapse-arrow ${isOpen ? 'collapse-open' : ''}`} onClick={() => setIsOpen(!isOpen)}>
            <div className="collapse-title text-lg cursor-pointer">{"Categories"}</div>
            <div className="collapse-content">
                {
                    data?.categories.map((category : Category, index: number) => {
                        const {name, _id} = category;
                        return <div key={index}>
                            <button className='p-2 w-full text-left rounded-md hover:bg-gray-300 hover:bg-opacity-30 hover:text-white' onClick={
                                (e) => {
                                    e.stopPropagation();
                                    setFilter(_id)
                                }
                            }
                            >{name}</button>
                            <br/>
                        </div>
                    })
                }
            </div>
        </div>
    );
}

export default Filter;