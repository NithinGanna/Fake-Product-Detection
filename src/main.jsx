
import App from './App.jsx';
import './index.css';

import * as React from 'react';
import * as ReactDOM from 'react-dom/client';

const rootElement = document.getElementById('root');
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

