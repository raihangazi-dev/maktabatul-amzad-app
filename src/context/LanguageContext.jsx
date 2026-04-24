"use client";
import { createContext, useContext, useEffect, useState } from "react";

export const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(1);

  useEffect(() => {
    const saved = localStorage.getItem("ma-language");
    if (saved !== null) setLanguage(parseInt(saved));
  }, []);

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
