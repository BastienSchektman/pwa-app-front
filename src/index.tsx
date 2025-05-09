import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './i18n';
import 'moment/locale/fr';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

serviceWorkerRegistration.register();
