"use client"
import type { Metadata } from "next";
import "@/styles/globals.css";
import Script from "next/script";
import FontSetup from "./font-setup";
import { createContext, useEffect, useState } from "react";
import WebApp from "@twa-dev/sdk";
import axios from "axios";
import { UserProvider, useUser } from "./UserContext";
import { MessageProvider } from './context/MessageContext';

interface ITeleUser {
  id: string;
  first_name: string;
  last_name: string;
  money : number;
}

interface UserContextProps {
  userData: ITeleUser | null;
}
export default function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) {

  // const { userData } = useUser();

  // const [userData, setUserData] = useState<ITeleUser | null>(null);

  // useEffect(() => {
  //   if (typeof window !== 'undefined') {
  //     const user = WebApp.initDataUnsafe.user as unknown as ITeleUser ;

  //     if (user) {
  //       mutate({user});
  //       axios.post('/api/user', {
  //         user_id: user.id,
  //         first_name: user.first_name,
  //         last_name: user.last_name
  //       })
  //       .then((res) => {

  //         mutate({
  //           ...user,
  //           money: res.data.money,  // 서버에서 받은 사용자 데이터를 병합합니다.
  //         });
  //         // setUserData({
  //         //   ...user,
  //         //   money: res.data.money,
  //         // });
  //         })
  //         .catch((error) => {
  //           console.log("Error occurred", error);
  //         });
  //     }
  //   }
  // }, []);

  // useEffect(() => {
  //   if (userData) {
  //     axios.post('/api/user', { 
  //       user_id: userData.id,
  //       first_name: userData.first_name,
  //       last_name: userData.last_name
  //     })
  //     .then((res) => {
  //       console.log("ssssssssssssssssssssssssss");
  //     })
  //     .catch((error) => {
  //       console.log("error 발생", error);
  //     });
  //   }
  // }, [userData]);

  return (
    <html lang="en">
      <head>
        <FontSetup />
        <Script src="https://telegram.org/js/telegram-web-app.jg" strategy="beforeInteractive" />
      </head>
      <body className="bg-dark-bg text-white min-h-screen flex flex-col">
        <UserProvider>
          <MessageProvider>
            {children}
          </MessageProvider>
        </UserProvider>
      </body>
    </html>
  );
}
