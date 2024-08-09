// components/Match.tsx
import React, { useCallback, useState } from 'react';
import Image from 'next/image';
import { useBetSlip } from 'app/context/BetSlipContext';

interface MatchProps {
  game: any;
  handleButtonClick: (buttonId: string, e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  
}

const Match: React.FC<MatchProps> = ({ game, handleButtonClick }) => {
  const { addOdd, selectedOdds, removeOdd } = useBetSlip();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };


  const handleClick = useCallback((buttonId: string, e: React.MouseEvent<HTMLButtonElement, MouseEvent>, odd: any, category: string) => {
    
    const uniqueId = `${game.gameId}-${buttonId}`;
    const isActive = selectedOdds.some((selectedOdd) => selectedOdd.id === uniqueId);
    
    if(isActive) {
      removeOdd(uniqueId);
    } else {
      addOdd({
        id: uniqueId,
        gameId: game.gameId,
        type: buttonId,
        category,
        value: odd.value,
        label: odd.label,
        home: game.homeTeamName,
        homeLogoPath: game.homeLogoPath,
        away: game.awayTeamName,
        awayLogoPath: game.awayLogoPath,
  
        isActive: !isActive,
      });
    }

    handleButtonClick(uniqueId, e);

  },[selectedOdds, game.gameId, game.homeTeamName, game.homeLogoPath, game.awayTeamName, game.awayLogoPath, addOdd, removeOdd, handleButtonClick]);

