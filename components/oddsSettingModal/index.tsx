import { useState } from "react";
import Image from 'next/image';
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';

interface WinDrawLose {
    id: string;
    win: string;
    draw: string;
    lose: string;
}

interface Handicap {
    id: string;
    value: string;
    win: string;
    lose: string;
}

interface OverUnder {
    id: string;
    point: string;
    under: string;
    over: string;
}

interface OddsSettingModalProps {
    game: any;  // 정확한 타입을 알고 있다면 any 대신 그 타입을 사용하세요
    onClose: any;
}

const OddsSettingModal: React.FC<OddsSettingModalProps> = ({ game, onClose }) => {

    console.log("#################", game)    

    const [winDrawLoseList, setWinDrawLoseList] = useState<WinDrawLose[]>(() => 
        game?.winDrawLose ? 
        JSON.parse(game.winDrawLose).map((odd: any) => ({
            id: uuidv4(), 
            win: odd.win || '', 
            draw: odd.draw || '', 
            lose: odd.lose || ''
        })) 
        : 
        [{ id: uuidv4(), win: '', draw: '', lose: '' }]
    );

    const [handicapList, setHandicapList] = useState<Handicap[]>(() => 
        game?.handicap ? 
        JSON.parse(game.handicap).map((odd: any) => ({
            id: uuidv4(), 
            value: odd.value || '', 
            win: odd.win || '', 
            lose: odd.lose || ''
        })) 
        : 
        [{ id: uuidv4(), value: '', win: '', lose: '' }]
    );

    const [overUnderList, setOverUnderList] = useState<OverUnder[]>(() => 
        game?.overUnder ? 
        JSON.parse(game.overUnder).map((odd: any) => ({
            id: uuidv4(), 
            point: odd.point || '', 
            under: odd.under || '', 
            over: odd.over || ''
        })) 
        : 
        [{ id: uuidv4(), point: '', under: '', over: '' }]
    );

    const handleOddsChange = <T extends { id: string }>(
        listSetter: React.Dispatch<React.SetStateAction<T[]>>, 
        id: string, 
        field: keyof T, 
        value: string
    ) => {
        listSetter(prevList => prevList.map((odds: T) => 
            odds.id === id ? { 
                ...odds, 
                [field]: value
            } : odds
        ));
    };

    const addNewOdds = <T extends { id: string }>(
        listSetter: React.Dispatch<React.SetStateAction<T[]>>, 
        newOdds: T
    ) => {
        listSetter(prevList => [...prevList, newOdds]);
    };

    const removeOdds = <T extends { id: string }>(
        listSetter: React.Dispatch<React.SetStateAction<T[]>>, 
        id: string
    ) => {
        listSetter(prevList => prevList.filter(odds => odds.id !== id));
    };

    const handleSave = async () => {
        const data = {
            gameId: game.gameId,
            winDrawLoseList,
            handicapList,
            overUnderList
        };

        try {
            await axios.post('/api/odds/save', data);
            onClose();
        } catch (error) {
            alert("저장하다 문제생김");
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-75">
            <div className="bg-white p-6 rounded shadow-md w-1/3">
                <h2 className="text-xl font-bold mb-4">{game ? 'Edit Odds' : 'Add Odds'}</h2>
                <div className="bg-lightgray-100 w-full mb-4 p-4">
                    <div className="flex justify-between font-semibold mb-2">
                        <span>{game.seasonName.split(' ')[0]}</span>
                        <div className="flex">
                            <div>{game.gameDate.split('T')[0]}</div>
                            <div className="ml-2">{game.gameDate.split('T')[1].substring(0, 5)}</div>
                        </div>
                    </div>
                    <div className="flex justify-between font-semibold">
                        <div className="flex items-center">
                            <Image
                                src={"/images/logo" + game.homeLogoPath}
                                alt={game.homeTeamName + " Logo"}
                                width={30}
                                height={30}
                            />
                            <span className="ml-2">{game.homeShortName}</span>
                        </div>
                        <div className="flex items-center">
                            <span className="mr-2">{game.awayShortName}</span>
                            <Image
                                src={"/images/logo" + game.awayLogoPath}
                                alt={game.awayTeamName + " Logo"}
                                width={30}
                                height={30}
                            />
                        </div>
                    </div>
                </div>
                <div className="mb-4">
                    <h3 className="text-lg font-semibold mb-2">배당 설정</h3>
                    <div className="mb-4">
                        <div className="flex items-center mb-2">
                            <label className="block font-semibold mb-1">승/무/패 배당</label>
                            <button 
                                type="button" 
                                className="ml-4 bg-green-500 text-white px-2 py-1 rounded" 
                                onClick={() => addNewOdds(setWinDrawLoseList, { id: uuidv4(), win: '', draw: '', lose: '' })}
                            >
                                +
                            </button>
                        </div>
                        {winDrawLoseList.map((odds) => (
                            <div key={odds.id} className="flex items-center space-x-2 mb-2">
                                <input
                                    type="number"
                                    placeholder="승 (Home Win)"
                                    className="border p-2 w-1/3"
                                    value={odds.win}
                                    onChange={e => handleOddsChange(setWinDrawLoseList, odds.id, 'win', e.target.value)}
                                />
                                <input
                                    type="number"
                                    placeholder="무 (Draw)"
                                    className="border p-2 w-1/3"
                                    value={odds.draw}
                                    onChange={e => handleOddsChange(setWinDrawLoseList, odds.id, 'draw', e.target.value)}
                                />
                                <input
                                    type="number"
                                    placeholder="패 (Away Win)"
                                    className="border p-2 w-1/3"
                                    value={odds.lose}
                                    onChange={e => handleOddsChange(setWinDrawLoseList, odds.id, 'lose', e.target.value)}
                                />
                                <button 
                                    type="button" 
                                    className="ml-4 bg-red-500 text-white px-2 py-1 rounded" 
                                    onClick={() => removeOdds(setWinDrawLoseList, odds.id)}
                                >
                                    x
                                </button>
                            </div>
                        ))}
                    </div>
                    <div className="mb-4">
                        <div className="flex items-center mb-2">
                            <label className="block font-semibold mb-1">핸디캡 배당</label>
                            <button 
                                type="button" 
                                className="ml-4 bg-green-500 text-white px-2 py-1 rounded" 
                                onClick={() => addNewOdds(setHandicapList, { id: uuidv4(), value: '', win: '', lose: '' })}
                            >
                                +
                            </button>
                        </div>
                        {handicapList.map((odds) => (
                            <div key={odds.id} className="flex items-center space-x-2 mb-2">
                                <input
                                    type="number"
                                    placeholder="핸디캡"
                                    className="border p-2 w-1/3"
                                    value={odds.value}
                                    onChange={e => handleOddsChange(setHandicapList, odds.id, 'value', e.target.value)}
                                />
                                <input
                                    type="number"
                                    placeholder="핸디캡 승 (Home Win)"
                                    className="border p-2 w-1/3"
                                    value={odds.win}
                                    onChange={e => handleOddsChange(setHandicapList, odds.id, 'win', e.target.value)}
                                />
                                <input
                                    type="number"
                                    placeholder="핸디캡 패 (Away Win)"
                                    className="border p-2 w-1/3"
                                    value={odds.lose}
                                    onChange={e => handleOddsChange(setHandicapList, odds.id, 'lose', e.target.value)}
                                />
                                <button 
                                    type="button" 
                                    className="ml-4 bg-red-500 text-white px-2 py-1 rounded" 
                                    onClick={() => removeOdds(setHandicapList, odds.id)}
                                >
                                    x
                                </button>
                            </div>
                        ))}
                    </div>
                    <div className="mb-4">
                        <div className="flex items-center mb-2">
                            <label className="block font-semibold mb-1">언더오버 배당</label>
                            <button 
                                type="button" 
                                className="ml-4 bg-green-500 text-white px-2 py-1 rounded" 
                                onClick={() => addNewOdds(setOverUnderList, { id: uuidv4(), point: '', under: '', over: '' })}
                            >
                                +
                            </button>
                        </div>
                        {overUnderList.map((odds) => (
                            <div key={odds.id} className="flex items-center space-x-2 mb-2">
                                <input
                                    type="number"
                                    placeholder="기준 점수"
                                    className="border p-2 w-1/3"
                                    value={odds.point}
                                    onChange={e => handleOddsChange(setOverUnderList, odds.id, 'point', e.target.value)}
                                />
                                <input
                                    type="number"
                                    placeholder="언더 (Under)"
                                    className="border p-2 w-1/3"
                                    value={odds.under}
                                    onChange={e => handleOddsChange(setOverUnderList, odds.id, 'under', e.target.value)}
                                />
                                <input
                                    type="number"
                                    placeholder="오버 (Over)"
                                    className="border p-2 w-1/3"
                                    value={odds.over}
                                    onChange={e => handleOddsChange(setOverUnderList, odds.id, 'over', e.target.value)}
                                />
                                <button 
                                    type="button" 
                                    className="ml-4 bg-red-500 text-white px-2 py-1 rounded" 
                                    onClick={() => removeOdds(setOverUnderList, odds.id)}
                                >
                                    x
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex justify-end space-x-2">
                    <button
                        onClick={() => onClose()}
                        className="bg-gray-500 text-white px-4 py-2 rounded"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OddsSettingModal;
