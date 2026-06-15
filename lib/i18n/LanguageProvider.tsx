"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { translations, type Locale, type Translations } from "./translations";

interface LanguageContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

const STORAGE_KEY = "pablo-locale";

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Default to French (primary audience: French agencies & the Master). The
  // SSR HTML is rendered with lang="fr"; we reconcile to a stored/browser
  // preference on the client to avoid a hydration mismatch.
  const [locale, setLocaleState] = useState<Locale>("fr");

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY) as Locale | null;
    let initial: Locale = "fr";
    if (stored === "en" || stored === "fr") {
      initial = stored;
    } else if (!window.navigator.language.toLowerCase().startsWith("fr")) {
      initial = "en";
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect -- hydrate locale from client-only storage
    setLocaleState(initial);
    document.documentElement.lang = initial;
  }, []);

  const setLocale = (next: Locale) => {
    setLocaleState(next);
    window.localStorage.setItem(STORAGE_KEY, next);
    document.documentElement.lang = next;
  };

  const toggleLocale = () => setLocale(locale === "fr" ? "en" : "fr");

  return (
    <LanguageContext.Provider value={{ locale, setLocale, toggleLocale, t: translations[locale] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
