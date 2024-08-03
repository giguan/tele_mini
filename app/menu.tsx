'use client';

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Menu = () => {

    const pathname = usePathname();


    


    return (
        <footer className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-xl bg-header-footer-gradient flex justify-around items-center z-50 text-xs">
            <div className={`text-center w-1/5 m-1 p-2 rounded-2xl ${pathname === "/menu" ? "bg-[#1c1f24] text-white" : "text-[#85827d]"}`}>
                <Link href="/menu" className="text-white">
                    <Image 
                        src="/images/menu-icon/menu-fill.png"
                        alt="Menu icon fill icon"
                        className="w-4 h-4 mx-auto invert filter brightness-0"
                        width={4}
                        height={4}
                    />
                    <p className="mt-1">메뉴</p>
                </Link>
            </div>
            <div className={`text-center w-1/5 m-1 p-2 rounded-2xl ${pathname === "/" ? "bg-[#1c1f24] text-white" : "text-[#85827d]"}`}>
                <Link href="/" className="text-white">
                    <Image 
                        src="/images/menu-icon/home-fill.png"
                        alt="Home icon fill icon"
                        className="w-4 h-4 mx-auto invert filter brightness-0"
                        width={4}
                        height={4}
                    />
                    <p className="mt-1">홈</p>
                </Link>
            </div>
            <div className={`text-center w-1/5 m-1 p-2 rounded-2xl ${pathname === "/casino" ? "bg-[#1c1f24] text-white" : "text-[#85827d]"}`}>
                <Link href="/casino" className="text-white">
                    <Image 
                        src="/images/menu-icon/card-fill.png"
                        alt="Card fill icon"
                        className="w-4 h-4 mx-auto invert filter brightness-0"
                        width={4}
                        height={4}
                    />
                    <p className="mt-1">카지노</p>
                </Link>
            </div>
            <div className={`text-center w-1/5 m-1 p-2 rounded-2xl ${pathname === "/sports" ? "bg-[#1c1f24] text-white" : "text-[#85827d]"}`}>
                <Link href="/sports" className="text-white">
                    <Image 
                        src="/images/menu-icon/sports-fill.png"
                        alt="Sports fill icon"
                        className="w-4 h-4 mx-auto invert filter brightness-0"
                        width={4}
                        height={4}
                    />
                    <p className="mt-1">스포츠</p>
                </Link>
            </div>
            <div className={`text-center w-1/5 m-1 p-2 rounded-2xl ${pathname === "/wallet" ? "bg-[#1c1f24] text-white" : "text-[#85827d]"}`}>
                <Link href="/wallet" className="text-white">
                    <Image 
                        src="/images/menu-icon/wallet-fill.png"
                        alt="Wallet fill icon"
                        className="w-4 h-4 mx-auto invert filter brightness-0"
                        width={4}
                        height={4}
                    />
                    <p className="mt-1">지갑</p>
                </Link>
            </div>
        </footer>
        
    )
}

export default Menu;