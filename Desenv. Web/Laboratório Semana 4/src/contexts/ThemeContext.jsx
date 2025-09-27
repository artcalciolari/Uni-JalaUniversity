import { createContext, useContext, useState, useEffect } from 'react';

// Criar o contexto
const ThemeContext = createContext();

// Hook personalizado para usar o contexto
export const useTheme = () => 
{
  const context = useContext(ThemeContext);
  if (!context) 
  {
    throw new Error('useTheme deve ser usado dentro de um ThemeProvider');
  }
  return context;
};

// Provider do contexto
export const ThemeProvider = ({ children }) => 
{
  const [isDarkMode, setIsDarkMode] = useState(() => 
  {
    // Carregar o tema do localStorage ou usar modo claro como padrão
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark';
  });

  // Salvar o tema no localStorage sempre que ele mudar
  useEffect(() => 
  {
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const toggleTheme = () => 
  {
    setIsDarkMode(prevMode => !prevMode);
  };

  const value = {
    isDarkMode,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};