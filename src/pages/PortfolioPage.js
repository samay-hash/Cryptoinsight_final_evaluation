import React, { useState, useEffect } from 'react';
import { useAuth } from 'src/context/AuthContext';

// --- Page 4: Portfolio Page ---
function PortfolioPage() {
  const { api } = useAuth();
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        setLoading(true);
        const data = await api.getPortfolio();
        setPortfolio(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPortfolio();
  }, [api]);
  
  if (loading) return <div className="max-w-7xl mx-auto px-4 py-12">Loading portfolio...</div>;
  if (error) return <div className="max-w-7xl mx-auto px-4 py-12 text-red-500">{error}</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold mb-8">My Portfolio</h1>
      
      {/* Portfolio Summary */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-10">
        <h2 className="text-xl font-semibold text-gray-400 mb-2">Total Value</h2>
        <p className="text-5xl font-bold text-white mb-2">
          ${portfolio.totalValue.toLocaleString()}
        </p>
        <p className={`text-lg ${portfolio.change24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
          {portfolio.change24h >= 0 ? '+' : ''}${portfolio.change24h.toLocaleString()} (24h)
        </p>
      </div>

      {/* Assets List */}
      <h2 className="text-2xl font-bold mb-6">Your Assets</h2>
      <div className="overflow-x-auto bg-gray-900 border border-gray-800 rounded-xl">
        <table className="min-w-full divide-y divide-gray-800">
          <thead className="bg-gray-800">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Asset</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Amount</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Value</th>
            </tr>
          </thead>
          <tbody className="bg-gray-900 divide-y divide-gray-800">
            {portfolio.assets.map((asset) => (
              <tr key={asset.id} className="hover:bg-gray-800 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="text-sm font-medium text-white">{asset.name}</div>
                    <div className="text-sm text-gray-500 ml-2">{asset.symbol.toUpperCase()}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                  {asset.amount.toLocaleString()} {asset.symbol.toUpperCase()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                  ${asset.value.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-sm text-gray-500 mt-4">
        * This is a mock portfolio. In a real app, you would be able_
        to add/edit transactions.
      </p>
    </div>
  );
}

export default PortfolioPage;
