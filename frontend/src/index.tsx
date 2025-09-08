import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider, defaultTheme } from '@adobe/react-spectrum';
import App from './App';
import './index.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider theme={defaultTheme}>
      <App />
    </Provider>
  </React.StrictMode>
);
