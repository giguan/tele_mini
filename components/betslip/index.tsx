// components/BetSlip.tsx
import React, { useEffect, useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import { useUser } from 'app/UserContext';
import useSWR from 'swr';
import { useBetSlip } from 'app/context/BetSlipContext';

interface BetSlipProps {
  isVisible: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

export interface SelectedOdd {
  id: number;
  type: string;
  value: string;
  category: string;
  team1: string;
  team2: string;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const BetSlip: React.FC<BetSlipProps> = ({ isVisible, onClose, children }) => {
  const { userData } = useUser();
  const { data, error } = useSWR(userData ? `/api/user/${userData.id}` : null, fetcher);

  const { selectedOdds, removeOdd } = useBetSlip();

  const [contentHeight, setContentHeight] = useState('30vh');
  const contentRef = useRef<HTMLDivElement>(null);
  const [selectedTab, setSelectedTab] = useState('Single');
  const [stake, setStake] = useState(10);

  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isVisible]);

  useEffect(() => {
    if (contentRef.current) {
      const height = contentRef.current.scrollHeight + 150;
      setContentHeight(`${height}px`);
    }
  }, [selectedOdds]);

  const handleTabClick = useCallback((tab: string) => {
    setSelectedTab(tab);
  }, [selectedTab]);

  const handleStakeChange = (amount: number) => {
    setStake(amount);
  };

  const calculatePotentialWin = () => {
    return selectedOdds.reduce((total, odd: any) => total * parseFloat(odd.value), stake).toFixed(2);
  };


  return (
    <div className={`fixed inset-x-0 bottom-0 z-50 transition-transform transform ${isVisible ? 'translate-y-0' : 'translate-y-full'}`}>
      <div className="bg-gray-800 text-white w-full mx-auto rounded-t-lg shadow-lg" style={{ maxHeight: '80vh', height: contentHeight, overflowY: 'auto' }}>
        <div onClick={onClose} className="flex justify-between items-center p-4 border-b border-gray-700 bg-[#9627C9] cursor-pointer">
          <h2 className="text-lg font-bold flex items-center justify-center w-full">
            <span className="mx-2">Betslip</span>
            <Image
              src={"/images/down-arrow.png"}
              alt={"Betslip down Icon"}
              className='invert filter brightness-0 ml-2 w-4 h-4'
              width={20}
              height={20}
            />
          </h2>
        </div>
        <div className="p-4 overflow-y-auto" ref={contentRef}>
          <div className="flex justify-around mb-4 border-b border-gray-700">
            <button
              className={`flex-1 py-2 ${selectedTab === 'Single' ? 'border-b-4 border-[#9627C9]' : ''}`}
              onClick={() => handleTabClick('Single')}
            >
              Single
            </button>
            <button
              className={`flex-1 py-2 ${selectedTab === 'Combo' ? 'border-b-4 border-[#9627C9]' : ''}`}
              onClick={() => handleTabClick('Combo')}
            >
              Combo
            </button>
            <button
              className={`flex-1 py-2 ${selectedTab === 'System' ? 'border-b-4 border-[#9627C9]' : ''}`}
              onClick={() => handleTabClick('System')}
            >
              System
            </button>
          </div>

          <div className="mb-4 flex justify-between items-center bg-[#11171F] p-2 rounded-md">
            <span className="text-sm font-bold text-gray">보유 금액</span>
            <span className="text-xl font-bold">{data?.money}</span>
          </div>

          {selectedOdds.length > 0 ? (
            <div>
              {selectedOdds.map((odd: any, index: number) => (
                <div key={index} className="flex justify-between items-center bg-gray-700 p-2 mb-2 rounded-md">
                  {/* 지금 여기서 버튼 isActive 비활성화 시키게 해야함 */}
                  <button onClick={() => removeOdd(odd.id)} className="text-gray-400 hover:text-white mr-2 w-6 h-6 flex-shrink-0 flex justify-center items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                  <div className="flex-grow p-1">
                    <p className="text-sm font-bold m-1">{odd.season} {odd.home} {odd.category}</p>
                    <div className='flex'>
                      
                      {odd.category === 'win' ? 
                        <span className={`rounded-full w-6 h-6 flex items-center justify-center text-white bg-red-700 mr-1`}>
                          승
                        </span>
                      : ''}

                      <div className='flex align-center justify-center'>
                        <Image
                          src={"/images/logo" + odd.homeLogoPath}
                          alt={"Betslip" + odd.home + "Logo"}
                          className='w-8 h-8'
                          width={20}
                          height={20}
                        />
                        <p className='ml-1'>{odd.home.split(' ')[0]}</p>
                      </div>

                      {odd.category === 'draw' ? 
                        <span className={`rounded-full w-6 h-6 flex items-center justify-center text-white bg-black-700 ml-1 mr-1`}>
                          무
                        </span>
                      : <span className='ml-1 mr-1'>vs</span>}

                      <div className='flex align-center justify-center'>
                        <Image
                          src={"/images/logo" + odd.awayLogoPath}
                          alt={"Betslip" + odd.away + "Logo"}
                          className='w-8 h-8'
                          width={20}
                          height={20}
                        />
                        <p className='ml-1'>{odd.away.split(' ')[0]}</p>
                      </div>

                      {odd.category === 'lose' ? 
                        <span className={`rounded-full w-6 h-6 flex items-center justify-center text-white bg-black-700 ml-1`}>
                          패
                        </span>
                      : ''}

                    </div>
                    <p className="text-xs text-gray-400">{odd.type}</p>
                  </div>
                  <div className="text-xl font-bold">{odd.value}</div>
                </div>
              ))}
              <div className="mt-4">
                <div className="flex justify-around mb-2">
                  {[5, 10, 25, 50].map(amount => (
                    <button
                      key={amount}
                      className={`px-4 py-2 rounded-md ${stake === amount ? 'bg-green-500' : 'bg-gray-600'}`}
                      onClick={() => handleStakeChange(amount)}
                    >
                      {amount} $
                    </button>
                  ))}
                </div>
                <div className="flex justify-between items-center mb-4">
                  <span>Total Bet</span>
                  <span>{stake} $</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Potential Win</span>
                  <span>{calculatePotentialWin()} $</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex justify-center items-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              <div className="ml-2">
                <p className="text-lg font-bold">배팅 내역</p>
                <p className="text-sm text-gray-400">선택한 배팅이 없습니다.</p>
              </div>
            </div>
          )}
          <button className="w-full bg-gray-700 text-white py-2 rounded flex justify-center items-center cursor-pointer mt-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            <p className='font-bold text-sm'>Odds Settings</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BetSlip;
