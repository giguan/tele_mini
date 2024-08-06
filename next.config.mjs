/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    output: 'export',
    images: { 
        unoptimized: true // 이미지 최적화 비활성화
    },
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: 'http://localhost:3095/api/:path*'
            }
        ]
    }
    // 아래는 "/" 요청오면 "/goat"로 가게하는거임
    // async redirects() {
    //     return [
    //         {
    //             source: '/',
    //             destination: '/goat',
    //             permanent: true
    //         }
    //     ]
    // }
    
};

export default nextConfig;
