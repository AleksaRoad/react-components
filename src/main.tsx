import './styles.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router';

import { App } from '@/App';
import { CharacterPage, NotFound } from '@/components';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element not found');
}

createRoot(rootElement).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<CharacterPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/404" replace />} />
        <Route
          path="/404"
          element={
            <div className="flex min-h-screen items-center justify-center">
              <NotFound />
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
