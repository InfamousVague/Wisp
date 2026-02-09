import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { WispProvider } from '@wisp-ui/react';
import { App } from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <WispProvider mode="dark">
      <HashRouter>
        <App />
      </HashRouter>
    </WispProvider>
  </React.StrictMode>,
);
