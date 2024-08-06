import React from 'react';
import { MatchData, BetCategory, MatchResultDetail, HandicapDetail, OverUnderDetail } from '../../types/match'; // 적절한 경로로 수정하세요

interface MatchProps {
  match: MatchData;
}

const Match: React.FC<MatchProps> = ({ match }) => {
  return (
    <div className="bg-[#2b2b2b] text-white p-4 rounded-md max-w-lg mx-auto mb-4 shadow-lg relative">
      <div className="flex justify-between items-center mb-2">
        <div>
          <p className="text-xs text-gray-400">{match.date}</p>
        </div>
      </div>
      <div className="flex items-center mb-2">
        <div className="flex items-center">
          <p className="ml-2 text-sm font-bold">{match.homeTeam}</p>
        </div>
        <div className="ml-auto text-right text-xl font-bold">
          <p></p>
        </div>
      </div>
      <div className="flex items-center mb-2">
        <div className="flex items-center">
          <p className="ml-2 text-sm font-bold">{match.awayTeam}</p>
        </div>
        <div className="ml-auto text-right text-xl font-bold">
          <p></p>
        </div>
      </div>

      {match.categories.map((category: BetCategory) => (
        <div key={category.id}>
          <p className="mb-2 text-gray-400 text-sm font-bold">{category.category}</p>
          <div>
            {category.details.map((detail: MatchResultDetail | HandicapDetail | OverUnderDetail, index: number) => (
              <div key={index} className="p-2 mb-2">
                <div className="flex justify-between items-center">
                  <div className="flex space-x-2 w-full">
                    <button className="bg-gray-700 px-2 py-1 rounded-md flex-1 flex justify-between items-center">
                      <span className="text-gray-400 text-sm font-bold">
                        {detail.type} {('point' in detail) && `(${detail.point})`}
                      </span>
                      <span className="text-white text-xs font-bold">{detail.value}</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Match;
