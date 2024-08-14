import { useState } from "react";

type DropdownProps = {
    title: string;
    items: string[];
    setFilter: (value: string) => void;
};

const Dropdown: React.FC<DropdownProps> =  ({ title, items, setFilter }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={`collapse collapse-arrow ${isOpen ? 'collapse-open' : ''}`} onClick={() => setIsOpen(!isOpen)}>
            <div className="collapse-title text-lg cursor-pointer">{title}</div>
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

export default Dropdown;