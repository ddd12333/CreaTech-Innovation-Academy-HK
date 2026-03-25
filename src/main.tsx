import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

console.log('App initializing...');

const rootElement = document.getElementById('root');
if (!rootElement) {
  console.error('Failed to find the root element');
} else {
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
  console.log('App rendered');
}
