import React, { useRef } from 'react';

type SearchProps = {
    setSearch: (value: string) => void;
}

const SearchForm: React.FC<SearchProps> = ({setSearch}) => {
    const searchRef = useRef<HTMLInputElement>(null);
    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        console.log("Searched for: ", searchRef.current?.value);
        setSearch(searchRef.current?.value || '');
    }
    return <div className='pt-24'>         {/*Search form*/}
    <form className="w-full max-w-sm">
        <div className="flex items-center border-b border-purple-600 py-2">
            <input ref={searchRef}
                className="appearance-none bg-transparent border-none w-full text-white mr-3 py-1 px-2 leading-tight focus:outline-none"
                type="text"
                placeholder="Search game"/>
            <button
                className="bg-purple-600 hover:bg-purple-700 hover:border-purple-700 text-sm text-white py-2 px-3 rounded"
                type="submit" onClick={handleSubmit}>Search</button>
        </div>
    </form>
</div>
}

export default SearchForm