import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import * as resources from "./locales";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: "de",
    fallbackLng: "de",
    keySeparator: ":",
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;
