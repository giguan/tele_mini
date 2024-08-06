"use client"

import BetSlip from "@/components/betslip";
import Image from "next/image";
import { useEffect, useRef, useState } from 'react';


interface ButtonState {
  id: string;
  isActive: boolean;
}

const matches = [
  {
    id: 'match1',
    homeTeam: 'San Diego Padres',
    awayTeam: 'Pittsburgh Pirates',
    date: 'Tomorrow, 05:40',
    categories: [
      {
        id: 'match1-result',
        category: 'Match Result',
        details: [
          { type: 'Win', team: 'San Diego Padres', value: 1.62 },
          { type: 'Lose', team: 'Pittsburgh Pirates', value: 2.45 },
        ],
      },
      {
        id: 'match1-handicap',
        category: 'Handicap',
        details: [
          { type: 'Handicap', team: 'San Diego Padres', point: -3, value: 3.27 },
          { type: 'Handicap', team: 'Pittsburgh Pirates', point: 3, value: 1.39 },
          { type: 'Handicap', team: 'San Diego Padres', point: -2.5, value: 2.69 },
          { type: 'Handicap', team: 'Pittsburgh Pirates', point: 2.5, value: 1.53 },
          { type: 'Handicap', team: 'San Diego Padres', point: -2, value: 2.38 },
          { type: 'Handicap', team: 'Pittsburgh Pirates', point: 2, value: 1.65 },
          { type: 'Handicap', team: 'San Diego Padres', point: -1.5, value: 2.05 },
          { type: 'Handicap', team: 'Pittsburgh Pirates', point: 1.5, value: 1.86 },
          { type: 'Handicap', team: 'San Diego Padres', point: -1, value: 1.78 },
          { type: 'Handicap', team: 'Pittsburgh Pirates', point: 1, value: 2.16 },
        ],
      },
      {
        id: 'match1-ou',
        category: 'Over/Under',
        details: [
          { type: 'Over', point: 4.5, value: 1.17 },
          { type: 'Under', point: 4.5, value: 5.85 },
          { type: 'Over', point: 6.5, value: 1.47 },
          { type: 'Under', point: 6.5, value: 2.90 },
          { type: 'Over', point: 7, value: 1.57 },
          { type: 'Under', point: 7, value: 2.57 },
          { type: 'Over', point: 7.5, value: 1.77 },
          { type: 'Under', point: 7.5, value: 2.17 },
          { type: 'Over', point: 8, value: 1.92 },
          { type: 'Under', point: 8, value: 1.98 },
        ],
      },
    ],
  },
];


