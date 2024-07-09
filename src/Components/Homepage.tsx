import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useJwt } from 'react-jwt';

export default function Component() {
    const location = useLocation();
    const [verified, setVerified] = useState<boolean | null>(null);
    const [name, setName] = useState<string | null>(null);

    // Extract token from location.state if it exists
    const token = location.state?.token;
    
    // Decode the token using useJwt hook if token exists
    const { decodedToken, isExpired } = useJwt<any>(token || '');

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
                <h1 className="text-white text-transform: capitalize">Welcome, {name}</h1>
            ) : (
                <h1 className="text-white">Please <a href="/login">Login</a></h1>
            )}
        </div>
    );
}
