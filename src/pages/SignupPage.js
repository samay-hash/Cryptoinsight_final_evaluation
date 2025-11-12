import React, { useState } from 'react';
import { User } from 'lucide-react';
import { useAuth } from 'src/context/AuthContext';

// --- Page 6: Signup Page ---
function SignupPage({ navigate }) {
  const { signup } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setError('');
    setLoading(true);
    try {
      await signup(email, password);
      navigate('dashboard'); // Redirect to dashboard on successful signup
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

        {error && <div className="mb-4 p-3 bg-red-900 text-red-200 border border-red-700 rounded-lg">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
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
            <label className="block text-sm font-medium text-gray-300 mb-2">Confirm Password</label>
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
              {loading ? 'Creating Account...' : 'Sign Up'}
            </button>
          </div>
        </form>
        
        <p className="text-center text-gray-400 mt-6">
          Already have an account?{' '}
          <button onClick={() => navigate('login')} className="font-medium text-green-400 hover:underline">
            Sign In
          </button>
        </p>
      </div>
    </div>
  );
}

export default SignupPage;
