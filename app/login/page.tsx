"use client"

import fetcher from "@/utils/fetcher";
import axios from "axios";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from "react";
import useSWR from "swr";

const Login: React.FC = () => {

  const { data: userData, error, mutate } = useSWR('/api/user', fetcher);

    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true); // 컴포넌트가 클라이언트에서 마운트되었음을 표시
    }, []);
  
    const handleSubmit = useCallback(async (e: React.FormEvent) => {
      e.preventDefault();
      if (!isMounted) return;
      // Handle login logic here
      console.log('Email:', email, 'Password:', password);

      try {
        const res = await axios.post('/api/user/login', {
          email,
          password
        });
  
        console.log("1111111111111",userData)

        // 서버에서 받은 사용자 데이터를 mutate에 전달하여 업데이트
        await mutate({ ...res.data }, false); 
  
        console.log("2222222222222222",userData)
        // 로그인 성공 후 페이지 이동
        router.push('/');
  
      } catch (error) {
        console.error("Login error:", error);
      }

    }, [email, password, isMounted, router, mutate]);

    if (!isMounted) return null;
  
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="bg-gray-800 text-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <h2 className="text-2xl font-bold text-center mb-8">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Login
            </button>
          </form>
          <p className="text-sm text-center text-gray-400 mt-4">
            계정이 없나요? <Link href="signup" className="text-indigo-500 hover:underline">Sign up</Link>
          </p>
        </div>
      </div>
    );
  };

export default Login;