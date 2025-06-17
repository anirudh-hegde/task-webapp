import './otel-setup'; 

import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

// Initialize your OpenTelemetry instrumentation

const container = document.getElementById('root');
const root = createRoot(container); // Create a root.

// Render the app using the new root API
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
