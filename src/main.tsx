import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

// Handle Vite preload errors (e.g., when assets are outdated after deployment)
window.addEventListener('vite:preloadError', (event) => {
  // Prevent the default error handling
  event.preventDefault();
  // Reload the page to get fresh assets
  window.location.reload();
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

