"use client";

import { createContext, useContext, useState, ReactNode } from "react";
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
  const toggle = () => setLang((l) => (l === "ar" ? "en" : "ar"));
  return (
    <LangContext.Provider value={{ lang, t: translations[lang], toggle }}>
      {children}
    </LangContext.Provider>
  );
}

export const useLang = () => useContext(LangContext);
