import React, { useState } from "react";
import { LogIn } from "lucide-react";
import { useAuth } from "src/context/AuthContext";

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
      navigate("dashboard");
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

export default LoginPage;
