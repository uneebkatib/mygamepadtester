'use client'

import React, { createContext, useContext } from 'react';
import { Theme } from '../styles/Theme';

// Theme context — always light, dark mode removed
const ThemeContext = createContext({
    isDarkMode: false,
    toggleTheme: () => { },
    theme: Theme,
    themeMode: 'light'
});

/**
 * ThemeProvider — simplified to always use light theme.
 * Dark mode functionality has been removed.
 */
export const ThemeProvider = ({ children }) => {
    return (
        <ThemeContext.Provider value={{
            isDarkMode: false,
            toggleTheme: () => { }, // no-op
            theme: Theme,
            themeMode: 'light'
        }}>
            {children}
        </ThemeContext.Provider>
    );
};

/**
 * Hook to access theme context
 */
export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};

/**
 * Get theme value — always returns lightValue since dark mode is removed
 */
export const getThemeValue = (lightValue, darkValue, isDarkMode) => {
    return lightValue;
};

export { Theme as DarkTheme }; // kept for any legacy imports, returns light theme
export default ThemeProvider;
