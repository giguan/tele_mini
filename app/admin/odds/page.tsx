"use client"

import { useState } from "react";

interface Game {
  id: number;
  name: string;
  date: string;
  description: string;
  price: string;
  discount: string;
}

const Odds = () => {
  const [games, setGames] = useState<Game[]>([
    { id: 1, name: 'Education Dashboard', date: '2024-08-01', description: 'Html templates', price: '$149', discount: 'No' },
    { id: 2, name: 'React UI Kit', date: '2024-08-02', description: 'Html templates', price: '$129', discount: '10%' },
  ]);

  const [newGame, setNewGame] = useState({ name: '', date: '', description: '', price: '', discount: '' });
  const [editingGame, setEditingGame] = useState<Game | null>(null);
  const [showModal, setShowModal] = useState(false);

  const addGame = () => {
    setGames([...games, { id: Date.now(), ...newGame }]);
    setNewGame({ name: '', date: '', description: '', price: '', discount: '' });
    setShowModal(false);
  };

  const updateGame = () => {
    setGames(games.map(game => (game.id === editingGame!.id ? editingGame! : game)));
    setEditingGame(null);
    setShowModal(false);
  };

  const handleEditClick = (game: Game) => {
    setEditingGame(game);
    setShowModal(true);
  };

  const handleAddClick = () => {
    setEditingGame(null);
    setShowModal(true);
  };

  return (
    <div className="text-gray-800">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">All products</h1>
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
            <th className="py-2 text-center">PRODUCT NAME</th>
            <th className="py-2 text-center">DATE</th>
            <th className="py-2 text-center">DESCRIPTION</th>
            <th className="py-2 text-center">PRICE</th>
            <th className="py-2 text-center">DISCOUNT</th>
            <th className="py-2 text-center">ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {games.map(game => (
            <tr key={game.id} className="border-t" onClick={() => handleEditClick(game)}>
              <td className="py-2 px-4 text-center">{game.name}</td>
              <td className="py-2 px-4 text-center">{game.date}</td>
              <td className="py-2 px-4 text-center">{game.description}</td>
              <td className="py-2 px-4 text-center">{game.price}</td>
              <td className="py-2 px-4 text-center">{game.discount}</td>
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
      {showModal && (
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
      )}
    </div>
  );
};

export default Odds;
