import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '../src/app/styles/index.scss';
import { App } from './app/providers/App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
