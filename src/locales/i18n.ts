import i18next from 'i18next';
import {initReactI18next} from 'react-i18next';
import * as Localization from 'react-native-localize';
import en from './en/translation.json';
import es from './es/translation.json';
import de from './de/translation.json';
import fr from './fr/translation.json';
import kr from './kr/translation.json';
import ru from './ru/translation.json';
import zh from './zh/translation.json';
import kk from './kk/translation.json';

const resources = {
  en: {translation: en},
  es: {translation: es},
  de: {translation: de},
  fr: {translation: fr},
  kr: {translation: kr},
  ru: {translation: ru},
  zh: {translation: zh},
  kk: {translation: kk},
};

i18next.use(initReactI18next).init({
  resources,
  lng:
    Localization.findBestLanguageTag([
      'en',
      'es',
      'de',
      'fr',
      'kr',
      'ru',
      'zh',
      'kk',
    ])?.languageTag || 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18next;