const Sports = () => {

    const carouselRef = useRef<HTMLDivElement>(null);

    //이거 상태관리좀 생각해봐야할듯 match하나당 객체로 해서 진행해야할것같은디
    const [activeButtons, setActiveButtons] = useState<ButtonState[]>([]);
    const [circleStyle, setCircleStyle] = useState<React.CSSProperties | null>(null);

    const images = [
        { src: '/images/soccer-field.jpg', alt: 'Banner 1' },
        { src: '/images/soccer-match.jpg', alt: 'Banner 2' },
        { src: '/images/soccer.jpg', alt: 'Banner 3' },
      ];

    const [isCollapsed, setIsCollapsed] = useState(false);

    const toggleCollapse = () => {
      setIsCollapsed(!isCollapsed);
    };

    const handleButtonClick = (buttonId: string, e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      setActiveButtons((prev) => {
        const buttonIndex = prev.findIndex((button) => button.id === buttonId);
        if (buttonIndex > -1) {
          // 버튼이 이미 배열에 있는 경우 배열에서 제거
          // setBadgeCount((prev) => prev - 1);
          return prev.filter((button) => button.id !== buttonId);
        } else {
          // 버튼이 배열에 없는 경우 배열에 추가
          const clientX = e.clientX;
          const clientY = e.clientY;
          const floatButtonElement = document.querySelector('.float-button') as HTMLDivElement;
          const floatButtonRect = floatButtonElement.getBoundingClientRect();
  
          const moveX = floatButtonRect.left - clientX + (floatButtonRect.width / 2);
          const moveY = floatButtonRect.top - clientY + (floatButtonRect.height / 2);
  
          setCircleStyle({
            left: clientX + window.scrollX,
            top: clientY + window.scrollY,
            '--move-x': `${moveX}px`,
            '--move-y': `${moveY}px`,
            opacity: 1,
          } as React.CSSProperties);
  
          // setBadgeCount((prev) => prev + 1);
          return [...prev, { id: buttonId, isActive: true }];
        }
      });
    };
  
    useEffect(() => {
      if (circleStyle) {
        const timer = setTimeout(() => {
          setCircleStyle(null);
        }, 200);
        return () => clearTimeout(timer);
      }
    }, [circleStyle]);
  
    const isButtonActive = (buttonId: string) => {
      return activeButtons.find((button) => button.id === buttonId)?.isActive;
    };

    const [isBetSlipVisible, setIsBetSlipVisible] = useState(false);

    const toggleBetSlip = () => {
      setIsBetSlipVisible(!isBetSlipVisible);
    };
  

    return (
        <div className="p-4">

        {/* 메인 이미지 섹션 */}
        <div className="relative w-full h-64 rounded-lg overflow-hidden mb-4">
        {/* <div className="absolute top-0 left-0 right-0 h-full w-full bg-black opacity-50 z-10"></div> */}
          <Image
            src="/images/soccer-field.jpg" // 주신 이미지로 대체하세요
            alt="Main Banner"
            layout="fill"
            objectFit="cover"
            className="rounded-lg brightness-50"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
            <h2 className="text-white text-xl font-bold">최대 10 ETH까지 200% 레이크백 보너스!</h2>
            {/* <button className="mt-2 bg-orange-500 text-white px-4 py-2 rounded">지금 배팅</button> */}
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
        <div className="bg-[#2b2b2b] text-white p-4 rounded-md max-w-lg mx-auto mb-4 shadow-lg relative">
          <div className="flex justify-between items-center mb-2">
            <div>
              <p className="text-xs text-gray-400">USA · MLB</p>
              <p className="text-[#09B854] text-xs font-bold">6회초</p>
            </div>
            <div className="flex">
              <Image src="/images/signal.png" alt="Signal Icon" className="ml-2 invert filter brightness-0" width={16} height={16} />
              <button onClick={() => alert("@@")}>
                <Image src="/images/menu-icon/star-outline.png" alt="Signal Icon" className="ml-2 invert filter brightness-0" width={16} height={16} />
              </button>
            </div>
          </div>
          <div className="flex items-center mb-2">
            <div className="flex items-center">
              <Image src="/images/test_logo/3638.png" alt="Dodgers Logo" width={20} height={20} />
              <p className="ml-2 text-sm font-bold">Los Angeles Dodgers</p>
            </div>
            <div className="ml-auto text-right text-xl font-bold">
              <p>4</p>
            </div>
          </div>
          <div className="flex items-center mb-2">
            <div className="flex items-center">
              <Image src="/images/test_logo/3635.png" alt="Phillies Logo" width={20} height={20} />
              <p className="ml-2 text-sm font-bold">Philadelphia Phillies</p>
            </div>
            <div className="ml-auto text-right text-xl font-bold">
              <p>3</p>
            </div>
          </div>

          <p className="mb-2 text-gray-400 text-sm font-bold">승/무/패 (연장포함)</p>
          <div>
            <div className="p-2 mb-2">
              <div className="flex justify-between items-center">
                <div className="flex space-x-2 w-full">
                  <button 
                    className={`bg-gray-700 px-2 py-1 rounded-md flex-1 flex justify-between items-center ${isButtonActive('button1') ? 'active' : ''}`}
                    onClick={(e) => handleButtonClick('button1',e)}>
                    <span className="text-gray-400 text-sm font-bold">1</span>
                    <span className="text-white text-xs font-bold">1.08</span>
                  </button>
                  <button 
                    className={`bg-gray-700 px-2 py-1 rounded-md flex-1 flex justify-between items-center ${isButtonActive('button2') ? 'active' : ''}`}
                    onClick={(e) => handleButtonClick('button2',e)}>
                    <span className="text-gray-400 text-sm font-bold">2</span>
                    <span className="text-white text-xs font-bold">7.75</span>
                  </button>
                  <button onClick={toggleCollapse} className="bg-gray-700 px-2 py-1 rounded-md flex justify-center items-center">
                    {isCollapsed ? (
                      <Image src="/images/up-arrow.png" alt="Collapse" className="invert filter brightness-0 w-2 h-2" width={10} height={10} />
                    ) : (
                      <Image src="/images/down-arrow.png" alt="Collapse" className="invert filter brightness-0 w-2 h-2" width={10} height={10} />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className={isCollapsed ? `slide-down` : 'slide-up'}>
            {isCollapsed && (
              <div className="bg-gray-700 p-2 rounded-md ">
                <div className="mb-2">
                  <p className="mb-2 text-gray-400 text-sm font-bold">합계 (연장전 포함)</p>

                  <div className="flex justify-between">
                    <button 
                      className={`bg-gray-800 px-2 py-1 rounded-md m-1 flex-1 flex justify-between items-center ${isButtonActive('button3') ? 'active' : ''}`}
                      onClick={(e) => handleButtonClick('button3', e)}>
                      <span className="text-gray-400 text-sm font-bold">오버 5.5</span>
                      <span className="text-white text-xs font-bold">1.57</span>
                    </button>
                    <button 
                      className={`bg-gray-800 px-2 py-1 rounded-md m-1 flex-1 flex justify-between items-center ${isButtonActive('button4') ? 'active' : ''}`}
                      onClick={(e) => handleButtonClick('button4', e)}>
                      <span className="text-gray-400 text-sm font-bold">언더 5.5</span>
                      <span className="text-white text-xs font-bold">2.21</span>
                    </button>
                  </div>

                  <div className="flex justify-between">
                    <button 
                      className={`bg-gray-800 px-2 py-1 rounded-md m-1 flex-1 flex justify-between items-center ${isButtonActive('button5') ? 'active' : ''}`}
                      onClick={(e) => handleButtonClick('button5', e)}>
                      <span className="text-gray-400 text-sm font-bold">오버 6.5</span>
                      <span className="text-white text-xs font-bold">1.80</span>
                    </button>
                    <button 
                      className={`bg-gray-800 px-2 py-1 rounded-md m-1 flex-1 flex justify-between items-center ${isButtonActive('button6') ? 'active' : ''}`}
                      onClick={(e) => handleButtonClick('button6', e)}>
                      <span className="text-gray-400 text-sm font-bold">언더 6.5</span>
                      <span className="text-white text-xs font-bold">1.88</span>
                    </button>
                  </div>

                  <div className="flex justify-between">
                    <button 
                      className={`bg-gray-800 px-2 py-1 rounded-md m-1 flex-1 flex justify-between items-center ${isButtonActive('button7') ? 'active' : ''}`}
                      onClick={(e) => handleButtonClick('button7', e)}>
                      <span className="text-gray-400 text-sm font-bold">오버 7.5</span>
                      <span className="text-white text-xs font-bold">2.20</span>
                    </button>
                    <button 
                      className={`bg-gray-800 px-2 py-1 rounded-md m-1 flex-1 flex justify-between items-center ${isButtonActive('button8') ? 'active' : ''}`}
                      onClick={(e) => handleButtonClick('button8', e)}>
                      <span className="text-gray-400 text-sm font-bold">언더 7.5</span>
                      <span className="text-white text-xs font-bold">1.58</span>
                    </button>
                  </div>

                </div>
              </div>
            )}
          </div>
        </div>

        {circleStyle && <div className="moving-circle" style={circleStyle as React.CSSProperties} />}

        <div className="float-button fixed bottom-20 left-1/2 transform -translate-x-1/2 z-1500">
          <button
            className="relative bg-[#541690] text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:bg-pink-600 transition duration-300"
            onClick={toggleBetSlip}
          >
            <Image src="/images/document.png" alt="float button icon" width={32} height={32} className="invert filter brightness-0"/>
            {activeButtons.length > 0 && (
              <div className="absolute top-1 right-2 bg-black text-white text-xs w-5 h-5 font-bold rounded-full flex items-center justify-center transform translate-x-1/2 -translate-y-1/2">
                {activeButtons.length}
              </div>
            )}
          </button>
        </div>

        <BetSlip isVisible={isBetSlipVisible} onClose={toggleBetSlip} />

      </div>
    )
}

export default Sports;
