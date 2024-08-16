import { useState } from "react";

type DropdownProps = {
    setFilter: (value: string) => void;
};

const Filter: React.FC<DropdownProps> =  ({setFilter }) => {
    const [isOpen, setIsOpen] = useState(false);
    const items = ['PC', 'PS5', 'Xbox', 'Switch'];
    return (
        <div className={`collapse collapse-arrow ${isOpen ? 'collapse-open' : ''}`} onClick={() => setIsOpen(!isOpen)}>
            <div className="collapse-title text-lg cursor-pointer">{"Platform"}</div>
            <div className="collapse-content">
                {
                    items.map((item: string, index: number) => {
                        return <div key={index}>
                            <button className='p-2 w-full text-left rounded-md hover:bg-gray-300 hover:bg-opacity-30 hover:text-white' onClick={
                                (e) => {
                                    e.stopPropagation();
                                    setFilter(item)
                                }
                            }
                            >{item}</button>
                            <br/>
                        </div>
                    })
                }
            </div>
        </div>
    );
};

export default Filter;