import { useState } from 'react';

const SearchBar = ({ onSearch, isDarkMode }) => 
{
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => 
  {
    e.preventDefault();
    if (query.trim()) 
    {
      onSearch(query.trim());
    }
  };

  const handleInputChange = (e) => 
  {
    setQuery(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className="search-bar">
      <div className="search-container">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Digite o nome da cidade..."
          className={`search-input ${isDarkMode ? 'dark' : 'light'}`}
        />
        <button 
          type="submit" 
          className={`search-button ${isDarkMode ? 'dark' : 'light'}`}
        >
          🔍 Buscar
        </button>
      </div>
    </form>
  );
};

export default SearchBar;