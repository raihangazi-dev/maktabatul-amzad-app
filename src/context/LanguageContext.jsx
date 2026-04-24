"use client";
import { createContext, useContext, useState } from "react";

export const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    if (typeof window === "undefined") return 1;
    const saved = window.localStorage.getItem("ma-language");
    return saved !== null ? parseInt(saved) : 1;
  });

  const changeLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem("ma-language", lang.toString());
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
