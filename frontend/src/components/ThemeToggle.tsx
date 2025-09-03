import React, { useState } from 'react';
import { Moon, Sun, Monitor } from 'lucide-react';
import { useTheme } from './ThemeProvider';

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const themes = [
    { value: 'light', label: 'Light', icon: Sun },
    { value: 'dark', label: 'Dark', icon: Moon },
    { value: 'system', label: 'System', icon: Monitor },
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center justify-center rounded-lg bg-white dark:bg-gray-800 border-2 border-blue-200 dark:border-blue-700 hover:border-blue-300 dark:hover:border-blue-600 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 shadow-md hover:shadow-lg transition-all duration-200 hover-lift"
        aria-label="Toggle theme"
      >
        {theme === 'light' && <Sun className="h-5 w-5 text-yellow-500" />}
        {theme === 'dark' && <Moon className="h-5 w-5 text-blue-400" />}
        {theme === 'system' && <Monitor className="h-5 w-5 text-gray-500" />}
        <span className="ml-2 font-semibold capitalize">{theme}</span>
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 z-20 mt-3 w-40 origin-top-right rounded-xl bg-white dark:bg-gray-800 shadow-2xl ring-1 ring-black/5 dark:ring-white/10 focus:outline-none animate-slide-in border border-gray-200/50 dark:border-gray-700/50">
            <div className="py-2">
              {themes.map(({ value, label, icon: Icon }) => (
                <button
                  key={value}
                  onClick={() => {
                    console.log('Setting theme to:', value);
                    setTheme(value as Theme);
                    setIsOpen(false);
                  }}
                  className={`flex w-full items-center px-4 py-3 text-sm font-medium transition-all duration-200 hover-lift ${
                    theme === value
                      ? 'bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-600 dark:text-blue-400 border-l-2 border-blue-500'
                      : 'text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                  }`}
                >
                  <Icon className="mr-3 h-5 w-5" />
                  <span>{label}</span>
                  {theme === value && (
                    <div className="ml-auto w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}