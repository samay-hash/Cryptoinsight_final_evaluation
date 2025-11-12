import React from 'react';

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

export default Footer;
