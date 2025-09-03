import React from 'react';
import { Moon, Sun, Monitor } from 'lucide-react';
import { useTheme } from './ThemeProvider';

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : theme === 'dark' ? 'system' : 'light';
    setTheme(nextTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      className="inline-flex items-center justify-center rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 shadow-sm transition-colors"
      aria-label="Toggle theme"
    >
      {theme === 'light' && <Sun className="h-4 w-4 text-yellow-500" />}
      {theme === 'dark' && <Moon className="h-4 w-4 text-blue-400" />}
      {theme === 'system' && <Monitor className="h-4 w-4 text-gray-500" />}
      <span className="ml-2 capitalize">{theme}</span>
    </button>
  );
}