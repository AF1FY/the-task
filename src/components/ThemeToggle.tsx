import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

const ThemeToggle: React.FC = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="p-2 rounded-full transition-all duration-300 text-gray-800 dark:text-dodger-blue hover:shadow-md focus:outline-none cursor-pointer"
        >
            {theme === 'light' ? (
                <Moon size={20} className="text-slate-700" />
            ) : (
                <Sun size={20} />
            )}
        </button>
    );
};

export default ThemeToggle;