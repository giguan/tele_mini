import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';

interface Odd {
  id: string;
  gameId: number;
  oddsId: number;
  type: string;
  category: string;
  value: string;
  label: string;
  home: string;
  homeShortName: string;
  homeLogoPath: string;
  away: string;
  awayShortName: string;
  awayLogoPath: string;
  stake: number,
  isActive: boolean;
}

interface BetSlipContextProps {
  selectedOdds: Odd[];
  addOdd: (odd: Odd) => void;
  removeOdd: (id: string) => void;
  updateTab: (tab: "single" | "combo" | "system") => void;
  selectedBetType: "single" | "combo" | "system";
  isBetSlipVisible: boolean;
  toggleBetSlip: () => void;
  setSelectedOdds: any;
}

const BetSlipContext = createContext<BetSlipContextProps | undefined>(undefined);

export const BetSlipProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  
  const [selectedOdds, setSelectedOdds] = useState<any[]>([]);

  const [selectedBetType, setSelectedBetType] = useState<"single" | "combo" | "system" >("single")

  const addOdd = (newOdd: Odd) => {
    setSelectedOdds(prevOdds => {
      const index = prevOdds.findIndex(odd => odd.id === newOdd.id);
      if (index > -1) {
        return prevOdds.filter(odd => odd.id !== newOdd.id);
      } else {
        return [...prevOdds, newOdd];
      }
    });
  };

  const removeOdd = useCallback((id: string) => {
    setSelectedOdds(prevOdds => {
      const updatedOdds = prevOdds.filter(odd => odd.id !== id);
  
      // 배팅 내역이 1개만 있을 때 삭제하면 베팅 슬립을 닫기
      if (updatedOdds.length === 0) {
        toggleBetSlip(false);
      }
  
      return updatedOdds;
    });
  }, [selectedOdds]);

  const updateTab = (tab: "single" | "combo" | "system") => {
    setSelectedBetType(tab);
  }

  const [isBetSlipVisible, setIsBetSlipVisible] = useState(false);

  const toggleBetSlip = useCallback((tabBool? :boolean) => {

    if(tabBool !== undefined) {
      setIsBetSlipVisible(tabBool);
    } else {
      setIsBetSlipVisible(!isBetSlipVisible);
    }

  }, [isBetSlipVisible]);



  return (
    <BetSlipContext.Provider value={{ selectedOdds, selectedBetType, setSelectedOdds, isBetSlipVisible, toggleBetSlip, updateTab, addOdd, removeOdd }}>
      {children}
    </BetSlipContext.Provider>
  );
};

export const useBetSlip = () => {
  const context = useContext(BetSlipContext);
  if (!context) {
    throw new Error('useBetSlip must be used within a BetSlipProvider');
  }
  return context;
};
