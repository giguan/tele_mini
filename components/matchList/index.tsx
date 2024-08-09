import React from 'react';
import Match from '@/components/match';
import { MatchData } from 'types/match';

interface MatchListProps {
  gameData: any;
  handleButtonClick: (buttonId: string, e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  }
  
  const MatchList: React.FC<MatchListProps> = ({ gameData, handleButtonClick,  }) => {
    return (
      <div>

        {gameData.map((game: any) => 
          <Match key={game.id} game={game} handleButtonClick={handleButtonClick} />
        
        )}
      </div>
    );
  };
  
  export default React.memo(MatchList);