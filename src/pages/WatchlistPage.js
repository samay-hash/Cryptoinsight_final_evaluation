import React, { useState, useEffect } from 'react';
import { Trash2 } from 'lucide-react';
import { useAuth } from 'src/context/AuthContext';

// --- Page 3: Watchlist Page ---
function WatchlistPage() {
  const { api } = useAuth();
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchWatchlist();
  }, [api]);

  const fetchWatchlist = async () => {
    try {
      setLoading(true);
      const data = await api.getWatchlist();
      setWatchlist(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteFromWatchlist = async (coinId) => {
    try {
      await api.deleteFromWatchlist(coinId);
      // Refetch or filter locally
      setWatchlist(prev => prev.filter(coin => coin.id !== coinId));
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  if (loading) return <div className="max-w-7xl mx-auto px-4 py-12">Loading watchlist...</div>;
  if (error) return <div className="max-w-7xl mx-auto px-4 py-12 text-red-500">{error}</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold mb-8">My Watchlist</h1>
      
      {watchlist.length === 0 ? (
        <p className="text-gray-400">Your watchlist is empty. Add coins from the Dashboard.</p>
      ) : (
        <div className="overflow-x-auto bg-gray-900 border border-gray-800 rounded-xl">
          <table className="min-w-full divide-y divide-gray-800">
            <thead className="bg-gray-800">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Name</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Price</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">24h %</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Remove</th>
              </tr>
            </thead>
            <tbody className="bg-gray-900 divide-y divide-gray-800">
              {watchlist.map((coin) => (
                <tr key={coin.id} className="hover:bg-gray-800 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="text-sm font-medium text-white">{coin.name}</div>
                      <div className="text-sm text-gray-500 ml-2">{coin.symbol.toUpperCase()}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                    ${coin.price.toLocaleString()}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${coin.change24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {coin.change24h.toFixed(1)}%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleDeleteFromWatchlist(coin.id)}
                      className="text-red-400 hover:text-red-300 p-2 rounded-full hover:bg-gray-700 transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default WatchlistPage;
