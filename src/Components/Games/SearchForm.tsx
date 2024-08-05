const SearchForm = () => {
    return <div className='pt-24'>         {/*Search form*/}
    <form className="w-full max-w-sm">
        <div className="flex items-center border-b border-purple-600 py-2">
            <input
                className="appearance-none bg-transparent border-none w-full text-white mr-3 py-1 px-2 leading-tight focus:outline-none"
                type="text"
                placeholder="Search game"/>
            <button
                className="bg-purple-600 hover:bg-purple-700 hover:border-purple-700 text-sm text-white py-2 px-3 rounded"
                type="submit">Search</button>
        </div>
    </form>
</div>
}

export default SearchForm