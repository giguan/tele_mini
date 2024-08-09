import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Odd {
  id: string;
  gameId: number;
  type: string;
  category: string;
  value: string;
  label: string;
  home: string;
  homeLogoPath: string;
  away: string;
  awayLogoPath: string;
  isActive: boolean;
}

interface BetSlipContextProps {
  selectedOdds: Odd[];
  addOdd: (odd: Odd) => void;
  removeOdd: (id: string) => void;
}

const BetSlipContext = createContext<BetSlipContextProps | undefined>(undefined);

export const BetSlipProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedOdds, setSelectedOdds] = useState<any[]>([]);

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

  const removeOdd = (id: string) => {
    setSelectedOdds(prevOdds => prevOdds.filter(odd => odd.id !== id));
  };

  return (
    <BetSlipContext.Provider value={{ selectedOdds, addOdd, removeOdd }}>
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
