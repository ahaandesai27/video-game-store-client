import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useJwt } from 'react-jwt';

export default function Component() {

    const [verified, setVerified] = useState<boolean | null>(null);
    const [name, setName] = useState<string | null>(null);
    const navigate = useNavigate();

    // Extract token from localStorage
    const token = localStorage.getItem('token');
    
    // Decode the token using useJwt hook if token exists
    const { decodedToken, isExpired } = useJwt<any>(token || '');

    const logoutUser = () => {
        if (localStorage.getItem('token')) {
            localStorage.removeItem('token');
            setVerified(false);
            navigate('/login'); // Move the navigation inside this block
        }
    };

    const loginNavigate = () => {
        navigate('/login');
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

    if (verified == null) {
        return (
            <div>
                <h1>Loading...</h1>
            </div>
        );
    }

    return (
        <div>
            {verified ? (
                <>
                    <h1 className="text-white text-transform: capitalize">Welcome, {name}</h1>
                    <button onClick={logoutUser} className="text-white">Logout</button>
                </>
            ) : (
                <h1 className="text-white">Please <button onClick={loginNavigate}>Login</button></h1>
            )}
        </div>
    );
}
