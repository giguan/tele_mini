"use client"

import BetSlip from "@/components/betslip";
import MatchList from "@/components/matchList";
import fetcher from "@/utils/fetcher";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from 'react';
import useSWR from "swr";
import { useBetSlip } from 'app/context/BetSlipContext';
import React from "react";
import { useUser } from "app/UserContext";


interface ButtonState {
  id: string;
  isActive: boolean;
}

const Sports = () => {
  
  const { userData } = useUser();

  const { data: gameData, error, mutate } = useSWR(`/api/games`, fetcher);

  const { selectedOdds, isBetSlipVisible, toggleBetSlip } = useBetSlip();
 
  const [circleStyle, setCircleStyle] = useState<React.CSSProperties | null>(null);

  const handleButtonClick = useCallback((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const clientX = e.clientX;
    const clientY = e.clientY;
    const floatButtonElement = document.querySelector('.float-button') as HTMLDivElement;
    const floatButtonRect = floatButtonElement.getBoundingClientRect();

    const moveX = floatButtonRect.left - clientX + (floatButtonRect.width / 2);
    const moveY = floatButtonRect.top - clientY + (floatButtonRect.height / 2);

    setCircleStyle(() => ({
      left: clientX + window.scrollX,
      top: clientY + window.scrollY,
      '--move-x': `${moveX}px`,
      '--move-y': `${moveY}px`,
      opacity: 1,
    } as React.CSSProperties));
  }, []);

  useEffect(() => {
    if (circleStyle) {
      const timer = setTimeout(() => {
        setCircleStyle(null);
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [circleStyle]);

  const carouselRef = useRef<HTMLDivElement>(null);

  const images = [
      { src: '/images/soccer-field.jpg', alt: 'Banner 1' },
      { src: '/images/soccer-match.jpg', alt: 'Banner 2' },
      { src: '/images/soccer.jpg', alt: 'Banner 3' },
    ];

  if(!gameData) return 

  return (
      <div className="p-4">

      {/* 메인 이미지 섹션 */}
      <div className="relative w-full h-64 rounded-lg overflow-hidden mb-4">
        <Image
          src="/images/soccer-field.jpg" // 주신 이미지로 대체하세요
          alt="Main Banner"
          layout="fill"
          objectFit="cover"
          className="rounded-lg brightness-50"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
          <h2 className="text-white text-xl font-bold">최대 10 ETH까지 200% 레이크백 보너스!</h2>
        </div>
      </div>

      {/* 일단 만들어 놓은 섹션 */}
      <div className="relative py-2">
          <div
              ref={carouselRef}
              className="flex overflow-x-auto scrollbar-hide space-x-4 p-4"
          >
              {images.map((image, index) => (
                  <Image
                      key={index}
                      src={image.src}
                      alt={image.alt}
                      className="w-64 h-32 object-cover rounded-lg"
                      width={200}
                      height={100}
                  />
              ))}
          </div>
      </div>

      {/* 경기 섹션 */}
      <div className="flex items-center mb-2">
        <Image
          src="/images/fire.png" 
          alt="Signal Icon" 
          width={32} height={32}
        />
        <p className="text-xl font-bold ml-2">Popular</p>
      </div>

      {gameData && <MatchList gameData={gameData} handleButtonClick={handleButtonClick} />}

      {circleStyle && <div className="moving-circle" style={circleStyle as React.CSSProperties} />}

      <div className="float-button fixed bottom-20 left-1/2 transform -translate-x-1/2 z-1500">
        <button
          className="relative bg-[#541690] text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:bg-pink-600 transition duration-300"
          onClick={toggleBetSlip}
        >
          <Image src="/images/document.png" alt="float button icon" width={32} height={32} className="invert filter brightness-0"/>
          {selectedOdds.length > 0 && (
            <div className="absolute top-1 right-2 bg-black text-white text-xs w-5 h-5 font-bold rounded-full flex items-center justify-center transform translate-x-1/2 -translate-y-1/2">
              {selectedOdds.length}
            </div>
          )}
        </button>
      </div>

      <BetSlip isVisible={isBetSlipVisible} onClose={toggleBetSlip} />

    </div>
  )
}

export default React.memo(Sports);
