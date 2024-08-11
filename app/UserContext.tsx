"use client"

import React, { createContext, useContext, ReactNode } from 'react';

interface ITeleUser {
  money: number;
  id: string;
  first_name: string;
  last_name: string;
}

interface UserContextProps {
  userData: ITeleUser | null;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider = ({ children, value }: { children: ReactNode; value: ITeleUser | null }) => {
  return (
    <UserContext.Provider value={{ userData: value }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
