const ThemeSwitcher = ({ isDarkMode, onToggleTheme }) => 
{
  return (
    <div className="theme-switcher">
      <button 
        onClick={onToggleTheme}
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