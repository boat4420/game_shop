'use client';
import { useState, useEffect, useCallback } from 'react';
import GameForm from '@/components/GameForm';
import Link from 'next/link';

export default function AdminPage() {
  const [games, setGames] = useState([]);
  const [editingGame, setEditingGame] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchGames = useCallback(async () => {
    try {
      // Check auth first
      const meRes = await fetch('/api/auth/me');
      const meData = await meRes.json();
      
      if (!meData.user || meData.user.role !== 'admin') {
        window.location.href = '/';
        return;
      }

      const res = await fetch('/api/games');
      const data = await res.json();
      if (Array.isArray(data)) {
        setGames(data);
        setError(null);
      } else {
        setError(data.error || 'Failed to fetch games');
        setGames([]);
      }
    } catch (err) {
      setError('Connection error: Make sure MySQL is running');
      setGames([]);
    }
  }, []);

  useEffect(() => {
    fetchGames();
  }, [fetchGames]);

  const handleAddGame = async (gameData) => {
    try {
      const res = await fetch('/api/games', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(gameData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to add game');
      fetchGames();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleUpdateGame = async (gameData) => {
    try {
      const res = await fetch(`/api/games/${editingGame.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(gameData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to update game');
      setEditingGame(null);
      fetchGames();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteGame = async (id) => {
    if (confirm('Are you sure you want to delete this game?')) {
      await fetch(`/api/games/${id}`, { method: 'DELETE' });
      fetchGames();
    }
  };

  return (
    <main className="min-h-screen bg-[#1A1D24] text-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-10 pb-6 border-b border-gray-800">
          <div>
            <h1 className="text-3xl font-bold text-amber-500 tracking-tight">🎮 Game Shop</h1>
            <p className="text-gray-400 text-sm">Inventory & Catalog Management</p>
          </div>
          <Link href="/" className="border border-amber-500/50 text-amber-500 px-6 py-2 rounded-full hover:bg-amber-500 hover:text-black transition-all duration-300 font-semibold">
            View Live Shop
          </Link>
        </div>
        
        {error && (
          <div className="bg-red-900/50 border border-red-500 text-red-200 px-4 py-3 rounded-lg mb-6">
            <strong className="font-bold">Database Error: </strong>
            <span>{error}</span>
          </div>
        )}

        <GameForm 
          key={editingGame ? editingGame.id : 'new'}
          game={editingGame} 
          onSubmit={editingGame ? handleUpdateGame : handleAddGame}
          onCancel={() => setEditingGame(null)}
        />

        <div className="bg-[#23272F] rounded-xl shadow-2xl overflow-hidden border border-gray-800">
          <div className="p-4 bg-[#2A2E37] border-b border-gray-800">
            <h3 className="font-bold text-gray-300">Existing Games Inventory</h3>
          </div>
          <table className="w-full text-left">
            <thead>
              <tr className="text-gray-400 text-sm uppercase tracking-wider">
                <th className="p-4 font-semibold">Game</th>
                <th className="p-4 font-semibold">Category</th>
                <th className="p-4 font-semibold text-right">Price</th>
                <th className="p-4 font-semibold text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {games.length === 0 ? (
                <tr>
                  <td colSpan="4" className="p-10 text-center text-gray-500 italic">No games found in the database.</td>
                </tr>
              ) : (
                games.map((game) => (
                  <tr key={game.id} className="hover:bg-white/5 transition-colors">
                    <td className="p-4 flex items-center gap-3">
                      <img src={game.image_url || 'https://via.placeholder.com/50'} className="w-12 h-12 rounded object-cover border border-gray-700" alt="" />
                      <div>
                        <div className="font-bold text-gray-100">{game.name}</div>
                        {game.is_new ? <span className="text-[10px] bg-green-900 text-green-300 px-1 rounded uppercase">New</span> : null}
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded-full">{game.category}</span>
                    </td>
                    <td className="p-4 text-right">
                      <div className="text-amber-500 font-bold">${parseFloat(game.price).toFixed(2)}</div>
                      {game.original_price > game.price && (
                        <div className="text-xs text-gray-500 line-through">${parseFloat(game.original_price).toFixed(2)}</div>
                      )}
                    </td>
                    <td className="p-4">
                      <div className="flex justify-center gap-2">
                        <button onClick={() => setEditingGame(game)} className="bg-amber-500 text-black px-4 py-1.5 rounded-lg text-sm font-bold hover:bg-amber-600 transition">
                          Edit
                        </button>
                        <button onClick={() => handleDeleteGame(game.id)} className="bg-red-600 text-white px-4 py-1.5 rounded-lg text-sm font-bold hover:bg-red-700 transition">
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
