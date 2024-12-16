import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useJwt } from "react-jwt";
import { onTokenChange } from "../utils/eventEmitter"; 
import { gql, useQuery } from "@apollo/client";
import LoadingPage from "../Components/Utils/Loading";
import ErrorPage from "../Components/Utils/Error";

interface UserContextValue {
  userId: string | null;
  userGames: Set<string> | null; // Change to Set<string>
  userPreferences: string[] | null;
}

interface UserProviderProps {
  children: ReactNode;
}

const GET_USER_INFO = gql`
  query GetUserGames($id: ID!) {
    user(_id: $id) {
        ownedGames {
            _id
        }
        preferences {
          _id
        }
    }
}`;

const UserContext = createContext<UserContextValue>({ userId: null, userGames: null, userPreferences: null });

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const { decodedToken, isExpired } = useJwt<any>(token || '');
  const [userId, setUserId] = useState<string | null>(null);
  const { data, loading, error } = useQuery(GET_USER_INFO, {
    variables: { id: userId },
    skip: !userId,    // If user ID does not exist, skip the query
  });
  const [userGames, setUserGames] = useState<Set<string> | null>(null); // Updated to Set<string>
  const [userPreferences, setUserPreferences] = useState<string[] | null>(null);

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
      setUserGames(new Set(data.user.ownedGames.map((game: any) => game._id))); // Store game IDs as a Set
      setUserPreferences(data.user.preferences.map((preference: any) => preference._id));
    }
  }, [data]);

  return (
    <UserContext.Provider value={{ userId, userGames, userPreferences }}>
      {loading ? <LoadingPage /> : error ? <ErrorPage /> : children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
