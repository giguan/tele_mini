"use client"
import type { Metadata } from "next";
import "@/styles/globals.css";
import Script from "next/script";
import FontSetup from "./font-setup";
import { createContext, useEffect, useState } from "react";
import WebApp from "@twa-dev/sdk";
import axios from "axios";
import { UserProvider } from "./UserContext";

interface ITeleUser {
  id: string;
  first_name: string;
  last_name: string;
}

interface UserContextProps {
  userData: ITeleUser | null;
}
const UserContext = createContext<UserContextProps | undefined>(undefined);

// export const metadata: Metadata = {
//   title: "Telegram Mini App",
//   description: "Generated by create next app",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const [userData, setUserData] = useState<ITeleUser | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const user = WebApp.initDataUnsafe.user as unknown as ITeleUser ;

      if (user) {
        setUserData(user);
        axios.post('/api/user', {
          userId: user.id,
          first_name: user.first_name,
          last_name: user.last_name
        })
          .then((res) => {
            console.log("User saved successfully");
          })
          .catch((error) => {
            console.log("Error occurred", error);
          });
      }
    }
  }, []);

  useEffect(() => {
    if (userData) {

      axios.post('/api/user', { 
        userId: userData.id,
        first_name: userData.first_name,
        last_name: userData.last_name
      })
      .then((res) => {
        console.log("ssssssssssssssssssssssssss");
      })
      .catch((error) => {
        console.log("error 발생", error);
      });
    }
  }, [userData]);

  return (
    <html lang="en">
      <head>
        <FontSetup />
        <Script src="https://telegram.org/js/telegram-web-app.jg" strategy="beforeInteractive" />
      </head>
      <body className="bg-dark-bg text-white min-h-screen flex flex-col">
        <UserProvider value={userData}>
          {children}
        </UserProvider>
      </body>
    </html>
  );
}
