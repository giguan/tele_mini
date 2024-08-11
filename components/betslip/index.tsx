// components/BetSlip.tsx
import React, { useEffect, useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import { useUser } from 'app/UserContext';
import useSWR from 'swr';
import { useBetSlip } from 'app/context/BetSlipContext';
import { Input } from 'postcss';
import axios from 'axios';
import { useMessage } from 'app/context/MessageContext';

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

  const { showMessage } = useMessage();
  const { userData } = useUser();

  const { selectedOdds, selectedBetType, setSelectedOdds, toggleBetSlip, removeOdd, updateTab } = useBetSlip();

  const [stake, setStake] = useState(0); // Combo 배팅을 위한 스테이크 값
  const [stakes, setStakes] = useState<{ [key: string]: number }>({}); // Single 배팅을 위한 스테이크 값

  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState('30vh');

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

  const handleStakeChange = useCallback((amount: number, oddId?: string) => {

    if (selectedBetType === 'single' && oddId) {
      setStakes((prevStakes) => ({
        ...prevStakes,
        [oddId]: amount,
      }));
    } else {
      setStake(amount);
    }

  }, [selectedBetType, stakes, stake]);

  const calculateTotalBettingMoney = () => {
    if (selectedBetType === 'single') {
      return Object.values(stakes).reduce((total, s) => total + s, 0);
    }
    return stake;
  };

  const calculatePotentialWin = () => {
    if (selectedBetType === 'single') {
      return selectedOdds.reduce((total, odd) => total + parseFloat(odd.value) * (stakes[odd.id] || 0), 0).toFixed(2);
    } else {
      const totalOdds = selectedOdds.reduce((total, odd) => total * parseFloat(odd.value), 1);
      return (totalOdds * stake).toFixed(2);
    }
  };

  const calculateTotalOdds = () => {
    return selectedOdds.reduce((total, odd) => total * parseFloat(odd.value), 1).toFixed(2);
  };

  const onSubmitBet = useCallback(() => {

    if (selectedOdds.length === 0) return alert("배팅된 게임이 없습니다.");
    if (calculateTotalBettingMoney() === 0) return alert("배팅 금액을 설정하세요.");

    if (!userData) return showMessage("사용자 데이터를 가져올 수 없습니다.", 'error');

    const betData = {
      userId: userData?.id,
      betType: selectedBetType,
      stake: selectedBetType === 'combo' ? stake : undefined, 
      totalPotentialWin: calculatePotentialWin(),
      odds: selectedOdds.map(odd => ({
        oddsId: odd.oddsId,
        value: odd.value,
        stake: selectedBetType === 'single' ? stakes[odd.id] : null,
        category: odd.category, // 승무패/오버언더/핸디캡/커스텀 등의 정보
        betId: odd.id,
        label: odd.label, // 구체적인 항목 (승, 무, 패 등)
        gameId: odd.gameId, // 어떤 경기의 배팅인지 추적할 수 있게 추가
        potential: selectedBetType === 'single' ? (stakes[odd.id]) * parseFloat(odd.value) : null
      })),
    };

    axios.post('/api/Bets', {
      betData
    })
      .then((res) => {
        console.log("res",res)

        showMessage('배팅 완료', 'success')
        setSelectedOdds([])
        toggleBetSlip();
      })
      .catch((error) => {
        console.log(error)
      })
    
    // 베팅 제출 로직 처리
  }, [selectedOdds, stake, stakes, userData, selectedBetType, showMessage, setSelectedOdds]);

  if (!userData) return null;

  return (
    <div className={`fixed inset-x-0 bottom-0 z-50 transition-transform transform ${isVisible ? 'translate-y-0' : 'translate-y-full'}`}>
      <div className="bg-gray-800 text-white w-full mx-auto rounded-t-lg shadow-lg" style={{ maxHeight: '80vh', height: contentHeight, overflowY: 'auto' }}>
        <div onClick={() => toggleBetSlip()} className="flex justify-between items-center p-4 border-b border-gray-700 bg-[#9627C9] cursor-pointer">
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
              className={`flex-1 py-2 ${selectedBetType === 'single' ? 'border-b-4 border-[#9627C9]' : ''}`}
              onClick={() => updateTab('single')}
            >
              Single
            </button>
            <button
              className={`flex-1 py-2 ${selectedBetType === 'combo' ? 'border-b-4 border-[#9627C9]' : ''}`}
              onClick={() => updateTab('combo')}
            >
              Combo
            </button>
            <button
              className={`disable flex-1 py-2 ${selectedBetType === 'system' ? 'border-b-4 border-[#9627C9]' : ''}`}
              onClick={() => updateTab('system')}
            >
              System
            </button>
          </div>

          <div className="mb-4 flex justify-between items-center bg-[#11171F] p-2 rounded-md">
            <span className="text-sm font-bold text-gray">보유 금액</span>
            <span className="text-xl font-bold">{userData?.money - calculateTotalBettingMoney()} KRW</span>
          </div>

          {selectedOdds.length > 0 ? (
            <div>
              {selectedOdds.map((odd: any, index: number) => (
                <div key={index} className="flex justify-between items-center bg-gray-700 p-2 mb-2 rounded-md relative">
                  <button onClick={() => removeOdd(odd.id)} className="text-gray-400 hover:text-white mr-2 w-6 h-6 flex-shrink-0 flex justify-center items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                  <div className="flex p-1 relative">
                      <div className='flex items-center'>
                        <Image
                          src={"/images/logo" + odd.homeLogoPath}
                          alt={odd.home + "Logo"}
                          className='w-4 h-4'
                          width={20}
                          height={20}
                        />
                        <p className='text-sm font-bold m-1'>{odd.homeShortName}</p>
                      </div>
                      <p>&nbsp;&nbsp;&nbsp;&nbsp;vs&nbsp;&nbsp;&nbsp;&nbsp;</p>
                      <div className='flex items-center'>
                        <Image
                          src={"/images/logo" + odd.awayLogoPath}
                          alt={odd.away + "Logo"}
                          className='w-4 h-4'
                          width={20}
                          height={20}
                        />
                        <p className='text-sm font-bold m-1'>{odd.awayShortName}</p>
                      </div>
                    <p className="text-xs text-gray-400">{odd.category}</p>
                  </div>
                  <div className="text-xl font-bold mr-6 mb-8">{odd.value}</div>
                  {selectedBetType === 'single' && (
                    <input 
                      type="number" 
                      value={stakes[odd.id] || 0}
                      onChange={(e) => handleStakeChange(Number(e.target.value), odd.id)} 
                      className="w-40 text-right text-xl font-bold bg-[#11171f] text-white border-none outline-none absolute right-5 bottom-1 rounded-lg"
                    />
                  )}
                </div>
              ))}
              {selectedBetType === 'combo' && (
                <div className="mt-4">
                  <input 
                    type="number" 
                    value={stake} 
                    onChange={(e) => handleStakeChange(Number(e.target.value))} 
                    className="w-full text-right text-xl font-bold bg-[#11171f] text-white border-none outline-none rounded-lg p-2"
                    placeholder="Total Stake"
                  />
                  <div className="flex justify-around mb-2 mt-4">
                    {[1000, 5000, 10000, 50000].map(amount => (
                      <button
                        disabled={stake === amount}
                        key={amount}
                        className={`px-4 py-2 rounded-md ${stake === amount ? 'bg-green-500' : 'bg-gray-600'}`}
                        onClick={() => handleStakeChange(amount)}
                      >
                        {amount} 원
                      </button>
                    ))}
                  </div>
                  <div className="flex justify-between items-center mb-4">
                    <span>예상 배당률</span>
                    <span>{calculateTotalOdds()}</span>
                  </div>
                </div>
              )}
              <div className="flex justify-between items-center mt-4">
                <span>적중 예상 금액</span>
                <span>{calculatePotentialWin()} KRW</span>
              </div>
            </div>
          ) : (
            <div className="flex justify-center items-center mb-4">
              <div className=' w-12 h-12 bg-gray-700 rounded-3xl flex justify-center items-center'>
                <Image
                  src="/images/document.png"
                  alt="배팅 내역 아이콘"
                  className='w-8 h-8 invert filter brightness-0'
                  width={40}
                  height={40}
                />
              </div>

              <div className="ml-2">
                <p className="text-lg font-bold">배팅 내역</p>
                <p className="text-sm text-gray-400">선택한 배팅이 없습니다.</p>
              </div>
            </div>
          )}
          {selectedOdds.length > 0 && (
            <button className="w-full bg-header-footer-gradient text-white py-2 rounded flex justify-center items-center cursor-pointer mt-4" onClick={onSubmitBet}>
              <Image
                src="/images/send.png"
                alt="배팅 아이콘"
                className='w-6 h-6 invert filter brightness-0'
                width={40}
                height={40}
              />
              <p className='font-bold text-sm ml-2'>배팅 진행</p>
            </button>
          )}
          <button className="w-full bg-gray-700 text-white py-2 rounded flex justify-center items-center cursor-pointer mt-4">
            <Image
              src="/images/setting.png"
              alt="설정 아이콘"
              className='w-6 h-6 invert filter brightness-0'
              width={40}
              height={40}
            />
            <p className='font-bold text-sm ml-2'>Odds Settings</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BetSlip;
