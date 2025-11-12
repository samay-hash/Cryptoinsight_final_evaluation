import React, { useState, useEffect, createContext, useContext } from 'react';


const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);  
  const [loading, setLoading] = useState(true);  

 
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
      //jwt
        const payload = JSON.parse(atob(token.split('.')[1]));
        setUser({ id: payload.userId, email: payload.email });
      } catch (error) {
        console.error('Invalid token:', error);
        localStorage.removeItem('token');
      } 
      //token.split('.')[1] Token ko 3 parts me todta hai → 2nd part payload ko le raha hai
    } //Payload is information of user (id, email, role, expiry time)
    //Signature Token ki security, so that koi modify na kare
    //atob Encoded payload ko decode karta hai
    //JSON.parse(...)- Decode hua text ko JSON object me convert karta hai
    //setUser({ id, email })- User ki info State me store karta hai → taaki UI me use ho
    setLoading(false);
  }, []);

  // --- API Calls ---
  const API_BASE = 'http://localhost:5000/api/auth';

  const login = async (email, password) => {
    const response = await fetch(`${API_BASE}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Login failed');
    }
    setUser(data.user);
    localStorage.setItem('token', data.token);
    return data.user;
  };

  const signup = async (email, password) => {
    const response = await fetch(`${API_BASE}/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Signup failed');
    }
    setUser(data.user);
    localStorage.setItem('token', data.token);
    return data.user;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  // --- Mock API ---
  const mockApi = {
    watchlist: [
      { id: 'bitcoin', name: 'Bitcoin', symbol: 'BTC', price: 68000.50, change24h: 2.5 },
      { id: 'ethereum', name: 'Ethereum', symbol: 'ETH', price: 3400.75, change24h: -1.2 },
    ],

    getCoins: async () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve([
            { id: 'bitcoin', name: 'Bitcoin', symbol: 'BTC', price: 68000.50, change24h: 2.5, marketCap: 1300e9, volume: 40e9 },
            { id: 'ethereum', name: 'Ethereum', symbol: 'ETH', price: 3400.75, change24h: -1.2, marketCap: 400e9, volume: 20e9 },
            { id: 'solana', name: 'Solana', symbol: 'SOL', price: 170.20, change24h: 5.1, marketCap: 75e9, volume: 5e9 },
            { id: 'dogecoin', name: 'Dogecoin', symbol: 'DOGE', price: 0.16, change24h: 0.5, marketCap: 22e9, volume: 2e9 },
            { id: 'cardano', name: 'Cardano', symbol: 'ADA', price: 0.45, change24h: -2.0, marketCap: 16e9, volume: 1e9 },
            { id: 'avalanche', name: 'Avalanche', symbol: 'AVAX', price: 35.80, change24h: 1.8, marketCap: 14e9, volume: 1.2e9 },
          ]);
        }, 500);
      });
    },

    getWatchlist: async () => {
      return new Promise((resolve) => {
        setTimeout(() => {
       
          resolve([...mockApi.watchlist]);
        }, 300);
      });
    },

    addToWatchlist: async (coin) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (mockApi.watchlist.find(c => c.id === coin.id)) {
            reject(new Error('Already in watchlist'));
          } else {
            const newWatchlistItem = { ...coin };
            mockApi.watchlist.push(newWatchlistItem);
            resolve(newWatchlistItem);
          }
        }, 500);
      });
    },

    deleteFromWatchlist: async (coinId) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          mockApi.watchlist = mockApi.watchlist.filter(c => c.id !== coinId);
          resolve({ id: coinId });
        }, 500);
      });
    },
    
    getPortfolio: async () => {
       return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            totalValue: 12540.75,
            change24h: 120.50,
            assets: [
              { id: 'bitcoin', name: 'Bitcoin', symbol: 'BTC', amount: 0.15, value: 10200.07 },
              { id: 'ethereum', name: 'Ethereum', symbol: 'ETH', amount: 0.5, value: 1700.37 },
              { id: 'solana', name: 'Solana', symbol: 'SOL', amount: 3, value: 510.60 },
              { id: 'dogecoin', name: 'Dogecoin', symbol: 'DOGE', amount: 800, value: 128.00 },
            ]
          });
        }, 500);
      });
    },
    
  
    getChartData: async (coinId) => {
       return new Promise((resolve) => {
        setTimeout(() => {
          const data = [
            { name: '7d ago', price: Math.random() * 100 + 100 },
            { name: '6d ago', price: Math.random() * 100 + 110 },
            { name: '5d ago', price: Math.random() * 100 + 105 },
            { name: '4d ago', price: Math.random() * 100 + 120 },
            { name: '3d ago', price: Math.random() * 100 + 130 },
            { name: '2d ago', price: Math.random() * 100 + 125 },
            { name: 'Yesterday', price: Math.random() * 100 + 140 },
            { name: 'Today', price: Math.random() * 100 + 135 },
          ];
 
          const priceBase = coinId === 'bitcoin' ? 68000 : (coinId === 'ethereum' ? 3400 : 170);
          resolve(data.map(d => ({ ...d, price: d.price / 150 * priceBase })));
        }, 400);
       });
    }
  };
  
  const authApi = {
    login,
    signup,
    logout,
  };

  return (
    <AuthContext.Provider value={{ user, ...authApi, api: mockApi, isAuthenticated: !!user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};


const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };

