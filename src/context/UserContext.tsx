import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useJwt } from "react-jwt";
import { onTokenChange } from "../utils/eventEmitter"; 
import { gql, useQuery } from "@apollo/client";

interface UserContextValue {
  userId: string | null;
  userGames: Set<string> | null; // Change to Set<string>
}

interface UserProviderProps {
  children: ReactNode;
}

const GET_USER_GAMES = gql`
  query GetUserGames($id: ID!) {
    user(_id: $id) {
        ownedGames {
            _id
        }
    }
}`;

const UserContext = createContext<UserContextValue>({ userId: null, userGames: null });

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const { decodedToken, isExpired } = useJwt<any>(token || '');
  const [userId, setUserId] = useState<string | null>(null);
  const { data, loading, error } = useQuery(GET_USER_GAMES, {
    variables: { id: userId },
    skip: !userId,
  });
  const [userGames, setUserGames] = useState<Set<string> | null>(null); // Updated to Set<string>

  useEffect(() => {
    const unsubscribe = onTokenChange((newToken) => {
      setToken(newToken);
    });

    return () => unsubscribe(); // Cleanup the listener
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

  useEffect(() => {
    if (data) {
      setUserGames(new Set(data.user.ownedGames.map(game => game._id))); // Store game IDs as a Set
    }
  }, [data]);

  return (
    <UserContext.Provider value={{ userId, userGames }}>
      {loading ? <div>Loading...</div> : error ? <div>Error: {error.message}</div> : children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
