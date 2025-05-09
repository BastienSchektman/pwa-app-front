// Go on https://jsfiddle.net/6bpxsgd4 to see the needed suffixes
// for plurals depending on your language

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import commonFR from './locales/fr/common.json';
import validationFR from './locales/fr/validation.json';
import signInFR from './locales/fr/signIn.json';
import navigationFR from './locales/fr/navigation.json';
import commusFR from './locales/fr/commus.json';
import notificationFR from './locales/fr/notification.json';

const resources = {
  fr: {
    common: commonFR,
    signIn: signInFR,
    validation: validationFR,
    navigation: navigationFR,
    commus: commusFR,
    notification: notificationFR,
  },
};

i18n.use(LanguageDetector).use(initReactI18next)
  .init({
    fallbackLng: 'fr',
    resources,
    returnNull: false,
  });
export default i18n;
