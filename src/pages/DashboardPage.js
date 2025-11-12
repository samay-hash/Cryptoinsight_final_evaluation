import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Plus, Search, ChevronDown, ChevronUp } from 'lucide-react';
import { useAuth } from 'src/context/AuthContext';

// --- Page 2: Dashboard Page ---
function DashboardPage() {
  const { api } = useAuth();
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'marketCap', direction: 'desc' });
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [loadingChart, setLoadingChart] = useState(false);

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        setLoading(true);
        const data = await api.getCoins();
        setCoins(data);
        if(data.length > 0) {
          handleRowClick(data[0]);  
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCoins();
  }, [api]);
  
  const handleRowClick = async (coin) => {
    setSelectedCoin(coin);
    setLoadingChart(true);
    const data = await api.getChartData(coin.id);
    setChartData(data);
    setLoadingChart(false);
  }

  const handleAddToWatchlist = async (e, coin) => {
    e.stopPropagation();  
    try {
      await api.addToWatchlist(coin);
      alert(`${coin.name} added to watchlist!`);  
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  const filteredCoins = coins.filter(coin =>
    coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedCoins = [...filteredCoins].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const SortIcon = ({ columnKey }) => {
    if (sortConfig.key !== columnKey) {
      return <ChevronDown className="w-4 h-4 text-gray-600 inline-block ml-1" />;
    }
    return sortConfig.direction === 'asc' ? (
      <ChevronUp className="w-4 h-4 inline-block ml-1" />
    ) : (
      <ChevronDown className="w-4 h-4 inline-block ml-1" />
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold mb-8">Crypto Dashboard</h1>
      
      {/* Chart Section */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-10">
        {selectedCoin ? (
          <>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              {selectedCoin.name} ({selectedCoin.symbol.toUpperCase()})
            </h2>
            <div style={{ width: '100%', height: 300 }}>
              {loadingChart ? (
                 <div className="flex justify-center items-center h-full">
                  <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-green-400"></div>
                </div>
              ) : (
                <ResponsiveContainer>
                  <AreaChart data={chartData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} />
                    <YAxis 
                      stroke="#9ca3af" 
                      fontSize={12} 
                      domain={['auto', 'auto']}
                      tickFormatter={(value) => `$${value.toLocaleString()}`}
                    />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px' }}
                      labelStyle={{ color: '#f3f4f6' }}
                      itemStyle={{ color: '#10b981' }}
                      formatter={(value) => [`$${value.toLocaleString()}`, 'Price']}
                    />
                    <Area type="monotone" dataKey="price" stroke="#10b981" fillOpacity={1} fill="url(#colorPrice)" />
                  </AreaChart>
                </ResponsiveContainer>
              )}
            </div>
          </>
        ) : (
          <div className="h-[300px] flex items-center justify-center text-gray-500">
            Select a coin to view its chart
          </div>
        )}
      </div>

      {/* Search Bar */}
      <div className="mb-6 relative">
        <input
          type="text"
          placeholder="Search for a coin (e.g. Bitcoin)"
          className="w-full bg-gray-900 border border-gray-800 rounded-lg py-3 px-4 pl-10 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Search className="w-5 h-5 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
      </div>

      {/* Coins Table */}
      {loading && <p>Loading coins...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && (
        <div className="overflow-x-auto bg-gray-900 border border-gray-800 rounded-xl">
          <table className="min-w-full divide-y divide-gray-800">
            <thead className="bg-gray-800">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  <button onClick={() => requestSort('name')} className="hover:text-white">
                    Name <SortIcon columnKey="name" />
                  </button>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  <button onClick={() => requestSort('price')} className="hover:text-white">
                    Price <SortIcon columnKey="price" />
                  </button>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  <button onClick={() => requestSort('change24h')} className="hover:text-white">
                    24h % <SortIcon columnKey="change24h" />
                  </button>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  <button onClick={() => requestSort('marketCap')} className="hover:text-white">
                    Market Cap <SortIcon columnKey="marketCap" />
                  </button>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Watchlist
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray-900 divide-y divide-gray-800">
              {sortedCoins.map((coin) => (
                <tr key={coin.id} onClick={() => handleRowClick(coin)} className="hover:bg-gray-800 cursor-pointer transition-colors">
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
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    ${coin.marketCap.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={(e) => handleAddToWatchlist(e, coin)}
                      className="text-green-400 hover:text-green-300 p-2 rounded-full hover:bg-gray-700 transition-colors"
                    >
                      <Plus className="w-5 h-5" />
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

export default DashboardPage;
