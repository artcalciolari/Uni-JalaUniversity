import { Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage/HomePage';
import { LoginPage } from './pages/Login&RegisterPages/LoginPage';
import { RegisterPage } from './pages/Login&RegisterPages/RegisterPage';
import { BookDetailsPage } from './pages/BookDetailsPage/BookDetails';
import { ProfilePage } from './pages/ProfilePage/ProfilePage';
import { SearchProvider } from './contexts/SearchContext';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import './App.css';

/**
 * Componente principal da aplicação BookFlow.
 * Define as rotas principais e os provedores de contexto necessários.
 * 
 * @returns Elemento JSX contendo toda a estrutura de roteamento da aplicação
 * 
 * @example
 * ```tsx
 * <App />
 * ```
 * 
 * @category Components
 */
function App() 
{
  return (
    <SearchProvider>
      <ScrollToTop />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/profile' element={<ProfilePage />} />
        <Route path='/book/:bKey' element={<BookDetailsPage />} />
      </Routes>
    </SearchProvider>
  );
}

export default App;