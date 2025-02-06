import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from '@/App';
import './styles.css';
import { BrowserRouter, Route, Routes } from 'react-router';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element not found');
}

createRoot(rootElement).render(
  <StrictMode>
     <BrowserRouter>
      <Routes>
      <Route path="/" element={<App />} />
      <Route path='*' element={
        <main style={{ padding: "1rem" }}>
          <p>Theres nothing here!</p>
        </main>
      }
      />
      </Routes>
     </BrowserRouter>
  </StrictMode>
);
