"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import en from "./locales/en.json";
import zh from "./locales/zh.json";

type Locale = "en" | "zh";
type Dictionary = typeof en;

type LanguageContextValue = {
  locale: Locale;
  dictionary: Dictionary;
  setLocale: (locale: Locale) => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>("en");
  const dictionary = locale === "zh" ? (zh as Dictionary) : en;

  useEffect(() => {
    document.documentElement.lang = locale === "zh" ? "zh-CN" : "en";
  }, [locale]);

  const value = useMemo(() => ({ locale, dictionary, setLocale }), [locale, dictionary]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
}
