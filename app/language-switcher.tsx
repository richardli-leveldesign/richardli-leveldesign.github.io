"use client";

import { useEffect, useState } from "react";

const siteOrigin = "https://richardli-leveldesign.github.io";

function originalPageUrl() {
  return `${siteOrigin}${window.location.pathname}${window.location.search}${window.location.hash}`;
}

export function LanguageSwitcher({ className = "" }: { className?: string }) {
  const [isChineseView, setIsChineseView] = useState(false);

  useEffect(() => {
    setIsChineseView(window.location.hostname.includes("translate.goog"));
  }, []);

  const switchLanguage = () => {
    if (isChineseView) {
      window.location.href = originalPageUrl();
      return;
    }

    const url = encodeURIComponent(originalPageUrl());
    window.location.href = `https://translate.google.com/translate?sl=en&tl=zh-CN&hl=zh-CN&u=${url}`;
  };

  return <button className={`language-switcher ${className}`} type="button" onClick={switchLanguage} aria-label={isChineseView ? "Switch to English" : "切换为中文"}>{isChineseView ? "EN" : "中"}</button>;
}
