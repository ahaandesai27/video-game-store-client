import { useNavigate } from "react-router"
import { useEffect, useState } from "react";
import { useJwt } from 'react-jwt';
import userlogo from '../assets/user.svg'

export default function Navbar () { 
    const [verified, setVerified] = useState<boolean | null>(null);
    const [name, setName] = useState<string | null>(null);
    const navigate = useNavigate();

    const token = localStorage.getItem('token');
    const { decodedToken, isExpired } = useJwt<any>(token || '');

    const logoutUser = () => {
        if (localStorage.getItem('token')) {
            localStorage.removeItem('token');
            setVerified(false);
            navigate('/login'); // Move the navigation inside this block
        }
    };

    useEffect(() => {
        if (!token || isExpired) {
            setVerified(false);
            return;
        }

        if (decodedToken) {
            setVerified(true);
            setName(decodedToken.name);
        } else {
            setVerified(false);
        }
    }, [token, decodedToken, isExpired]);

    return <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-purple-950 overflow-y-hidden">
    <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
        <a className="flex items-center">
            <span className="self-center text-xl font-semibold whitespace-nowrap text-gray-800 dark:text-white">GameShop</span>
        </a>

        <div className="flex items-center lg:order-2">
            {verified ? 
            (<>
                <button className="bg-purple-500 text-white font-bold py-1 px-3 rounded-full">
                    <div className="flex">
                        <img src={userlogo} alt="user" className="w-6 h-6" />
                        <div>{name}</div>
                    </div>
                </button>
                <button onClick={logoutUser} className="text-gray-800 dark:text-white focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none dark:focus:ring-gray-800">Log out</button>
            </>) :
            (<>
                <button onClick={() => {navigate('/login')}} className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800">Log in</button>
                <button onClick={() => {navigate('/signup')}} className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">Register</button>
            </>)
            }
        </div>

        <div className="justify-between items-center w-full lg:flex lg:w-auto lg:order-1">
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                <li>
                    <button onClick={() => {navigate('/')}} className="block py-2 pr-4 pl-3 text-white rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 dark:text-white">Home</button>
                </li>
                <li>
                    <button onClick={() => {navigate('/games')}} className="block py-2 pr-4 pl-3 text-white rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 dark:text-white">Games</button>
                </li>
                <li>
                    <button onClick={() => {navigate('/games')}} className="block py-2 pr-4 pl-3 text-white rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 dark:text-white">Library</button>
                </li>
            </ul>
        </div>
    </div>
</nav>
}