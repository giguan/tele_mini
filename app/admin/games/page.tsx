"use client"

import fetcher from "@/utils/fetcher";
import { useState } from "react";
import useSWR from "swr";
import Image from 'next/image';
import OddsSettingModal from "@/components/oddsSettingModal";

interface Game {
  id: number;
  name: string;
  date: string;
  description: string;
  price: string;
  discount: string;
}

const Games = () => {

  const { data: gameData, error, mutate } = useSWR(`/api/games`, fetcher);

  if(gameData) {
    console.log("@@@@@@@@@@",gameData)
  }

  const [games, setGames] = useState<Game[]>([
    { id: 1, name: 'Education Dashboard', date: '2024-08-01', description: 'Html templates', price: '$149', discount: 'No' },
    { id: 2, name: 'React UI Kit', date: '2024-08-02', description: 'Html templates', price: '$129', discount: '10%' },
  ]);

  const [newGame, setNewGame] = useState({ name: '', date: '', description: '', price: '', discount: '' });
  const [editingGame, setEditingGame] = useState<Game | null>(null);



  const [selectedGame, setSelectedGame] = useState<any>(null);
  const [showOddsSettingModal, setShowOddsSettingModal] = useState(false);

  // const addGame = () => {
  //   setGames([...games, { id: Date.now(), ...newGame }]);
  //   setNewGame({ name: '', date: '', description: '', price: '', discount: '' });
  //   setShowModal(false);
  // };

  // const updateGame = () => {
  //   setGames(games.map(game => (game.id === editingGame!.id ? editingGame! : game)));
  //   setEditingGame(null);
  //   setShowModal(false);
  // };

  const handleEditClick = (game: any) => {
    setSelectedGame(game);
    setShowOddsSettingModal(true);
  };

  const handleAddClick = () => {
    // setEditingGame(null);
    setSelectedGame(null);

    setShowOddsSettingModal(true);
  };

  return (
    <div className="text-gray-800">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">모든 경기</h1>
        <button onClick={handleAddClick} className="bg-blue-500 text-white px-4 py-2 rounded">Add new product</button>
      </div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search for products"
          className="border p-2 w-full"
        />
      </div>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 text-center font-bold">리그</th>
            <th className="py-2 text-center font-bold">일자</th>
            <th className="py-2 text-center font-bold">홈</th>
            <th className="py-2 text-center font-bold">원정</th>
            <th className="py-2 text-center font-bold">배당여부</th>
            <th className="py-2 text-center font-bold">배당</th>
          </tr>
        </thead>
        <tbody>
          {gameData && gameData.map((game: any) => (
            <tr key={game.id} className="border-t cursor-pointer" onClick={() => handleEditClick(game)}>
            <td className="py-2 px-4 text-center">{game.seasonName.split(' ')[0]}</td>
            <td className="py-2 px-4 text-center">
              <div>{game.gameDate.split('T')[0]}</div>
              <div>{game.gameDate.split('T')[1].substring(0,5)}</div>
            </td>
            <td className="py-2 px-4 text-center">
              <div className="flex justify-center">
                <Image
                  src={"/images/logo" + game.homeLogoPath}
                  alt={game.homeTeamName + " logo"}
                  width={20}
                  height={20}
                />  
              <span className="ml-2">{game.awayTeamName}</span>
            </div>

            </td>
            <td className="py-2 px-4 text-center">
              <div className="flex justify-center">
                <Image
                    src={"/images/logo" + game.awayLogoPath}
                    alt={game.awayTeamName + " logo"}
                    width={20}
                    height={20}
                  />  
                <span className="ml-2">{game.awayTeamName}</span>
              </div>
            </td>
            <td>
            <div className="flex flex-col">
              {game.winDrawLose && (
                <div className="bg-gray-200 rounded px-1 py-0.5 text-xs mr-1 mb-1">
                  승무패
                </div>
              )}
              {game.handicap && (
                <div className="bg-gray-200 rounded px-1 py-0.5 text-xs mr-1 mb-1">
                  핸디캡
                </div>
              )}
              {game.overUnder && (
                <div className="bg-gray-200 rounded px-1 py-0.5 text-xs mr-1 mb-1">
                  언/오버
                </div>
              )}
            </div>

            </td>
            <td className="py-2 px-4 text-center flex justify-center space-x-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleEditClick(game);
                }}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Update
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setGames(games.filter(g => g.id !== game.id));
                }}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
            </td>
          </tr>
          ))}
        </tbody>
      </table>

      {showOddsSettingModal && 
        <OddsSettingModal
          game={selectedGame}
          onClose={setShowOddsSettingModal}
        />
      }
      {/* {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-75">
          <div className="bg-white p-6 rounded shadow-md w-1/3">
            <h2 className="text-xl font-bold mb-4">{editingGame ? 'Edit Game' : 'Add New Game'}</h2>
            <input
              type="text"
              value={editingGame ? editingGame.name : newGame.name}
              onChange={e => editingGame ? setEditingGame({ ...editingGame, name: e.target.value }) : setNewGame({ ...newGame, name: e.target.value })}
              placeholder="Game Name"
              className="border p-2 mb-2 w-full"
            />
            <input
              type="date"
              value={editingGame ? editingGame.date : newGame.date}
              onChange={e => editingGame ? setEditingGame({ ...editingGame, date: e.target.value }) : setNewGame({ ...newGame, date: e.target.value })}
              className="border p-2 mb-2 w-full"
            />
            <input
              type="text"
              value={editingGame ? editingGame.description : newGame.description}
              onChange={e => editingGame ? setEditingGame({ ...editingGame, description: e.target.value }) : setNewGame({ ...newGame, description: e.target.value })}
              placeholder="Description"
              className="border p-2 mb-2 w-full"
            />
            <input
              type="text"
              value={editingGame ? editingGame.price : newGame.price}
              onChange={e => editingGame ? setEditingGame({ ...editingGame, price: e.target.value }) : setNewGame({ ...newGame, price: e.target.value })}
              placeholder="Price"
              className="border p-2 mb-2 w-full"
            />
            <input
              type="text"
              value={editingGame ? editingGame.discount : newGame.discount}
              onChange={e => editingGame ? setEditingGame({ ...editingGame, discount: e.target.value }) : setNewGame({ ...newGame, discount: e.target.value })}
              placeholder="Discount"
              className="border p-2 mb-2 w-full"
            />
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">배당 설정</h3>
              <div className="mb-2">
                <label className="block font-semibold mb-1">승무패 배당</label>
                <input
                  type="number"
                  placeholder="승 (Home Win) 배당"
                  className="border p-2 mb-2 w-full"
                  // 승무패 배당 값을 설정하는 state 업데이트 로직 추가
                />
                <input
                  type="number"
                  placeholder="무 (Draw) 배당"
                  className="border p-2 mb-2 w-full"
                  // 무 배당 값을 설정하는 state 업데이트 로직 추가
                />
                <input
                  type="number"
                  placeholder="패 (Away Win) 배당"
                  className="border p-2 mb-2 w-full"
                  // 패 배당 값을 설정하는 state 업데이트 로직 추가
                />
              </div>
              <div className="mb-2">
                <label className="block font-semibold mb-1">핸디캡 배당</label>
                <input
                  type="number"
                  placeholder="핸디캡 (Handicap)"
                  className="border p-2 mb-2 w-full"
                  // 핸디캡 배당 값을 설정하는 state 업데이트 로직 추가
                />
                <input
                  type="number"
                  placeholder="핸디캡 승 (Home Win) 배당"
                  className="border p-2 mb-2 w-full"
                  // 핸디캡 승 배당 값을 설정하는 state 업데이트 로직 추가
                />
                <input
                  type="number"
                  placeholder="핸디캡 패 (Away Win) 배당"
                  className="border p-2 mb-2 w-full"
                  // 핸디캡 패 배당 값을 설정하는 state 업데이트 로직 추가
                />
              </div>
              <div className="mb-2">
                <label className="block font-semibold mb-1">언더오버 배당</label>
                <input
                  type="number"
                  placeholder="기준 점수 (Reference Point)"
                  className="border p-2 mb-2 w-full"
                  // 언더오버 기준 점수를 설정하는 state 업데이트 로직 추가
                />
                <input
                  type="number"
                  placeholder="언더 (Under) 배당"
                  className="border p-2 mb-2 w-full"
                  // 언더 배당 값을 설정하는 state 업데이트 로직 추가
                />
                <input
                  type="number"
                  placeholder="오버 (Over) 배당"
                  className="border p-2 mb-2 w-full"
                  // 오버 배당 값을 설정하는 state 업데이트 로직 추가
                />
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={editingGame ? updateGame : addGame}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                {editingGame ? 'Update Game' : 'Add Game'}
              </button>
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default Games;
