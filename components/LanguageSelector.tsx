'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Language } from '@/lib/types';
import { Globe } from 'lucide-react';

const languages: { code: Language; label: string }[] = [
  { code: 'en', label: 'English' },
  { code: 'ta', label: 'தமிழ்' },
  { code: 'si', label: 'සිංහල' },
  { code: 'zh', label: '简体中文' },
  { code: 'ja', label: '日本語' },
];

export const LanguageSelector: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-1.5 text-sm w-full min-w-0">
      <Globe className="w-4 h-4 text-emerald-800 flex-shrink-0" />
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value as Language)}
        className="w-full bg-white border border-stone-300 rounded px-2 py-1.5 text-xs font-medium text-stone-800 focus:outline-none focus:ring-1 focus:ring-emerald-700 hover:border-emerald-700 cursor-pointer transition-colors shadow-xs truncate"
        aria-label="Select Language"
      >
        {languages.map((l) => (
          <option key={l.code} value={l.code}>
            {l.label}
          </option>
        ))}
      </select>
    </div>
  );
};
