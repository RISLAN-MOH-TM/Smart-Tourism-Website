'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language } from '@/lib/types';
import { trackLanguageChange } from '@/lib/analytics';
import enMessages from '@/messages/en.json';
import taMessages from '@/messages/ta.json';
import siMessages from '@/messages/si.json';
import zhMessages from '@/messages/zh.json';
import jaMessages from '@/messages/ja.json';

type MessagesType = typeof enMessages;

const translations: Record<Language, MessagesType> = {
  en: enMessages,
  ta: taMessages,
  si: siMessages,
  zh: zhMessages,
  ja: jaMessages,
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  messages: MessagesType;
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  messages: enMessages,
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    const saved = localStorage.getItem('tourism_lang') as Language;
    if (saved && ['en', 'ta', 'si', 'zh', 'ja'].includes(saved)) {
      setLanguageState(saved);
      document.documentElement.lang = saved;
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('tourism_lang', lang);
      document.documentElement.lang = lang;
      trackLanguageChange(lang);
    }
  };

  const messages = translations[language] || enMessages;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, messages }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);

