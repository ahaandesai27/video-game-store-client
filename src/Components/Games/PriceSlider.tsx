import { useState } from "react";

type PriceProps = {
    setPrice: (value: number | null) => void;
}

const PriceSlider: React.FC<PriceProps> = ({setPrice}) => {
    const [value, setValue] = useState<number | null>(null);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(parseInt(event.target.value));
        setPrice(parseInt(event.target.value));
    };

    return (
        <>
            {
                value === 0 ? <div className="text-white text-lg mt-8">Free</div> : <div className="text-white text-lg mt-8">Price : {value && value}</div>
            }
            <input 
                type="range" 
                min="0" 
                max="100" 
                className="range range-accent mt-2" 
                step="5" 
                onChange={handleChange} 
            />
        </>
    );
};

export default PriceSlider;
