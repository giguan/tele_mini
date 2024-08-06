// components/BetSlip.tsx
import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';

interface BetSlipProps {
  isVisible: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

const BetSlip: React.FC<BetSlipProps> = ({ isVisible, onClose, children }) => {
    const [contentHeight, setContentHeight] = useState('30vh'); // 초기 높이를 30vh로 설정
    const contentRef = useRef<HTMLDivElement>(null);
  
    useEffect(() => {
      if (contentRef.current) {
        const height = contentRef.current.scrollHeight + 150; // 추가 높이 조절
        setContentHeight(`${height}px`);
      }
    }, [children]);

  return (
    <div className={`fixed inset-x-0 bottom-0 z-50 transition-transform transform ${isVisible ? 'translate-y-0' : 'translate-y-full'} pointer-events-auto`}>
      <div className="bg-gray-800 text-white w-full mx-auto rounded-t-lg shadow-lg" style={{ maxHeight: '80vh', height: contentHeight }}>
        <div onClick={onClose} className="flex justify-between items-center p-4 border-b border-gray-700 bg-[#9627C9] cursor-pointer">
            <h2 className="text-lg font-bold flex items-center justify-center w-full">
                <button>
                <Image src="/images/document.png" alt="Close" width={24} height={24} className="invert filter brightness-0 w-5 h-5 ml-2" />
                </button>
                <span className="mx-2">Betslip</span>
                <button className="text-gray-400 hover:text-white">
                <Image src="/images/down-arrow.png" alt="Close" width={24} height={24} className="invert filter brightness-0 w-3 h-3 ml-2" />
                </button>
            </h2>
        </div>
        <div className="p-4 overflow-y-auto" ref={contentRef}>
          {children ? (
            children
          ) : (
            <div className="flex justify-center items-center mb-4">
              <Image src="/images/document.png" alt="Place your bets" width={32} height={32} className="invert filter brightness-0" />
              <div className="ml-2">
                <p className="text-lg font-bold">배팅 내역</p>
                <p className="text-sm text-gray-400">선택한 배팅이 없습니다.</p>
              </div>
            </div>
          )}
          <button className="w-full bg-gray-700 text-white py-2 rounded flex justify-center items-center cursor-pointer">
            <Image src="/images/setting.png" alt="Odds Settings" width={16} height={16} className="invert filter brightness-0 mr-2" />
            <p className='font-bold text-sm'>Odds Settings</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BetSlip;
