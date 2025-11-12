# cryptoinsight-main-prioject-
# crypto-backend01

1. Project Title
IdeaVault – A web platform for students and developers to showcase and explore innovative projects.


2. Problem Statement
Many learners struggle to display their projects and find collaborators. IdeaVault provides a central
space for users to post, browse, and connect around creative project ideas.


3. System Architecture
Frontend → Backend (API) → Database
Example Stack:
• Frontend: React.js with React Router for page navigation and Chart.js / Recharts for graph visualization
• Backend: Node.js + Express.js
• Database: MongoDB (non-relational)• Authentication: JWT-based login/signup
• Hosting:
- Frontend → Vercel / Netlify
- Backend → Render / Railway
- Database → MongoDB Atlas


4. Key Features
Category Features
Authentication & Authorization Secure user registration, login, logout using JWT, role-based access (user/admin
CRUD Operations Create, Read, Update, Delete projects using APIs with MySQL & Prisma
Filtering & Sorting Filter usings name and techstack
Search & Pagination Quickly browse and manage project listings.
Data Visualization Real-time graphs for showing different techstack uses
API Integration Live data from API
Hosting Deploy both backend and frontend to accessible URLs


5. Tech Stack
Layer Technologies
Frontend React.js, React Router, Axios, Chart.js / Recharts, TailwindCSS
Backend Node.js, Express.js
Database Mysql
Authentication JWT (JSON Web Token)
API Source GitHub Projects API
Hosting Frontend → Vercel / Netlify | Backend → Render / Railway | Database →


6. API Overview
Endpoint Method Description Access
/api/auth/signup POST Register new user Public
/api/auth/login POST Authenticate user Public
/api/auth/signup POST Register new user Authenticated
/api/auth/signup POST POST Authenticated
/api/projects GET Get all projects (with filters & pagination) Authenticated
/api/projects POST Add new project Authenticated
/api/projects/:id PUT Edit project details Authenticated