Cryptoinsight_final_evaluation
# crypto-backend01

1. Project Title
CryptoInsight – A Real-Time Cryptocurrency Analysis Dashboard
2. Problem Statement
With the rapid growth of digital currencies, investors and traders struggle to track crypto market movements
efficiently. Many existing tools are complex, paid, or lack personalized dashboards. CryptoInsight aims to simplify
cryptocurrency tracking by providing real-time price analysis, interactive charts, and portfolio management
features — all in one unified platform.
3. System Architecture
Frontend → Backend (API) → Database
Example Stack:
• Frontend: React.js with React Router for page navigation and Chart.js / Recharts for graph visualization
• Backend: Node.js + Express.js
• Database: MongoDB (non-relational)
• Authentication: JWT-based login/signup
• Hosting:
- Frontend → Vercel / Netlify
- Backend → Render / Railway
- Database → MongoDB Atlas
4. Key Features
Category Features
Authentication & Authorization Secure user registration, login, logout using JWT, role-based access (user/admin)
CRUD Operations Users can add, update, and delete coins in their personalized Watchlist
Filtering & Sorting Filter coins by market cap, price change %, or trading volume
Search & Pagination Search cryptocurrencies by name and paginate results for better performance
Data Visualization Real-time graphs for crypto price trends using Chart.js or Recharts
API Integration Live crypto market data from CoinGecko API
Hosting Deploy both backend and frontend to accessible URLs
5. Tech Stack
Layer Technologies
Frontend React.js, React Router, Axios, Chart.js / Recharts, TailwindCSS
Backend Node.js, Express.js
Database MongoDB Atlas
Authentication JWT (JSON Web Token)
API Source CoinGecko / Binance API
Hosting Frontend → Vercel / Netlify | Backend → Render / Railway | Database → MongoDB Atlas
6. API Overview
Endpoint Method Description Access
/api/auth/signup POST Register new user Public
/api/auth/login POST Authenticate user Public
/api/coins /api/coins/:id /api/watchlist /api/watchlist/:id /api/user/:id GET GET POST DELETE PUT Fetch all crypto coins data Fetch single coin details Add coin to user watchlist Remove coin from watchlist Update user profile or preferences Authenticated
Authenticated
Authenticated
Authenticated
Authenticated