"use client"

import fetcher from '@/utils/fetcher';
import WebApp from '@twa-dev/sdk';
import axios from 'axios';
import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import useSWR from 'swr';

interface ITeleUser {
  id: string;
  first_name: string;
  last_name: string;
  email?: string;
  money: number;
}

interface UserContextProps {
  userData: any;
  updateUserData: (newData: Partial<ITeleUser>) => void;
  mutate: any
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode}) => {
  
  // const [userData, setUserData] = useState<ITeleUser | null>(null);
  const [isTelegramUser, setIsTelegramUser] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // const { data: userData, error, mutate } = useSWR<ITeleUser>(
  //   isTelegramUser ? '/api/user' : null, // 텔레그램 사용자가 확인된 후에만 데이터 페칭
  //   fetcher
  // );

  const { data: userData, error, mutate } = useSWR<ITeleUser>(
    '/api/user', // 텔레그램 사용자가 확인된 후에만 데이터 페칭
    fetcher
  );


  useEffect(() => {
    if (typeof window !== 'undefined') {
      const user = WebApp.initDataUnsafe.user as unknown as ITeleUser;

      if (user) {
        setIsTelegramUser(true); // 텔레그램 사용자 확인
        axios.post('/api/user/telegram-login', {
          user_id: user.id,
        })
        .then((res) => {
          mutate({ ...res.data }, false); // SWR의 데이터를 업데이트
        })
        .catch((error) => {
          console.log("Error occurred", error);
        });
      }
    }
  }, [isMounted]); // mutate를 의존성으로 추가


  // useEffect(() => {
  //   if (data && !userData) {
  //     setUserData(data);
  //   }
  // }, [data]);


  // const { data, error, mutate  } = useSWR<ITeleUser>('/api/user', fetcher);

  // const [userData, setUserData] = useState<ITeleUser | null>(data || null);

  const updateUserData = (newData: Partial<ITeleUser>) => {
    if (userData) {
      mutate({ ...userData, ...newData }, false);
    }
  };

  if (!userData && isTelegramUser) {
    return <div>Loading...</div>; // 로딩 상태를 표시
  }
  

  // const value = {
  //   userData: data || null,
  //   isLoading: !error && !data,
  //   isError: error
  // };
  
  return (
    <UserContext.Provider value={{ userData, updateUserData, mutate  }}>
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
