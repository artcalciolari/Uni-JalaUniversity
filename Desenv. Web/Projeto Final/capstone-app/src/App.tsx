import { Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage/HomePage';
import { BookDetailsPage } from './pages/BookDetailsPage/BookDetails';
import { SearchProvider } from './contexts/SearchContext';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import './App.css';

function App() 
{
  return (
    <SearchProvider>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path='/book/:bKey' element={<BookDetailsPage />} />
      </Routes>
    </SearchProvider>
  );
}

export default App;