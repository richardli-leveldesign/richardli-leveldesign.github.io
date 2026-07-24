"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import en from "./locales/en.json";
import pitStopEn from "./locales/pit-stop-en.json";
import pitStopZh from "./locales/pit-stop-zh.json";
import quakeSplitEn from "./locales/quake-3-the-split-en.json";
import quakeSplitZh from "./locales/quake-3-the-split-zh.json";
import zh from "./locales/zh.json";

type Locale = "en" | "zh";
type Dictionary = typeof en;
const englishDictionary = {
  ...en,
  projects: { ...en.projects, "pit-stop": pitStopEn, "quake-3-the-split": quakeSplitEn },
} as Dictionary;
const correctedChineseDictionary = JSON.parse(
  JSON.stringify(zh).split("李睿驰").join("李瑞驰"),
) as Dictionary;
const mergedChineseDictionary = JSON.parse(
  JSON.stringify({ ...zh, projects: { ...zh.projects, "pit-stop": pitStopZh, "quake-3-the-split": quakeSplitZh } })
    .split("\u674e\u777f\u9a70")
    .join("\u674e\u745e\u9a70"),
) as Dictionary;

type LanguageContextValue = {
  locale: Locale;
  dictionary: Dictionary;
  setLocale: (locale: Locale) => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);
const languageStorageKey = "ruichi-li-portfolio-language";

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>("en");
  const [hasLoadedPreference, setHasLoadedPreference] = useState(false);
  const dictionary = locale === "zh" ? mergedChineseDictionary : englishDictionary;

  useEffect(() => {
    const savedLocale = window.localStorage.getItem(languageStorageKey);
    if (savedLocale === "en" || savedLocale === "zh") {
      setLocale(savedLocale);
    }
    setHasLoadedPreference(true);
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale === "zh" ? "zh-CN" : "en";
    if (hasLoadedPreference) {
      window.localStorage.setItem(languageStorageKey, locale);
    }
  }, [hasLoadedPreference, locale]);

  const value = useMemo(() => ({ locale, dictionary, setLocale }), [locale, dictionary]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
}
