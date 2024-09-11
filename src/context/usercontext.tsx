import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useJwt } from "react-jwt";
import { onTokenChange } from "../utils/eventEmitter"; // Import the custom event functions

interface UserContextValue {
  userId: string | null;
}

interface UserProviderProps {
  children: ReactNode;
}

const UserContext = createContext<UserContextValue>({ userId: null });

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const { decodedToken, isExpired } = useJwt<any>(token || '');
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onTokenChange((newToken) => {
      setToken(newToken);
    });

    return unsubscribe; // Cleanup the listener
  }, []);

  useEffect(() => {
    if (isExpired) {
      setUserId(null);
      return;
    }
    if (decodedToken) {
      setUserId(decodedToken.userId);
    }
  }, [decodedToken, isExpired]);

  return (
    <UserContext.Provider value={{ userId }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
