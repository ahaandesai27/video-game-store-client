import React, { useState } from 'react';

type Props = {
    _id: string;
    name: string;
    setFilter: (value: string) => void;
}
const CheckboxWithFilter: React.FC<Props> = ({ _id, name, setFilter }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleChange = (e: any) => {
    e.stopPropagation();
    setIsChecked(e.target.checked);
    if (e.target.checked) {
      setFilter(_id); // Add category to filter
    } else {
      setFilter(''); // Set category to blank or remove from filter
    }
  };

  return (
    <div>
      <input
        type="checkbox"
        id={_id}
        checked={isChecked}
        onChange={handleChange}
        onClick={(e) => e.stopPropagation()} // Prevent event from bubbling up
      />
      <label
        htmlFor={_id}
        className='text-white px-2'
      >
        {name}
      </label>
    </div>
  );
};

export default CheckboxWithFilter;
