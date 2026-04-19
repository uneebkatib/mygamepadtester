'use client'

import React, { createContext, useContext } from 'react';
import en from '../locales/en.json';

const I18nContext = createContext(undefined);

export const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸', dir: 'ltr' }
];

export function I18nProvider({ children }) {
    const locale = 'en';

    const t = (key) => {
        const keys = key.split('.');
        let value = en;

        for (const k of keys) {
            if (value && typeof value === 'object' && k in value) {
                value = value[k];
            } else {
                return key;
            }
        }

        return value || key;
    };

    const currentLanguage = languages[0];
    const isRTL = false;

    return (
        <I18nContext.Provider value={{
            locale,
            t,
            languages,
            currentLanguage,
            isRTL
        }}>
            {children}
        </I18nContext.Provider>
    );
}

export function useI18n() {
    const context = useContext(I18nContext);
    if (!context) {
        // Fallback for safety during transition
        return {
            locale: 'en',
            t: (key) => key,
            languages: languages,
            currentLanguage: languages[0],
            isRTL: false
        };
    }
    return context;
}

export default I18nContext;
