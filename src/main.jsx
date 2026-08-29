import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { PublicClientApplication, EventType } from '@azure/msal-browser';
import { msalConfig } from './authConfig.js';
import { MsalProvider } from '@azure/msal-react';

const msalInstance = new PublicClientApplication(msalConfig);

await msalInstance.initialize();

try {
  const redirectResponse = await msalInstance.handleRedirectPromise();
  if (redirectResponse?.account) {
    msalInstance.setActiveAccount(redirectResponse.account);
  }
} catch (error) {
  console.error("MSAL redirect processing error:", error);
}

if (!msalInstance.getActiveAccount() && msalInstance.getAllAccounts().length > 0) {
  msalInstance.setActiveAccount(msalInstance.getAllAccounts()[0]);
}

msalInstance.addEventCallback((event) => {
  if (event.eventType === EventType.LOGIN_SUCCESS && event.payload?.account) {
    msalInstance.setActiveAccount(event.payload.account);
  }
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MsalProvider instance={msalInstance}>
      <App />
    </MsalProvider>
  </React.StrictMode>
);
