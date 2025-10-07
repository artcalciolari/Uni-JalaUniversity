import React, { useCallback } from 'react';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { toggleTheme } from '../store/slices/themeSlice';

const ThemeToggle = React.memo(() => {
  console.log('ThemeToggle rendered');

  const dispatch = useAppDispatch();
  const theme = useAppSelector(state => state.theme.currentTheme);

  // Otimização: useCallback para cache da função de toggle
  const handleToggle = useCallback(() => {
    dispatch(toggleTheme());
  }, [dispatch]);

  return (
    <button onClick={handleToggle}>
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  );
});

export default ThemeToggle;
