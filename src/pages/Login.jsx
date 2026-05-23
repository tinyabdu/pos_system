import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Store } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { Moon, Sun } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('admin@pos.com');
  const [password, setPassword] = useState('password');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const { isDarkMode, toggleTheme } = useTheme();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (login(email, password)) {
      navigate('/');
    } else {
      setError('Invalid credentials. Use admin@pos.com / password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-light-bg dark:bg-dark-bg">
      {/* Theme toggle on login page */}
      <button
        onClick={toggleTheme}
        className="fixed top-4 right-4 p-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-black dark:text-white"
        aria-label="Toggle theme"
      >
        {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
      </button>

      <div className="bg-white dark:bg-dark-surface p-10 rounded-2xl shadow-2xl w-full max-w-md border border-light-border dark:border-dark-border">
        <div className="flex justify-center mb-8">
          <div className="bg-black dark:bg-white p-4 rounded-2xl">
            <Store size={36} className="text-white dark:text-black" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-center mb-1 text-black dark:text-white tracking-tight">POSPRO</h1>
        <p className="text-center text-gray-400 text-sm mb-8">Sign in to your dashboard</p>

        {error && (
          <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 text-red-600 rounded-xl text-sm text-center border border-red-200 dark:border-red-800">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1.5">Email</label>
            <input
              id="login-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-light-border dark:border-dark-border bg-gray-50 dark:bg-gray-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1.5">Password</label>
            <input
              id="login-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-light-border dark:border-dark-border bg-gray-50 dark:bg-gray-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
              required
            />
          </div>
          <button
            id="login-btn"
            type="submit"
            className="w-full bg-black dark:bg-white text-white dark:text-black font-semibold py-3.5 rounded-xl hover:bg-gray-800 dark:hover:bg-gray-100 text-sm"
          >
            Sign In
          </button>
        </form>

        <p className="text-center text-xs text-gray-400 mt-6">
          Demo: admin@pos.com / password
        </p>
      </div>
    </div>
  );
}
