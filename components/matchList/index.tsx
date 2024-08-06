import React from 'react';
import Match from '@/components/match';
import { MatchData } from 'types/match';

interface MatchListProps {
    matches: MatchData[];
  }
  
  const MatchList: React.FC<MatchListProps> = ({ matches }) => {
    return (
      <div>
        {matches.map((match) => (
          <Match key={match.id} match={match} />
        ))}
      </div>
    );
  };
  
  export default MatchList;