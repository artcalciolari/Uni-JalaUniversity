import { Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage/HomePage';
import { BookDetailsPage } from './pages/BookDetailsPage/BookDetails';
import { SearchProvider } from './contexts/SearchContext';
import './App.css';

function App() 
{
  return (
    <SearchProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path='/book/:bKey' element={<BookDetailsPage />} />
      </Routes>
    </SearchProvider>
  );
}

export default App;