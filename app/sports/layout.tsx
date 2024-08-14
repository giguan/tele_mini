"use client";

import Menu from "@/components/menu";
import './style.css';
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { BetSlipProvider } from "app/context/BetSlipContext";


const SportsLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  let isDown = false;
  let startX: number;
  let scrollLeft: number;

  const handleMouseDown = (e: React.MouseEvent) => {
    isDown = true;
    const slider = scrollRef.current;
    if (!slider) return;
    slider.classList.add('active');
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  };

  const handleMouseLeave = () => {
    isDown = false;
    const slider = scrollRef.current;
    if (!slider) return;
    slider.classList.remove('active');
  };

  const handleMouseUp = () => {
    isDown = false;
    const slider = scrollRef.current;
    if (!slider) return;
    slider.classList.remove('active');
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDown) return;
    e.preventDefault();
    const slider = scrollRef.current;
    if (!slider) return;
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 2; // 스크롤 속도를 조정할 수 있습니다
    slider.scrollLeft = scrollLeft - walk;
  };

  return (
    <BetSlipProvider>  
      {/* Top Menu 영역 */}
      <div 
        className="fixed top-0 left-1/2 transform -translate-x-1/2 w-full h-16 max-w-xl bg-header-footer-gradient flex justify-around items-center z-50 text-xs"
        >
        <div className="flex space-x-4">
          <div className="text-center ml-2">
            <Link href="#">
              <Image
                src={"/images/menu-icon/home-outline.png"}
                alt="Home Icon"
                className="w-4 h-4 mx-auto object-contain invert filter brightness-0"
                width={40}
                height={40}
              />
              <p className="mt-1 text-sm font-bold">home</p>
            </Link>
          </div>
          <div className="text-center ml-2">
            <Link href="#">
              <Image
                src={"/images/menu-icon/star-outline.png"}
                alt="Star Icon"
                className="w-4 h-4 mx-auto object-contain invert filter brightness-0"
                width={40}
                height={40}
              />
              <p className="mt-1 text-sm font-bold">즐겨찾기</p>
            </Link>
          </div>
          <div className="text-center ml-2">
            <Link href="#">
              <Image
                src={"/images/menu-icon/document-outline.png"}
                alt="Document Icon"
                className="w-4 h-4 mx-auto object-contain invert filter brightness-0"
                width={40}
                height={40}
              />
              <p className="mt-1 text-sm font-bold">내역</p>
            </Link>
          </div>
        </div>

        <div 
          className="flex-1 overflow-x-auto whitespace-nowrap ml-2 hide-scrollbar scroll-container"
          ref={scrollRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          >
          <div className="inline-flex space-x-4">
            <div className="text-center ml-2 scroll-item">
              <Link href="soccer">
                <Image
                  src={"/images/menu-icon/soccer-outline.png"}
                  alt="Soccer Icon"
                  className="w-10 h-10 mx-auto object-contain invert filter brightness-0"
                  width={40}
                  height={40}
                />
              </Link>
            </div>
            <div className="text-center ml-2 scroll-item">
              <Link href="baseball">
                <Image
                  src={"/images/menu-icon/baseball-outline.png"}
                  alt="Baseball Icon"
                  className="w-10 h-10 mx-auto object-contain invert filter brightness-0"
                  width={40}
                  height={40}
                />
              </Link>
            </div>
            <div className="text-center ml-2 scroll-item">
              <Link href="basketball">
                <Image
                  src={"/images/menu-icon/basketball-outline.png"}
                  alt="Basketball Icon"
                  className="w-10 h-10 mx-auto object-contain invert filter brightness-0"
                  width={40}
                  height={40}
                />
              </Link>
            </div>
            <div className="text-center ml-2 scroll-item">
              <Link href="volleyball">
                <Image
                  src={"/images/menu-icon/volleyball-outline.png"}
                  alt="Volleyball Icon"
                  className="w-10 h-10 mx-auto object-contain invert filter brightness-0"
                  width={40}
                  height={40}
                />
              </Link>
            </div>
            <div className="text-center ml-2 scroll-item">
              <Link href="hockey">
                <Image
                  src={"/images/menu-icon/hockey.png"}
                  alt="Hockey Icon"
                  className="w-10 h-10 mx-auto object-contain invert filter brightness-0"
                  width={40}
                  height={40}
                />
              </Link>
            </div>

            <div className="text-center ml-2 scroll-item">
              <Link href="league-of-legends">
                <Image
                  src={"/images/menu-icon/league-of-legends.png"}
                  alt="league-of-legends Icon"
                  className="w-12 h-10 mx-auto object-contain invert filter brightness-0"
                  width={40}
                  height={40}
                />
              </Link>
            </div>
            
          </div>
        </div>
      </div>

      {/* 컨텐츠 영역 */}
      <main className="p-4 flex justify-center shadow-inner  ">
        {children}
      </main>
      <Menu />
    </BetSlipProvider>
  );
};

export default SportsLayout;
