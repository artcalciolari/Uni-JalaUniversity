import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import AppLayout from './components/AppLayout';
import Home from './pages/Home';
import ForecastDetails from './pages/ForecastDetails';
import NotFound from './pages/NotFound';
import './App.css';

// Carregamento preguiçoso para a página About
const About = React.lazy(() => import('./pages/About'));

// Componente de loading para carregamento preguiçoso
const LoadingSpinner = () => (
  <div style={{ 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    minHeight: '300px',
    flexDirection: 'column',
    gap: '1rem',
  }}>
    <div className="spinner" />
    <p>Carregando...</p>
  </div>
);

function App() 
{
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Home />} />
            <Route path="forecast/:city" element={<ForecastDetails />} />
            <Route 
              path="about" 
              element={
                <Suspense fallback={<LoadingSpinner />}>
                  <About />
                </Suspense>
              } 
            />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