  return (
    <div className="bg-[#2b2b2b] text-white p-4 rounded-md max-w-lg mx-auto mb-4 shadow-lg relative">
      <div className="flex justify-between items-center mb-2">
        <div>
          <p className="text-xs text-gray-400">{game.seasonName.split(' ')[0]}</p>
          <p className="text-[#09B854] text-xs font-bold">
            {game.gameStatus === 'READY' ? '진행예정' : game.gameStatus === 'FINAL' ? '경기종료' : game.gameStatus === 'CANCLE' ? '경기취소' : '진행중'}
          </p>
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
          <Image src={"/images/logo" + game.homeLogoPath} alt={game.homeTeamName + " logo"} width={20} height={20} />
          <p className="ml-2 text-sm font-bold">{game.homeTeamName}</p>
        </div>
        <div className="ml-auto text-right text-xl font-bold">
          <p>{game.homeScore}</p>
        </div>
      </div>

      <div className="flex items-center mb-2">
        <div className="flex items-center">
          <Image src={"/images/logo" + game.awayLogoPath} alt={game.awayTeamName + " logo"} width={20} height={20} />
          <p className="ml-2 text-sm font-bold">{game.awayTeamName}</p>
        </div>
        <div className="ml-auto text-right text-xl font-bold">
          <p>{game.awayScore}</p>
        </div>
      </div>

      <p className="mb-2 text-gray-400 text-sm font-bold">승/무/패 (연장포함)</p>

      {game.winDrawLose ? (
        <div>
          <div className="p-2 mb-2">
            <div className="flex justify-between items-center">
              <div className="flex space-x-2 w-full">
                {JSON.parse(game.winDrawLose).map((odd: any, index: number) => (
                  <React.Fragment key={index}>
                    <button
                      className={`bg-gray-700 px-2 py-1 rounded-md flex-1 flex justify-between items-center ${selectedOdds.find((odd) => odd.id === `${game.gameId}-win-${index}`)?.isActive ? 'active' : ''}`}
                      onClick={(e) => handleClick(`win-${index}`, e, { value: odd.win, label: '승' }, '승무패')}
                    >
                      <span className="text-gray-400 text-sm font-bold">승</span>
                      <span className="text-white text-xs font-bold">{odd.win}</span>
                    </button>

                    {odd.draw && (
                    <button
                      className={`bg-gray-700 px-2 py-1 rounded-md flex-1 flex justify-between items-center ${selectedOdds.find((odd) => odd.id === `${game.gameId}-draw-${index}`)?.isActive ? 'active' : ''}`}
                      onClick={(e) => handleClick(`draw-${index}`, e, { value: odd.draw, label: '무' }, '승무패')}
                    >
                        <span className="text-gray-400 text-sm font-bold">무</span>
                        <span className="text-white text-xs font-bold">{odd.draw}</span>
                      </button>
                    )}

                    <button
                      className={`bg-gray-700 px-2 py-1 rounded-md flex-1 flex justify-between items-center ${selectedOdds.find((odd) => odd.id === `${game.gameId}-lose-${index}`)?.isActive ? 'active' : ''}`}
                      onClick={(e) => handleClick(`lose-${index}`, e, { value: odd.lose, label: '패' }, '승무패')}
                    >
                      <span className="text-gray-400 text-sm font-bold">패</span>
                      <span className="text-white text-xs font-bold">{odd.lose}</span>
                    </button>
                  </React.Fragment>
                ))}
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
      ) : (
        <div className="p-2 mb-2 text-gray-400 text-sm bg-gray-700 rounded-md">
          아직 배당이 정해지지 않았습니다.
        </div>
      )}

      <div className={isCollapsed ? 'slide-down' : 'slide-up'}>
        {isCollapsed && (
          <div className="bg-gray-700 p-2 rounded-md">
            <div className="mb-2">
              <p className="mb-2 text-gray-400 text-sm font-bold">합계 (연장전 포함)</p>

              {JSON.parse(game.handicap).map((odd: any, index: any) => (
                <div key={index} className="flex justify-between">
                  <button
                    className={`bg-gray-800 px-2 py-1 rounded-md m-1 flex-1 flex justify-between items-center ${selectedOdds.find((odd) => odd.id === `${game.gameId}-handicap-win-${index}`)?.isActive ? 'active' : ''}`}
                    onClick={(e) => handleClick(`handicap-win-${index}`, e, { value: odd.win, label: '핸디 승' }, '핸디캡')}
                  >
                    <span className="text-gray-400 text-sm font-bold">핸디 ({odd.value})</span>
                    <span className="text-white text-xs font-bold">{odd.win}</span>
                  </button>
                  <button
                    className={`bg-gray-800 px-2 py-1 rounded-md m-1 flex-1 flex justify-between items-center ${selectedOdds.find((odd) => odd.id === `${game.gameId}-handicap-lose-${index}`)?.isActive ? 'active' : ''}`}
                    onClick={(e) => handleClick(`handicap-lose-${index}`, e, { value: odd.lose, label: '핸디 패' }, '핸디캡')}
                  >
                    <span className="text-gray-400 text-sm font-bold">핸디 ({odd.value})</span>
                    <span className="text-white text-xs font-bold">{odd.lose}</span>
                  </button>
                </div>
              ))}

              {JSON.parse(game.overUnder).map((odd: any, index: any) => (
                <div key={index} className="flex justify-between">
                  <button
                    className={`bg-gray-800 px-2 py-1 rounded-md m-1 flex-1 flex justify-between items-center ${selectedOdds.find((odd) => odd.id === `${game.gameId}-over-${index}`)?.isActive ? 'active' : ''}`}
                    onClick={(e) => handleClick(`over-${index}`, e, { value: odd.over, label: '오버' }, '언더오버')}
                  >
                    <span className="text-gray-400 text-sm font-bold">오버 ({odd.point})</span>
                    <span className="text-white text-xs font-bold">{odd.over}</span>
                  </button>
                  <button
                    className={`bg-gray-800 px-2 py-1 rounded-md m-1 flex-1 flex justify-between items-center ${selectedOdds.find((odd) => odd.id === `${game.gameId}-under-${index}`)?.isActive ? 'active' : ''}`}
                    onClick={(e) => handleClick(`under-${index}`, e, { value: odd.under, label: '언더' }, '언더오버')}
                  >
                    <span className="text-gray-400 text-sm font-bold">언더 ({odd.point})</span>
                    <span className="text-white text-xs font-bold">{odd.under}</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(Match);
