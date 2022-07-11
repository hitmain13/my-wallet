// import React from 'react';
import ReactDOM from 'react-dom/client';

import { ThemeProvider } from './hooks/useTheme'
import { AuthProvider } from './hooks/useAuth'

import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  // <React.StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ThemeProvider>
  // </React.StrictMode>
);