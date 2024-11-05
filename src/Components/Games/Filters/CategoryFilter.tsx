import { useQuery, gql } from "@apollo/client";
import React, { useState } from "react";
import CheckboxWithFilter from "./CategoryCheckbox";

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
            <div className="collapse-title text-lg cursor-pointer" style={{"fontFamily": "Allerta, sans-serif"}}>{"Categories"}</div>
            <div className="collapse-content">
                {
                    data?.categories.map((category : Category, index: number) => {
                        const {name, _id} = category;
                        return <CheckboxWithFilter key={index} _id={_id} name={name} setFilter={setFilter} />
                    })
                }
            </div>
        </div>
    );
}

export default Filter;