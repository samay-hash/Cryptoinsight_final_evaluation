import React, { useState } from 'react';
import { useAuth } from 'src/context/AuthContext';
import LoginPage from 'src/pages/LoginPage';


function PrivateRoute({ children, page }) {
  const { isAuthenticated, loading } = useAuth();
  
  
  const [redirect, setRedirect] = useState(false);
  const [targetPage, setTargetPage] = useState('');

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-green-400"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoginPage navigate={() => {}} message={`You must be logged in to view the ${page} page.`} />;
  }

  return children;
}

export default PrivateRoute;





























