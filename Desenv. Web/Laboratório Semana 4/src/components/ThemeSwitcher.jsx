import { useTheme } from '../contexts/ThemeContext';

const ThemeSwitcher = () => 
{
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <div className="theme-switcher">
      <button 
        onClick={toggleTheme}
        className={`theme-button ${isDarkMode ? 'dark' : 'light'}`}
        aria-label="Alternar tema"
      >
        {isDarkMode ? '☀️' : '🌙'} 
        <span className="theme-text">
          {isDarkMode ? 'Modo Claro' : 'Modo Escuro'}
        </span>
      </button>
    </div>
  );
};

export default ThemeSwitcher;