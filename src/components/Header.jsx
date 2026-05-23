import React, { memo } from 'react';
import { Moon, Sun, Bell, UserCircle } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

const Header = memo(function Header() {
  const { isDarkMode, toggleTheme } = useTheme();
  const { user } = useAuth();

  return (
    <header className="h-16 bg-white dark:bg-dark-surface border-b border-light-border dark:border-dark-border flex items-center justify-between px-8 shrink-0">
      <div>
        <h2 className="text-lg font-semibold text-black dark:text-white">Welcome back</h2>
        <p className="text-xs text-gray-400">{new Date().toDateString()}</p>
      </div>

      <div className="flex items-center gap-4">
        {/* Theme toggle — instant, no transition */}
        <button
          id="theme-toggle"
          onClick={toggleTheme}
          className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-black dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
          aria-label="Toggle theme"
        >
          {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        <button
          id="notifications-btn"
          className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-black dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 relative"
        >
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-black dark:bg-white rounded-full"></span>
        </button>

        <div className="flex items-center gap-3 pl-4 border-l border-light-border dark:border-dark-border">
          <div className="w-8 h-8 bg-black dark:bg-white rounded-full flex items-center justify-center">
            <span className="text-white dark:text-black text-xs font-bold">
              {user?.email?.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-black dark:text-white">{user?.email}</span>
            <span className="text-xs text-gray-400 capitalize">{user?.role}</span>
          </div>
        </div>
      </div>
    </header>
  );
});

export default Header;
