"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { translations, Lang } from "./translations";

const LangContext = createContext<{
  lang: Lang;
  t: typeof translations.ar;
  toggle: () => void;
}>({
  lang: "ar",
  t: translations.ar,
  toggle: () => {},
});

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("ar");

  useEffect(() => {
    const saved = localStorage.getItem("kisr-lang") as Lang | null;
    if (saved === "ar" || saved === "en") setLang(saved);
  }, []);

  const toggle = () =>
    setLang((l) => {
      const next: Lang = l === "ar" ? "en" : "ar";
      localStorage.setItem("kisr-lang", next);
      return next;
    });

  return (
    <LangContext.Provider value={{ lang, t: translations[lang], toggle }}>
      {children}
    </LangContext.Provider>
  );
}

export const useLang = () => useContext(LangContext);
