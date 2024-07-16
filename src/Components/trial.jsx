export default function component() {
return <>
    <details className="dropdown">
        <summary className='pt-3 hover:text-white'>PRICE</summary>
        <ul className="base-100 rounded-box z-[1] w-52 p-2 shadow">
            <li className="p-2 rounded-md hover:bg-gray-300 hover:bg-opacity-30 hover:text-white"><a>Free</a></li>
            <li className="p-2 rounded-md hover:bg-gray-300 hover:bg-opacity-30 hover:text-white"><a>Less than 10 dollars</a></li>
        </ul>
        </details>

    <details>
        <summary className='hover:text-white pt-3'>GENRE</summary>
        <ul className="base-100 rounded-box z-[1] w-52 p-2 shadow">
            <li className="p-2 rounded-md hover:bg-gray-300 hover:bg-opacity-30 hover:text-white"><a>Fantasy</a></li>
            <li className="p-2 rounded-md hover:bg-gray-300 hover:bg-opacity-30 hover:text-white"><a>Racing</a></li>
        </ul>
    </details>

    <details>
        <summary className='hover:text-white pt-3'>PLATFORM</summary>
        <ul className="base-100 rounded-box z-[1] w-52 p-2 shadow">
            <li className="p-2 rounded-md hover:bg-gray-300 hover:bg-opacity-30 hover:text-white"><a>PC</a></li>
            <li className="p-2 rounded-md hover:bg-gray-300 hover:bg-opacity-30 hover:text-white"><a>PS5</a></li>
            <li className="p-2 rounded-md hover:bg-gray-300 hover:bg-opacity-30 hover:text-white"><a>Xbox</a></li>
        </ul>
    </details>
</> 
}