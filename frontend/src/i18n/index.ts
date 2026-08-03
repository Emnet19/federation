import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import am from './locales/am.json';
import om from './locales/om.json';
import ti from './locales/ti.json';

const STORAGE_KEY = 'eacrms_language';

export const LANGUAGES = [
  { code: 'en', label: 'English', native: 'English' },
  { code: 'am', label: 'Amharic', native: 'አማርኛ' },
  { code: 'om', label: 'Afaan Oromo', native: 'Afaan Oromoo' },
  { code: 'ti', label: 'Tigrinya', native: 'ትግርኛ' },
];

function getInitialLanguage(): string {
  if (typeof window === 'undefined') return 'en';
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && LANGUAGES.some((l) => l.code === stored)) return stored;
  } catch {
    /* ignore */
  }
  return 'en';
}

if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources: {
      en: { translation: en },
      am: { translation: am },
      om: { translation: om },
      ti: { translation: ti },
    },
    lng: getInitialLanguage(),
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
  });

  i18n.on('languageChanged', (lng: string) => {
    try {
      localStorage.setItem(STORAGE_KEY, lng);
      if (typeof document !== 'undefined') {
        document.documentElement.lang = lng;
      }
    } catch {
      /* ignore */
    }
  });
}

if (typeof document !== 'undefined') {
  document.documentElement.lang = getInitialLanguage();
}

export default i18n;
