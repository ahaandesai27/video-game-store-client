import React, { useContext, createContext, useState, useEffect, ReactNode } from "react";
import { useJwt } from "react-jwt";

interface UserContextValue {
  userId: string | null;
}

interface UserProviderProps {
  children: ReactNode;
}

const UserContext = createContext<UserContextValue>({ userId: null });

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const { decodedToken, isExpired } = useJwt<any>(localStorage.getItem('token') || '');
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    if (isExpired) {
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
}

export const useUser = () => useContext(UserContext);
