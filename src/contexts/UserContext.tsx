
import React, { createContext, useContext, useState, ReactNode } from 'react';

export type AvailabilityType = {
  [day: string]: {
    morning: boolean;
    afternoon: boolean;
    evening: boolean;
  };
};

export type UserType = {
  id?: string;
  name: string;
  email: string;
  rating: number;
  phoneNumber: string;
  bio: string;
  preferences: {
    minRating: number;
    maxRating: number;
    location: string[];
    gender: string[];
  };
  availability: AvailabilityType;
  isOnboarded: boolean;
};

type UserContextType = {
  user: UserType | null;
  isAuthenticated: boolean;
  isLiteOnboarding: boolean;
  pendingGameId: string | null;
  setUser: (user: UserType | null) => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  setIsLiteOnboarding: (isLiteOnboarding: boolean) => void;
  setPendingGameId: (gameId: string | null) => void;
  updateUser: (updates: Partial<UserType>) => void;
  logout: () => void;
};

const defaultUser: UserType = {
  name: '',
  email: '',
  rating: 3,
  phoneNumber: '',
  bio: '',
  preferences: {
    minRating: 1,
    maxRating: 5,
    location: [],
    gender: []
  },
  availability: {
    monday: { morning: false, afternoon: false, evening: false },
    tuesday: { morning: false, afternoon: false, evening: false },
    wednesday: { morning: false, afternoon: false, evening: false },
    thursday: { morning: false, afternoon: false, evening: false },
    friday: { morning: false, afternoon: false, evening: false },
    saturday: { morning: false, afternoon: false, evening: false },
    sunday: { morning: false, afternoon: false, evening: false },
  },
  isOnboarded: false
};

const UserContext = createContext<UserContextType>({
  user: null,
  isAuthenticated: false,
  isLiteOnboarding: false,
  pendingGameId: null,
  setUser: () => {},
  setIsAuthenticated: () => {},
  setIsLiteOnboarding: () => {},
  setPendingGameId: () => {},
  updateUser: () => {},
  logout: () => {},
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLiteOnboarding, setIsLiteOnboarding] = useState<boolean>(false);
  const [pendingGameId, setPendingGameId] = useState<string | null>(null);

  const updateUser = (updates: Partial<UserType>) => {
    setUser((prevUser) => {
      if (!prevUser) return { ...defaultUser, ...updates };
      return { ...prevUser, ...updates };
    });
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        isAuthenticated,
        isLiteOnboarding,
        pendingGameId,
        setUser,
        setIsAuthenticated,
        setIsLiteOnboarding,
        setPendingGameId,
        updateUser,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
