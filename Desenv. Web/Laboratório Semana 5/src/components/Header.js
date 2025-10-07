import React, { useMemo } from 'react';
import { useAppSelector } from '../store/hooks';
import SearchBar from './SearchBar';
import CategoryFilter from './CategoryFilter';
import ThemeToggle from './ThemeToggle';

const Header = React.memo(() => {
  const user = useAppSelector(state => state.user);
  const cart = useAppSelector(state => state.cart.items);

  // Otimização: useMemo para cache do cálculo custoso
  const randomValue = useMemo(() => {
    let result = 0;
    for (let i = 0; i < 100000; i++) {
      result += Math.random();
    }
    return result;
  }, []); // Array vazio significa que só será recalculado no mount

  return (
    <header className="card">
      <h1>E-Commerce Store</h1>
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <SearchBar />
        <CategoryFilter />
        <ThemeToggle />
        
        <div>
          Welcome, {user.name}! Cart: {cart.length} items
        </div>
        
        <div style={{ fontSize: '12px', opacity: 0.7 }}>
          Random: {randomValue.toFixed(2)}
        </div>
      </div>
    </header>
  );
});

export default Header;
