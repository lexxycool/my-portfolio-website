import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { PublicClientApplication } from '@azure/msal-browser';
import { msalConfig } from './authConfig.js';
import { MsalProvider } from '@azure/msal-react';

const msalInstance = new PublicClientApplication(msalConfig);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MsalProvider instance={msalInstance}>
        <App />
    </MsalProvider>
  </React.StrictMode>
);
