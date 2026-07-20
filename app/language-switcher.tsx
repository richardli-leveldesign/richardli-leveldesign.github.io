"use client";

import { useLanguage } from "./i18n";

export function LanguageSwitcher({ className = "" }: { className?: string }) {
  const { locale, setLocale, dictionary } = useLanguage();
  const isChinese = locale === "zh";
  return <button className={`language-switcher ${className}`} type="button" onClick={() => setLocale(isChinese ? "en" : "zh")} aria-label={isChinese ? dictionary.actions.switchToEnglish : dictionary.actions.switchToChinese}>{isChinese ? "EN" : "中"}</button>;
}
