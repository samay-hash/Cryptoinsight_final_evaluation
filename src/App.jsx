import React, { useState, useEffect, createContext, useContext } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import {
  DollarSign,
  BarChart2,
  Eye,
  User,
  LogIn,
  LogOut,
  ArrowRight,
  Trash2,
  Plus,
  Search,
  ChevronDown,
  ChevronUp,
  Menu,
  X,
} from "lucide-react";
import ENDPOINT from "./constants";
// --- Auth Context ---

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  const mockApi = {
    users: [{ id: "1", email: "user@example.com", password: "password123" }],
    watchlist: [
      {
        id: "bitcoin",
        name: "Bitcoin",
        symbol: "BTC",
        price: 68000.5,
        change24h: 2.5,
      },
      {
        id: "ethereum",
        name: "Ethereum",
        symbol: "ETH",
        price: 3400.75,
        change24h: -1.2,
      },
    ],

    login: async (email, password) => {
      const url = `${ENDPOINT}/api/auth/login`;
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }
      setUser(data.user);
      localStorage.setItem("token", data.token);
      return data.user;
    },

    signup: async (email, password) => {
      const url = `${ENDPOINT}/api/auth/signup`;
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Signup failed");
      }
      setUser(data.user);
      localStorage.setItem("token", data.token);
      return data.user;
    },

    logout: () => {
      setUser(null);
    },

    getCoins: async () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve([
            {
              id: "bitcoin",
              name: "Bitcoin",
              symbol: "BTC",
              price: 107376.5,
              change24h: 2.5,
              marketCap: 1300e9,
              volume: 40e9,
            },
            {
              id: "ethereum",
              name: "Ethereum",
              symbol: "ETH",
              price: 3700.75,
              change24h: -1.2,
              marketCap: 400e9,
              volume: 20e9,
            },
            {
              id: "solana",
              name: "Solana",
              symbol: "SOL",
              price: 18.2,
              change24h: 5.1,
              marketCap: 75e9,
              volume: 5e9,
            },
            {
              id: "dogecoin",
              name: "Dogecoin",
              symbol: "DOGE",
              price: 0.16,
              change24h: 0.5,
              marketCap: 22e9,
              volume: 2e9,
            },
            {
              id: "cardano",
              name: "Cardano",
              symbol: "ADA",
              price: 0.45,
              change24h: -2.0,
              marketCap: 16e9,
              volume: 1e9,
            },
            {
              id: "avalanche",
              name: "Avalanche",
              symbol: "AVAX",
              price: 35.8,
              change24h: 1.8,
              marketCap: 14e9,
              volume: 1.2e9,
            },
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
          if (mockApi.watchlist.find((c) => c.id === coin.id)) {
            reject(new Error("Already in watchlist"));
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
          mockApi.watchlist = mockApi.watchlist.filter((c) => c.id !== coinId);
          resolve({ id: coinId });
        }, 500);
      });
    },

    getPortfolio: async () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            totalValue: 12540.75,
            change24h: 120.5,
            assets: [
              {
                id: "bitcoin",
                name: "Bitcoin",
                symbol: "BTC",
                amount: 0.15,
                value: 10200.07,
              },
              {
                id: "ethereum",
                name: "Ethereum",
                symbol: "ETH",
                amount: 0.5,
                value: 1700.37,
              },
              {
                id: "solana",
                name: "Solana",
                symbol: "SOL",
                amount: 3,
                value: 510.6,
              },
              {
                id: "dogecoin",
                name: "Dogecoin",
                symbol: "DOGE",
                amount: 800,
                value: 128.0,
              },
            ],
          });
        }, 500);
      });
    },

    // Mock data for the chart
    getChartData: async (coinId) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          const data = [
            { name: "7d ago", price: Math.random() * 100 + 100 },
            { name: "6d ago", price: Math.random() * 100 + 110 },
            { name: "5d ago", price: Math.random() * 100 + 105 },
            { name: "4d ago", price: Math.random() * 100 + 120 },
            { name: "3d ago", price: Math.random() * 100 + 130 },
            { name: "2d ago", price: Math.random() * 100 + 125 },
            { name: "Yesterday", price: Math.random() * 100 + 140 },
            { name: "Today", price: Math.random() * 100 + 135 },
          ];

          const priceBase =
            coinId === "bitcoin" ? 68000 : coinId === "ethereum" ? 3400 : 170;
          resolve(
            data.map((d) => ({ ...d, price: (d.price / 150) * priceBase }))
          );
        }, 400);
      });
    },
  };

  const authApi = {
    login: mockApi.login,
    signup: mockApi.signup,
    logout: mockApi.logout,
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        ...authApi,
        api: mockApi,
        isAuthenticated: !!user,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

// --- App ---

export default function App() {
  const [page, setPage] = useState("home");

  const navigate = (targetPage) => {
    setPage(targetPage);
    window.scrollTo(0, 0);
  };

  return (
    <AuthProvider>
      <div className="min-h-screen bg-black text-white font-sans">
        <Navbar navigate={navigate} />
        <main className="pt-20">
          {/* This switch statement is our "Router" */}
          {(() => {
            switch (page) {
              case "home":
                return <HomePage navigate={navigate} />;
              case "dashboard":
                return (
                  <ProtectedRoute page="dashboard">
                    <DashboardPage />
                  </ProtectedRoute>
                );
              case "watchlist":
                return (
                  <ProtectedRoute page="watchlist">
                    <WatchlistPage />
                  </ProtectedRoute>
                );
              case "portfolio":
                return (
                  <ProtectedRoute page="portfolio">
                    <PortfolioPage />
                  </ProtectedRoute>
                );
              case "login":
                return <LoginPage navigate={navigate} />;
              case "signup":
                return <SignupPage navigate={navigate} />;
              default:
                return <HomePage navigate={navigate} />;
            }
          })()}
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
}

// --- Navigation ---
function Navbar({ navigate }) {
  const { isAuthenticated, logout, user } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNav = (page) => {
    navigate(page);
    setIsMobileMenuOpen(false);
  };

  const NavLinks = ({ isMobile }) => (
    <>
      <button
        onClick={() => handleNav("home")}
        className={`px-3 py-2 rounded-md text-sm font-medium ${
          isMobile ? "block" : ""
        } hover:bg-gray-800`}
      >
        Home
      </button>
      {isAuthenticated && (
        <>
          <button
            onClick={() => handleNav("dashboard")}
            className={`px-3 py-2 rounded-md text-sm font-medium ${
              isMobile ? "block" : ""
            } hover:bg-gray-800`}
          >
            Dashboard
          </button>
          <button
            onClick={() => handleNav("watchlist")}
            className={`px-3 py-2 rounded-md text-sm font-medium ${
              isMobile ? "block" : ""
            } hover:bg-gray-800`}
          >
            Watchlist
          </button>
          <button
            onClick={() => handleNav("portfolio")}
            className={`px-3 py-2 rounded-md text-sm font-medium ${
              isMobile ? "block" : ""
            } hover:bg-gray-800`}
          >
            Portfolio
          </button>
        </>
      )}
    </>
  );

  return (
    <nav className="fixed top-0 left-0 right-0 bg-black bg-opacity-80 backdrop-blur-md border-b border-gray-900 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <button
              onClick={() => handleNav("home")}
              className="flex items-center space-x-2"
            >
              <DollarSign className="h-8 w-8 text-green-400" />
              <span className="text-2xl font-bold text-white">
                Crypto<span className="text-green-400">Insight</span>
              </span>
            </button>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <NavLinks isMobile={false} />
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-3">
            {isAuthenticated ? (
              <>
                <span className="text-gray-400 text-sm">{user.email}</span>
                <button
                  onClick={logout}
                  className="flex items-center bg-gray-800 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => handleNav("login")}
                  className="bg-gray-800 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors"
                >
                  Sign In
                </button>
                <button
                  onClick={() => handleNav("signup")}
                  className="bg-green-500 text-black px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-400 transition-colors"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <NavLinks isMobile={true} />
          </div>
          <div className="pt-4 pb-3 border-t border-gray-700">
            {isAuthenticated ? (
              <div className="flex flex-col items-start px-5 space-y-3">
                <span className="text-gray-400 text-base">{user.email}</span>
                <button
                  onClick={() => {
                    logout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full text-left flex items-center bg-gray-800 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex flex-col px-4 space-y-2">
                <button
                  onClick={() => handleNav("login")}
                  className="w-full text-left bg-gray-800 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors"
                >
                  Sign In
                </button>
                <button
                  onClick={() => handleNav("signup")}
                  className="w-full text-left bg-green-500 text-black px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-400 transition-colors"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

// --- Protected Route ---
function ProtectedRoute({ children, page }) {
  const { isAuthenticated, loading } = useAuth();

  // Need to use state for navigation to avoid warnings
  const [redirect, setRedirect] = useState(false);
  const [targetPage, setTargetPage] = useState("");

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-green-400"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    // This is a bit of a hack to navigate from within a render
    // In a real app, React Router's <Navigate> component handles this cleanly
    return (
      <LoginPage message={`You must be logged in to view the ${page} page.`} />
    );
  }

  return children;
}

// --- Page 1: Home Page (Scrolling) ---
function HomePage({ navigate }) {
  return (
    <div className="bg-black text-white">
      {/* Section 1: Hero */}
      <section className="min-h-screen flex items-center justify-center text-center px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-gray-900 [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black"></div>

        <div className="relative z-10">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6">
            Welcome to <span className="text-green-400">CryptoInsight</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Your unified dashboard for real-time price analysis, portfolio
            tracking, and market trends.
          </p>
          <div className="space-x-4">
            <button
              onClick={() => navigate("dashboard")}
              className="bg-green-500 text-black font-bold py-3 px-8 rounded-lg text-lg hover:bg-green-400 transition-transform hover:scale-105"
            >
              Get Started
            </button>
            <button
              onClick={() =>
                document
                  .getElementById("features")
                  .scrollIntoView({ behavior: "smooth" })
              }
              className="bg-gray-800 text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-gray-700 transition-transform hover:scale-105"
            >
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Section 2: Features */}
      <section id="features" className="py-24 bg-gray-950 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">
            Why Choose Us?
          </h2>
          <p className="text-center text-yellow-400 text-lg mb-16">
            All the tools you need. None of the clutter.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<BarChart2 className="w-10 h-10 text-green-400" />}
              title="Real-Time Data"
              description="Live price tracking from top exchanges. Never miss a market move."
            />
            <FeatureCard
              icon={<Eye className="w-10 h-10 text-green-400" />}
              title="Personal Watchlist"
              description="Curate your own list of coins to follow. Add and remove with a single click."
            />
            <FeatureCard
              icon={<User className="w-10 h-10 text-green-400" />}
              title="Portfolio Manager"
              description="Track your assets, view your performance, and manage your crypto wealth."
            />
          </div>
        </div>
      </section>

      {/* Section 3: Call to Action */}
      <section className="py-24 bg-black px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Dive In?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Sign up for a free account today and take control of your crypto
            journey.
          </p>
          <button
            onClick={() => navigate("signup")}
            className="bg-yellow-400 text-black font-bold py-3 px-10 rounded-lg text-lg hover:bg-yellow-300 transition-transform hover:scale-105 flex items-center justify-center mx-auto"
          >
            Create Account Now <ArrowRight className="w-5 h-5 ml-2" />
          </button>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-gray-900 p-8 rounded-xl border border-gray-800 transform hover:scale-105 transition-transform duration-300">
      <div className="mb-4">{icon}</div>
      <h3 className="text-2xl font-bold mb-3">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
}

// --- Page 2: Dashboard Page ---
function DashboardPage() {
  const { api } = useAuth();
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: "marketCap",
    direction: "desc",
  });
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [loadingChart, setLoadingChart] = useState(false);

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        setLoading(true);
        const data = await api.getCoins();
        setCoins(data);
        if (data.length > 0) {
          handleRowClick(data[0]); // Load chart for the first coin
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
  };

  const handleAddToWatchlist = async (e, coin) => {
    e.stopPropagation();
    try {
      await api.addToWatchlist(coin);
      alert(`${coin.name} added to watchlist!`);
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  const filteredCoins = coins.filter(
    (coin) =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedCoins = [...filteredCoins].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? 1 : -1;
    }
    return 0;
  });

  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const SortIcon = ({ columnKey }) => {
    if (sortConfig.key !== columnKey) {
      return (
        <ChevronDown className="w-4 h-4 text-gray-600 inline-block ml-1" />
      );
    }
    return sortConfig.direction === "asc" ? (
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
            <div style={{ width: "100%", height: 300 }}>
              {loadingChart ? (
                <div className="flex justify-center items-center h-full">
                  <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-green-400"></div>
                </div>
              ) : (
                <ResponsiveContainer>
                  <AreaChart
                    data={chartData}
                    margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient
                        id="colorPrice"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#10b981"
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="95%"
                          stopColor="#10b981"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} />
                    <YAxis
                      stroke="#9ca3af"
                      fontSize={12}
                      domain={["auto", "auto"]}
                      tickFormatter={(value) => `$${value.toLocaleString()}`}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1f2937",
                        border: "none",
                        borderRadius: "8px",
                      }}
                      labelStyle={{ color: "#f3f4f6" }}
                      itemStyle={{ color: "#10b981" }}
                      formatter={(value) => [
                        `$${value.toLocaleString()}`,
                        "Price",
                      ]}
                    />
                    <Area
                      type="monotone"
                      dataKey="price"
                      stroke="#10b981"
                      fillOpacity={1}
                      fill="url(#colorPrice)"
                    />
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
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                >
                  <button
                    onClick={() => requestSort("name")}
                    className="hover:text-white"
                  >
                    Name <SortIcon columnKey="name" />
                  </button>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                >
                  <button
                    onClick={() => requestSort("price")}
                    className="hover:text-white"
                  >
                    Price <SortIcon columnKey="price" />
                  </button>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                >
                  <button
                    onClick={() => requestSort("change24h")}
                    className="hover:text-white"
                  >
                    24h % <SortIcon columnKey="change24h" />
                  </button>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                >
                  <button
                    onClick={() => requestSort("marketCap")}
                    className="hover:text-white"
                  >
                    Market Cap <SortIcon columnKey="marketCap" />
                  </button>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                >
                  Watchlist
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray-900 divide-y divide-gray-800">
              {sortedCoins.map((coin) => (
                <tr
                  key={coin.id}
                  onClick={() => handleRowClick(coin)}
                  className="hover:bg-gray-800 cursor-pointer transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="text-sm font-medium text-white">
                        {coin.name}
                      </div>
                      <div className="text-sm text-gray-500 ml-2">
                        {coin.symbol.toUpperCase()}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                    ${coin.price.toLocaleString()}
                  </td>
                  <td
                    className={`px-6 py-4 whitespace-nowrap text-sm ${
                      coin.change24h >= 0 ? "text-green-400" : "text-red-400"
                    }`}
                  >
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
      setWatchlist((prev) => prev.filter((coin) => coin.id !== coinId));
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  if (loading)
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">Loading watchlist...</div>
    );
  if (error)
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-red-500">{error}</div>
    );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold mb-8">My Watchlist</h1>

      {watchlist.length === 0 ? (
        <p className="text-gray-400">
          Your watchlist is empty. Add coins from the Dashboard.
        </p>
      ) : (
        <div className="overflow-x-auto bg-gray-900 border border-gray-800 rounded-xl">
          <table className="min-w-full divide-y divide-gray-800">
            <thead className="bg-gray-800">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                >
                  Name
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                >
                  Price
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                >
                  24h %
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                >
                  Remove
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray-900 divide-y divide-gray-800">
              {watchlist.map((coin) => (
                <tr
                  key={coin.id}
                  className="hover:bg-gray-800 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="text-sm font-medium text-white">
                        {coin.name}
                      </div>
                      <div className="text-sm text-gray-500 ml-2">
                        {coin.symbol.toUpperCase()}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                    ${coin.price.toLocaleString()}
                  </td>
                  <td
                    className={`px-6 py-4 whitespace-nowrap text-sm ${
                      coin.change24h >= 0 ? "text-green-400" : "text-red-400"
                    }`}
                  >
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

  if (loading)
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">Loading portfolio...</div>
    );
  if (error)
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-red-500">{error}</div>
    );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold mb-8">My Portfolio</h1>

      {/* Portfolio Summary */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-10">
        <h2 className="text-xl font-semibold text-gray-400 mb-2">
          Total Value
        </h2>
        <p className="text-5xl font-bold text-white mb-2">
          ${portfolio.totalValue.toLocaleString()}
        </p>
        <p
          className={`text-lg ${
            portfolio.change24h >= 0 ? "text-green-400" : "text-red-400"
          }`}
        >
          {portfolio.change24h >= 0 ? "+" : ""}$
          {portfolio.change24h.toLocaleString()} (24h)
        </p>
      </div>

      {/* Assets List */}
      <h2 className="text-2xl font-bold mb-6">Your Assets</h2>
      <div className="overflow-x-auto bg-gray-900 border border-gray-800 rounded-xl">
        <table className="min-w-full divide-y divide-gray-800">
          <thead className="bg-gray-800">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
              >
                Asset
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
              >
                Amount
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
              >
                Value
              </th>
            </tr>
          </thead>
          <tbody className="bg-gray-900 divide-y divide-gray-800">
            {portfolio.assets.map((asset) => (
              <tr
                key={asset.id}
                className="hover:bg-gray-800 transition-colors"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="text-sm font-medium text-white">
                      {asset.name}
                    </div>
                    <div className="text-sm text-gray-500 ml-2">
                      {asset.symbol.toUpperCase()}
                    </div>
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
        * This is a mock portfolio. In a real app, you would be able_ to
        add/edit transactions.
      </p>
    </div>
  );
}

// --- Page 5: Login Page ---
function LoginPage({ navigate, message }) {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      navigate("dashboard"); // Redirect to dashboard on successful login
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center py-20 px-4">
      <div className="w-full max-w-md bg-gray-900 border border-gray-800 rounded-xl p-8 shadow-xl">
        <div className="text-center mb-8">
          <LogIn className="w-12 h-12 text-green-400 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-white">Sign In</h2>
          <p className="text-gray-400">Access your CryptoInsight dashboard.</p>
        </div>

        {message && (
          <div className="mb-4 p-3 bg-yellow-900 text-yellow-200 border border-yellow-700 rounded-lg">
            {message}
          </div>
        )}
        {error && (
          <div className="mb-4 p-3 bg-red-900 text-red-200 border border-red-700 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>
          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-green-500 text-black font-bold rounded-lg hover:bg-green-400 transition-colors disabled:bg-gray-600"
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </div>
        </form>

        <p className="text-center text-gray-400 mt-6">
          Don't have an account?{" "}
          <button
            onClick={() => navigate("signup")}
            className="font-medium text-green-400 hover:underline"
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
}

// --- Page 6: Signup Page ---
function SignupPage({ navigate }) {
  const { signup } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setError("");
    setLoading(true);
    try {
      await signup(email, password);
      navigate("dashboard"); // Redirect to dashboard on successful signup
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center py-20 px-4">
      <div className="w-full max-w-md bg-gray-900 border border-gray-800 rounded-xl p-8 shadow-xl">
        <div className="text-center mb-8">
          <User className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-white">Create Account</h2>
          <p className="text-gray-400">Join CryptoInsight today.</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-900 text-red-200 border border-red-700 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength="6"
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-yellow-400 text-black font-bold rounded-lg hover:bg-yellow-300 transition-colors disabled:bg-gray-600"
            >
              {loading ? "Creating Account..." : "Sign Up"}
            </button>
          </div>
        </form>

        <p className="text-center text-gray-400 mt-6">
          Already have an account?{" "}
          <button
            onClick={() => navigate("login")}
            className="font-medium text-green-400 hover:underline"
          >
            Sign In
          </button>
        </p>
      </div>
    </div>
  );
}

// --- Footer ---
function Footer() {
  return (
    <footer className="bg-gray-950 border-t border-gray-900">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-gray-400">
          &copy; {new Date().getFullYear()} CryptoInsight. All rights reserved.
        </p>
        <p className="text-sm text-gray-500 mt-2">
          This is a demo project. Not financial advice.
        </p>
      </div>
    </footer>
  );
}
